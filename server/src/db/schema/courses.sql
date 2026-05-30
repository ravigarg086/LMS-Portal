CREATE TABLE IF NOT EXISTS courses (
  course_id VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(120) NOT NULL DEFAULT 'General',
  stack VARCHAR(60) NOT NULL DEFAULT '',
  duration VARCHAR(40) NOT NULL DEFAULT '',
  tags JSON NOT NULL,
  skills JSON NOT NULL,
  image VARCHAR(500) NOT NULL DEFAULT '',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (course_id),
  INDEX idx_courses_featured (featured),
  INDEX idx_courses_title (title),
  INDEX idx_courses_category (category),
  INDEX idx_courses_stack (stack)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
