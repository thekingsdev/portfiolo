# Next Steps for Supabase Setup

✅ **Completed:**
- Environment variables configured in `.env.local`
- Dev server restarted with new configuration

## 📋 What You Need to Do Now

### Step 1: Run the Database Schema

1. **Go to your Supabase Dashboard:**
   - Open [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Open SQL Editor:**
   - Click **"SQL Editor"** in the left sidebar
   - Click **"New query"** button

3. **Copy and Paste the Schema:**
   - Copy the ENTIRE content from `supabase-schema.sql` (shown below)
   - Paste it into the SQL editor
   - Click **"Run"** (or press Ctrl+Enter)

4. **Verify Success:**
   - You should see: "Success. No rows returned"
   - Check **"Table Editor"** to confirm `projects` and `profile` tables exist

```sql
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
```

---

### Step 2: Create Storage Bucket

1. **In Supabase Dashboard:**
   - Click **"Storage"** in the left sidebar
   - Click **"New bucket"**

2. **Configure Bucket:**
   - **Name:** `portfolio-assets` (MUST be exactly this)
   - **Public bucket:** Toggle **ON** ✅
   - Click **"Create bucket"**

3. **Verify:**
   - You should see the bucket listed
   - It should show as "Public"

---

### Step 3: Create Admin User

1. **In Supabase Dashboard:**
   - Click **"Authentication"** in the sidebar
   - Click **"Users"** tab
   - Click **"Add user"** → **"Create new user"**

2. **Create User:**
   - **Email:** Your email (e.g., `admin@yourportfolio.com`)
   - **Password:** Choose a secure password
   - **Auto Confirm User:** Toggle **ON** ✅
   - Click **"Create user"**

3. **Save Your Credentials:**
   - Write down the email and password
   - You'll use these to login (NOT the demo credentials)

---

## ✅ When You're Done

**Let me know when you've completed these steps, and I'll help you:**
1. Test the connection
2. Upload your first project to Supabase
3. Verify everything is working correctly

**Or if you run into any issues, just let me know what error you see!**
