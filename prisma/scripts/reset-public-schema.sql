-- Wipes all tables and migration history. Use only on empty/failed production DBs.
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO public;