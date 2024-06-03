-- Create the just_mgrs table if it doesn't exist
CREATE TABLE IF NOT EXISTS just_mgrs (
    id SERIAL PRIMARY KEY,
    miliData VARCHAR(100)
);

-- Insert seed data if needed
INSERT INTO just_mgrs (miliData) VALUES ('Sample MGRS Data');
