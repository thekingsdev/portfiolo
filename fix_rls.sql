-- Fix RLS policies for Portfolio App

-- 1. Ensure Storage Bucket Exists
-- Go to Supabase Dashboard > Storage > Create a new bucket named 'portfolio-assets'
-- Make sure "Public" is checked.

-- 2. Storage Objects Policies
-- Drop existing policies to avoid conflicts causing "policy already exists" errors
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;
DROP POLICY IF EXISTS "Public can read files" ON storage.objects;

-- Create Upload Policy (Allow authenticated users to upload to portfolio-assets)
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-assets');

-- Create Delete Policy (Allow authenticated users to delete from portfolio-assets)
CREATE POLICY "Authenticated users can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-assets');

-- Create Read Policy (Allow public to read from portfolio-assets)
CREATE POLICY "Public can read files"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-assets');

-- 3. Projects Table Policies
-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Authenticated can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated can delete projects" ON projects;
DROP POLICY IF EXISTS "Public can read projects" ON projects;

-- Create Policies
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);

-- Allow authenticated users (admin) to insert
CREATE POLICY "Authenticated can insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Authenticated can update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated can delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');
