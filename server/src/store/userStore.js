const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { createStudentDashboard } = require('../utils/studentDashboard');
const { DEMO_STUDENTS } = require('../utils/demoStudents');

const DATA_DIR = path.join(__dirname, '../../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

const DEFAULT_SEED = {
  users: [
    {
      id: 'seed-student-001',
      fullName: 'Alex Morgan',
      email: 'alex@campus.edu',
      password: '$2b$12$NLd1PU5cAX5.BgYr160h6eSgfc9r7dpUWkjugeI1bR5N2DGJu/UlW',
      role: 'student',
      academicTrack: 'Computer Science',
      graduationYear: '2027',
      department: '',
      employeeId: '',
      accessLevel: '',
      dashboard: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'seed-faculty-001',
      fullName: 'Dr. Priya Shah',
      email: 'pshah@campus.edu',
      password: '$2b$12$NLd1PU5cAX5.BgYr160h6eSgfc9r7dpUWkjugeI1bR5N2DGJu/UlW',
      role: 'faculty',
      academicTrack: '',
      graduationYear: '',
      department: 'Computer Science',
      employeeId: 'FAC001',
      accessLevel: '',
      dashboard: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'seed-admin-001',
      fullName: 'Jordan Lee',
      email: 'jlee@campus.edu',
      password: '$2b$12$NLd1PU5cAX5.BgYr160h6eSgfc9r7dpUWkjugeI1bR5N2DGJu/UlW',
      role: 'admin',
      academicTrack: '',
      graduationYear: '',
      department: '',
      employeeId: '',
      accessLevel: 'Super Admin',
      dashboard: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

let cache = null;

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
    dashboard: user.role === 'student' ? user.dashboard : undefined,
  };
}

function wrapUser(raw, persistFn) {
  const user = { ...raw };

  user.toSafeJSON = () => toSafeJSON(user);
  user.comparePassword = (candidate) => bcrypt.compare(candidate, user.password);
  user.save = async () => {
    user.updatedAt = new Date().toISOString();
    await persistFn(user);
    return user;
  };

  return user;
}

async function readStore() {
  if (cache) {
    return cache;
  }

  try {
    const raw = await fs.readFile(USERS_FILE, 'utf8');
    cache = JSON.parse(raw);
  } catch (error) {
    cache = structuredClone(DEFAULT_SEED);
    cache.users = cache.users.map((entry) => {
      if (entry.role === 'student' && !entry.dashboard) {
        return {
          ...entry,
          dashboard: createStudentDashboard(entry),
        };
      }
      return entry;
    });
    await writeStore(cache);
  }

  return cache;
}

async function writeStore(store) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(store, null, 2), 'utf8');
  cache = store;
}

async function persistUser(updatedUser) {
  const store = await readStore();
  const index = store.users.findIndex((entry) => entry.id === updatedUser.id);
  if (index === -1) {
    throw new Error('User not found.');
  }

  const { toSafeJSON, comparePassword, save, ...data } = updatedUser;
  store.users[index] = data;
  await writeStore(store);
}

async function initUserStore() {
  const store = await readStore();
  let changed = false;

  store.users = store.users.map((entry) => {
    if (entry.role === 'student' && !entry.dashboard?.featuredCourse?.title) {
      changed = true;
      return {
        ...entry,
        dashboard: createStudentDashboard(entry),
      };
    }
    return entry;
  });

  const existingEmails = new Set(store.users.map((entry) => entry.email));
  DEMO_STUDENTS.forEach((demoStudent) => {
    if (!existingEmails.has(demoStudent.email)) {
      store.users.push(demoStudent);
      changed = true;
    }
  });

  if (changed) {
    await writeStore(store);
  }

  console.log(`User store ready (${store.users.length} accounts in users.json)`);
}

async function findByEmail(email) {
  const store = await readStore();
  const normalized = email.toLowerCase().trim();
  const match = store.users.find((entry) => entry.email === normalized);
  return match ? wrapUser(match, persistUser) : null;
}

async function findByCredentials(role, identifier) {
  const store = await readStore();
  const normalized = identifier.toLowerCase().trim();
  const match = store.users.find((entry) => {
    if (entry.role !== role) {
      return false;
    }
    if (entry.email === normalized) {
      return true;
    }
    if (entry.employeeId && entry.employeeId.toLowerCase() === normalized) {
      return true;
    }
    return false;
  });

  return match ? wrapUser(match, persistUser) : null;
}

async function findById(id) {
  const store = await readStore();
  const match = store.users.find((entry) => entry.id === id);
  return match ? wrapUser(match, persistUser) : null;
}

async function findOne(criteria) {
  if (criteria.email) {
    return findByEmail(criteria.email);
  }
  return null;
}

async function findByRole(role) {
  const store = await readStore();
  return store.users
    .filter((entry) => entry.role === role)
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
    .map((entry) => wrapUser(entry, persistUser));
}

async function createUser(payload) {
  const store = await readStore();
  const email = payload.email.toLowerCase().trim();
  const exists = store.users.some((entry) => entry.email === email);
  if (exists) {
    throw Object.assign(new Error('An account with this email already exists.'), { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const now = new Date().toISOString();
  const record = {
    id: crypto.randomUUID(),
    fullName: payload.fullName.trim(),
    email,
    password: hashedPassword,
    role: payload.role,
    academicTrack: payload.academicTrack || '',
    graduationYear: payload.graduationYear || '',
    department: payload.department || '',
    employeeId: payload.employeeId || '',
    accessLevel: payload.accessLevel || '',
    dashboard: payload.dashboard || null,
    createdAt: now,
    updatedAt: now,
  };

  store.users.push(record);
  await writeStore(store);
  return wrapUser(record, persistUser);
}

async function deleteUser(id) {
  const store = await readStore();
  const nextUsers = store.users.filter((entry) => entry.id !== id);
  if (nextUsers.length === store.users.length) {
    return false;
  }
  store.users = nextUsers;
  await writeStore(store);
  return true;
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
