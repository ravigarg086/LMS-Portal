CREATE TABLE IF NOT EXISTS calendar_events (
  id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NULL,
  event_type ENUM('class', 'assignment', 'exam', 'personal', 'other') NOT NULL DEFAULT 'other',
  start_at TIMESTAMP NOT NULL,
  end_at TIMESTAMP NULL,
  all_day TINYINT(1) NOT NULL DEFAULT 0,
  location VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_calendar_events_user (user_id),
  INDEX idx_calendar_events_start (start_at),
  INDEX idx_calendar_events_user_start (user_id, start_at),
  CONSTRAINT fk_calendar_events_user
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
