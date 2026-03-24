ALTER TABLE uploaded_pictures ADD COLUMN IF NOT EXISTS weather_temp NUMERIC;
ALTER TABLE uploaded_pictures ADD COLUMN IF NOT EXISTS weather_icon TEXT;
