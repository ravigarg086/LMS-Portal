require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { initUserStore } = require('./store/userStore');
const { initContactDb } = require('./db/initContactDb');
const { initUsersDb } = require('./db/initUsersDb');
const { initCoursesDb } = require('./db/initCoursesDb');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const externalDataRoutes = require('./routes/externalDataRoutes');
const contactRoutes = require('./routes/contactRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
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

async function start() {
  try {
    await initUsersDb();
    await initUserStore();
    await initContactDb();
    await initCoursesDb();
    app.listen(PORT, () => {
      console.log(`LMS API running on http://localhost:${PORT}`);
      console.log('Auth API: POST /api/auth/login, POST /api/auth/forgot-password, POST /api/auth/reset-password');
      console.log('Contact API: POST /api/contact, GET /api/contact (admin)');
      console.log('Courses API: GET /api/courses?search=');
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
