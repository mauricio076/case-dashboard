-- Expediente — D1 schema
-- Each deployment holds a single expediente (key = 'main').
-- Multiple cases can be added later by using different keys.

CREATE TABLE IF NOT EXISTS case_data (
  key        TEXT NOT NULL PRIMARY KEY,
  data       TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
