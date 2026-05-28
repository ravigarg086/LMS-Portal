const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { getPool } = require('../config/mysql');
const { createStudentDashboard } = require('../utils/studentDashboard');
const { getSeedUsers } = require('../db/seedUsers');

function parseDashboard(value) {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  return value;
}

function mapRow(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    password: row.password_hash,
    role: row.role,
    academicTrack: row.academic_track || '',
    graduationYear: row.graduation_year || '',
    department: row.department || '',
    employeeId: row.employee_id || '',
    accessLevel: row.access_level || '',
    profilePictureUrl: row.profile_picture_url || '',
    dashboard: parseDashboard(row.dashboard_json),
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : row.updated_at,
  };
}

function toSafeJSON(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    academicTrack: user.academicTrack || '',
    graduationYear: user.graduationYear || '',
    department: user.department || '',
    employeeId: user.employeeId || '',
    accessLevel: user.accessLevel || '',
    profilePictureUrl: user.profilePictureUrl || '',
    dashboard: user.role === 'student' ? user.dashboard : undefined,
  };
}

function wrapUser(raw) {
  const user = { ...raw };

  user.toSafeJSON = () => toSafeJSON(user);
  user.comparePassword = (candidate) => bcrypt.compare(candidate, user.password);
  user.save = async () => {
    const pool = await getPool();
    await pool.execute(
      `UPDATE users
       SET full_name = ?, email = ?, password_hash = ?, academic_track = ?, graduation_year = ?,
           department = ?, employee_id = ?, access_level = ?, profile_picture_url = ?,
           dashboard_json = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        user.fullName,
        user.email.toLowerCase().trim(),
        user.password,
        user.academicTrack || '',
        user.graduationYear || '',
        user.department || '',
        user.employeeId || '',
        user.accessLevel || '',
        user.profilePictureUrl || null,
        user.dashboard ? JSON.stringify(user.dashboard) : null,
        user.id,
      ],
    );

    const refreshed = await findById(user.id);
    Object.assign(user, refreshed);
    user.toSafeJSON = () => toSafeJSON(user);
    user.comparePassword = (candidate) => bcrypt.compare(candidate, user.password);
    user.save = refreshed.save;
    return user;
  };

  return user;
}

async function findById(id) {
  const pool = await getPool();
  const [rows] = await pool.execute(
    `SELECT id, full_name, email, password_hash, role, academic_track, graduation_year,
            department, employee_id, access_level, profile_picture_url, dashboard_json,
            created_at, updated_at
     FROM users WHERE id = ?`,
    [id],
  );

  return rows[0] ? wrapUser(mapRow(rows[0])) : null;
}

async function findByEmail(email) {
  const pool = await getPool();
  const normalized = email.toLowerCase().trim();
  const [rows] = await pool.execute(
    `SELECT id, full_name, email, password_hash, role, academic_track, graduation_year,
            department, employee_id, access_level, profile_picture_url, dashboard_json,
            created_at, updated_at
     FROM users WHERE email = ?`,
    [normalized],
  );

  return rows[0] ? wrapUser(mapRow(rows[0])) : null;
}

async function findByCredentials(role, identifier) {
  const pool = await getPool();
  const normalized = identifier.toLowerCase().trim();
  const [rows] = await pool.execute(
    `SELECT id, full_name, email, password_hash, role, academic_track, graduation_year,
            department, employee_id, access_level, profile_picture_url, dashboard_json,
            created_at, updated_at
     FROM users
     WHERE role = ?
       AND (email = ? OR (employee_id <> '' AND LOWER(employee_id) = ?))`,
    [role, normalized, normalized],
  );

  return rows[0] ? wrapUser(mapRow(rows[0])) : null;
}

async function findOne(criteria) {
  if (criteria.email) {
    return findByEmail(criteria.email);
  }
  return null;
}

async function findByRole(role) {
  const pool = await getPool();
  const [rows] = await pool.execute(
    `SELECT id, full_name, email, password_hash, role, academic_track, graduation_year,
            department, employee_id, access_level, profile_picture_url, dashboard_json,
            created_at, updated_at
     FROM users
     WHERE role = ?
     ORDER BY full_name ASC`,
    [role],
  );

  return rows.map((row) => wrapUser(mapRow(row)));
}

async function createUser(payload) {
  const email = payload.email.toLowerCase().trim();
  const existing = await findByEmail(email);

  if (existing) {
    throw Object.assign(new Error('An account with this email already exists.'), { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const id = crypto.randomUUID();
  const dashboard =
    payload.dashboard ||
    (payload.role === 'student'
      ? createStudentDashboard({
          email,
          academicTrack: payload.academicTrack,
        })
      : null);

  const pool = await getPool();
  await pool.execute(
    `INSERT INTO users
      (id, full_name, email, password_hash, role, academic_track, graduation_year,
       department, employee_id, access_level, profile_picture_url, dashboard_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      payload.fullName.trim(),
      email,
      hashedPassword,
      payload.role,
      payload.academicTrack || '',
      payload.graduationYear || '',
      payload.department || '',
      payload.employeeId || '',
      payload.accessLevel || '',
      payload.profilePictureUrl || null,
      dashboard ? JSON.stringify(dashboard) : null,
    ],
  );

  return findById(id);
}

async function deleteUser(id) {
  const pool = await getPool();
  const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

async function insertSeededUser(record) {
  const pool = await getPool();
  await pool.execute(
    `INSERT INTO users
      (id, full_name, email, password_hash, role, academic_track, graduation_year,
       department, employee_id, access_level, profile_picture_url, dashboard_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      record.id,
      record.fullName,
      record.email.toLowerCase().trim(),
      record.password,
      record.role,
      record.academicTrack || '',
      record.graduationYear || '',
      record.department || '',
      record.employeeId || '',
      record.accessLevel || '',
      record.profilePictureUrl || null,
      record.dashboard ? JSON.stringify(record.dashboard) : null,
    ],
  );

  return findById(record.id);
}

async function initUserStore() {
  const pool = await getPool();
  const [rows] = await pool.execute('SELECT COUNT(*) AS total FROM users');
  const total = Number(rows[0]?.total || 0);

  if (total === 0) {
    return;
  }

  const students = await findByRole('student');

  for (const student of students) {
    if (!student.dashboard?.featuredCourse?.title) {
      student.dashboard = createStudentDashboard(student);
      await student.save();
    }
  }

  const existingEmails = new Set(students.map((entry) => entry.email));
  for (const demoStudent of getSeedUsers()) {
    if (demoStudent.role !== 'student' || existingEmails.has(demoStudent.email)) {
      continue;
    }

    await insertSeededUser(demoStudent);
    existingEmails.add(demoStudent.email);
  }
}

module.exports = {
  initUserStore,
  findById,
  findByEmail,
  findByCredentials,
  findOne,
  findByRole,
  createUser,
  deleteUser,
  toSafeJSON,
};
