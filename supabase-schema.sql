-- Portfolio Database Schema
-- Execute this in your Supabase SQL Editor

-- Profile table (single row for site owner)
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bio TEXT,
  avatar_url TEXT,
  cv_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  display_order INTEGER DEFAULT 0
);

-- Insert default profile row
INSERT INTO profile (bio, avatar_url, cv_url) 
VALUES ('Your bio goes here. Update this from the admin dashboard.', NULL, NULL);

-- Create indexes for better performance
CREATE INDEX projects_display_order_idx ON projects(display_order DESC);
CREATE INDEX projects_created_at_idx ON projects(created_at DESC);

-- Enable Row Level Security
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public read access for both tables
CREATE POLICY "Public can read profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);

-- Authenticated users can update/insert/delete
CREATE POLICY "Authenticated can update profile" ON profile FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

-- Storage Policies (Run after creating the 'portfolio-assets' bucket)
-- Go to Storage > portfolio-assets > Policies

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-assets');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-assets');

-- Allow public to read files
CREATE POLICY "Public can read files"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-assets');
