-- Comprehensive Fix for RLS Policies (Storage & Database)
-- Run this in Supabase SQL Editor

-- ==============================================================================
-- 1. STORAGE POLICIES (Fix "violates row-level security policy" on upload)
-- ==============================================================================

-- Drop potentially conflicting existing policies
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;
DROP POLICY IF EXISTS "Public can read files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload" ON storage.objects;
DROP POLICY IF EXISTS "Give me access to everything" ON storage.objects;

-- Create explicit policies for the 'portfolio-assets' bucket

-- ALLOW UPLOAD: Authenticated users can upload new files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-assets');

-- ALLOW VIEW: Public can view files (needed for the portfolio grid)
CREATE POLICY "Public can read files"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-assets');

-- ALLOW DELETE: Authenticated users can delete files (needed for cleanup)
CREATE POLICY "Authenticated users can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-assets');

-- ALLOW UPDATE: Authenticated users can update/replace files
CREATE POLICY "Authenticated users can update files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-assets');


-- ==============================================================================
-- 2. DATABASE POLICIES (Projects Table)
-- ==============================================================================

-- Ensure RLS is enabled
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop potentially conflicting existing policies
DROP POLICY IF EXISTS "Authenticated can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated can delete projects" ON projects;
DROP POLICY IF EXISTS "Public can read projects" ON projects;
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON projects;

-- Create explicit policies

-- ALLOW READ: Public can see all projects
CREATE POLICY "Public can read projects"
ON projects FOR SELECT
USING (true);

-- ALLOW INSERT: Only authenticated users can add projects
CREATE POLICY "Authenticated can insert projects"
ON projects FOR INSERT
TO authenticated
WITH CHECK (true);

-- ALLOW UPDATE: Only authenticated users can edit projects
CREATE POLICY "Authenticated can update projects"
ON projects FOR UPDATE
TO authenticated
USING (true);

-- ALLOW DELETE: Only authenticated users can delete projects
CREATE POLICY "Authenticated can delete projects"
ON projects FOR DELETE
TO authenticated
USING (true);

-- ==============================================================================
-- 3. VERIFICATION HELPER
-- ==============================================================================

-- You can check your policies with:
-- select * from pg_policies where tablename = 'objects' or tablename = 'projects';
