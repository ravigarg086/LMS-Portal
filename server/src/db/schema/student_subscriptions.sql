CREATE TABLE IF NOT EXISTS student_subscriptions (
  id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  plan_id VARCHAR(64) NOT NULL,
  status ENUM('active', 'cancelled', 'expired', 'pending') NOT NULL DEFAULT 'pending',
  started_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL,
  cancelled_at TIMESTAMP NULL,
  auto_renew TINYINT(1) NOT NULL DEFAULT 1,
  payment_reference VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_student_subscriptions_user (user_id),
  INDEX idx_student_subscriptions_status (status),
  INDEX idx_student_subscriptions_expires (expires_at),
  CONSTRAINT fk_student_subscriptions_user
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT fk_student_subscriptions_plan
    FOREIGN KEY (plan_id) REFERENCES subscription_plans (plan_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
