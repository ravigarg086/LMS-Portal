CREATE TABLE IF NOT EXISTS platform_settings (
  id TINYINT NOT NULL DEFAULT 1,
  settings_json JSON NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by CHAR(36) NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Per-user preferences are stored in users.settings_json (added via initSettingsDb migration).
