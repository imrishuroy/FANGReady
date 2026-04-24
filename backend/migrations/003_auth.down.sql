-- Rollback authentication tables

DROP TABLE IF EXISTS password_reset_tokens;
DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS refresh_tokens;
DROP TABLE IF EXISTS users;
