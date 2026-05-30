require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { initUserStore } = require('./store/userStore');
const { initContactDb } = require('./db/initContactDb');
const { initUsersDb } = require('./db/initUsersDb');
const { initCoursesDb } = require('./db/initCoursesDb');
const { initSettingsDb } = require('./db/initSettingsDb');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const externalDataRoutes = require('./routes/externalDataRoutes');
const contactRoutes = require('./routes/contactRoutes');
const courseRoutes = require('./routes/courseRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const DEFAULT_CLIENT_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000'];

function resolveClientOrigins() {
  const configured = (process.env.CLIENT_URL || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  return [...new Set([...configured, ...DEFAULT_CLIENT_ORIGINS])];
}

const clientOrigins = resolveClientOrigins();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || clientOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    storage: {
      users: 'mysql',
      contact: 'mysql',
      courses: 'mysql',
      settings: 'mysql',
    },
    features: {
      profileUpdate: true,
      passwordReset: true,
    },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/external', externalDataRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/settings', settingsRoutes);

async function start() {
  try {
    await initUsersDb();
    await initUserStore();
    await initContactDb();
    await initCoursesDb();
    await initSettingsDb();
    app.listen(PORT, () => {
      console.log(`LMS API running on http://localhost:${PORT}`);
      console.log('Auth API: POST /api/auth/login, POST /api/auth/forgot-password, POST /api/auth/reset-password');
      console.log('Contact API: POST /api/contact, GET /api/contact (admin)');
      console.log('Courses API: GET /api/courses?search=');
      console.log('Settings API: GET/PUT /api/settings/me, GET/PUT /api/settings/platform (admin)');
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
