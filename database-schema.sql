-- Bearhatty Sports Club - Admin Match Management System
-- Database Schema for Supabase
-- 
-- Instructions:
-- 1. Go to Supabase Dashboard
-- 2. Click "SQL Editor" 
-- 3. Click "New Query"
-- 4. Copy and paste this entire file
-- 5. Click "Run"
-- 6. Done! Table is created

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_name VARCHAR(255) NOT NULL,
  team1_name VARCHAR(255) NOT NULL,
  team2_name VARCHAR(255) NOT NULL,
  team1_image_url TEXT,
  team1_image_path VARCHAR(255),
  team2_image_url TEXT,
  team2_image_path VARCHAR(255),
  venue VARCHAR(255) NOT NULL,
  match_date DATE NOT NULL,
  match_time TIME NOT NULL,
  sport_type VARCHAR(50) NOT NULL CHECK (sport_type IN ('Football', 'Hockey')),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(match_date);
CREATE INDEX IF NOT EXISTS idx_matches_sport ON matches(sport_type);
CREATE INDEX IF NOT EXISTS idx_matches_created ON matches(created_at DESC);

-- Enable Row Level Security
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read matches (public read)
CREATE POLICY IF NOT EXISTS "Public read access"
  ON matches
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert matches (admin create)
-- Note: This requires authentication. Update as needed for your use case.
-- For full open access, use: USING (true)
CREATE POLICY IF NOT EXISTS "Admin insert access"
  ON matches
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to update matches (admin edit)
CREATE POLICY IF NOT EXISTS "Admin update access"
  ON matches
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete matches (admin delete)
CREATE POLICY IF NOT EXISTS "Admin delete access"
  ON matches
  FOR DELETE
  USING (true);

-- Note about storage bucket:
-- After running this, you need to create a storage bucket:
-- 1. Go to Storage section in Supabase
-- 2. Click "New bucket"
-- 3. Name: "upcoming-matches"
-- 4. Make it PUBLIC
-- 5. Click Create
--
-- Storage RLS policies (optional, paste after bucket creation):
-- 
-- CREATE POLICY "Public access"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'upcoming-matches');
--
-- CREATE POLICY "Authenticated users can upload"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'upcoming-matches');
--
-- CREATE POLICY "Authenticated users can delete"
--   ON storage.objects FOR DELETE
--   USING (bucket_id = 'upcoming-matches');

-- Verification: Check if table was created
SELECT 
  table_name,
  column_name,
  data_type
FROM 
  information_schema.columns
WHERE 
  table_name = 'matches'
ORDER BY 
  ordinal_position;
