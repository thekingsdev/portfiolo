-- Fix RLS Policies for Profile Table
-- Run this in Supabase SQL Editor

-- ==============================================================================
-- PROFILE TABLE POLICIES
-- ==============================================================================

-- Enable RLS
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- Drop potentially conflicting existing policies
DROP POLICY IF EXISTS "Authenticated can update profile" ON profile;
DROP POLICY IF EXISTS "Public can read profile" ON profile;
DROP POLICY IF EXISTS "Users can update own profile" ON profile;

-- Create explicit policies

-- ALLOW READ: Public can read the profile (bio, avatar, etc.)
CREATE POLICY "Public can read profile"
ON profile FOR SELECT
USING (true);

-- ALLOW UPDATE: Authenticated users can update the profile
-- (Assuming single-user portfolio, or user is editing their own row)
CREATE POLICY "Authenticated can update profile"
ON profile FOR UPDATE
TO authenticated
USING (true);

-- ALLOW INSERT: Authenticated users can insert a profile if missing
CREATE POLICY "Authenticated can insert profile"
ON profile FOR INSERT
TO authenticated
WITH CHECK (true);

-- Ensure there is at least one row if empty
INSERT INTO profile (bio) 
SELECT 'Welcome to my portfolio.' 
WHERE NOT EXISTS (SELECT 1 FROM profile);
