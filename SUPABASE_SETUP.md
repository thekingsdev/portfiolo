# Supabase Integration Setup Guide

This guide will help you connect your existing Supabase account to your portfolio application.

## Prerequisites

✅ Supabase account created  
✅ Project running locally at `http://localhost:3000`

---

## Step 1: Create or Select a Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Either:
   - Click **"New Project"** to create a fresh project for this portfolio
   - Or select an existing project you want to use

3. If creating new project:
   - **Name**: `portfolio` (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Select closest to your location
   - Click **"Create new project"**
   - Wait ~2 minutes for setup to complete

---

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, click **"Settings"** (gear icon in sidebar)
2. Click **"API"** in the settings menu
3. Copy these two values:

   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## Step 3: Update Environment Variables

1. Open your `.env.local` file in the project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save the file

> **Note:** You'll need to restart your dev server after updating environment variables:
> - Stop the server (Ctrl+C)
> - Run `npm run dev` again

---

## Step 4: Set Up Database Tables

1. In Supabase dashboard, click **"SQL Editor"** in the sidebar
2. Click **"New query"**
3. Copy the entire contents of [`supabase-schema.sql`](file:///c:/Users/THINKPAD/Documents/portfiolo/supabase-schema.sql) from your project
4. Paste it into the SQL editor
5. Click **"Run"** (or press Ctrl+Enter)

This creates:
- ✅ `projects` table for storing project data
- ✅ `profile` table for your bio/info
- ✅ Default profile row
- ✅ Proper indexes and constraints

---

## Step 5: Create Storage Bucket

1. In Supabase dashboard, click **"Storage"** in the sidebar
2. Click **"New bucket"**
3. Configure the bucket:
   - **Name**: `portfolio-assets`
   - **Public bucket**: Toggle **ON** ✅
   - Click **"Create bucket"**

4. Set up storage policies:
   - Click on the `portfolio-assets` bucket
   - Click **"Policies"** tab
   - Click **"New policy"**
   - Select **"For full customization"**
   - Set up these two policies:

**Policy 1: Public Read Access**
```sql
Name: Public read access
Policy: SELECT
Target roles: public
Using expression: true
```

**Policy 2: Authenticated Upload/Delete**
```sql
Name: Authenticated users can upload
Policy: INSERT, UPDATE, DELETE
Target roles: authenticated
Using expression: true
```

---

## Step 6: Set Up Authentication

1. In Supabase dashboard, click **"Authentication"** in the sidebar
2. Click **"Users"** tab
3. Click **"Add user"** → **"Create new user"**
4. Fill in:
   - **Email**: Your admin email (e.g., `admin@yourportfolio.com`)
   - **Password**: Choose a secure password
   - **Auto Confirm User**: Toggle **ON** ✅
5. Click **"Create user"**

> **Important:** Save these credentials - you'll use them to login instead of the demo credentials!

---

## Step 7: Configure Email Settings (Optional but Recommended)

1. Go to **Authentication** → **Settings**
2. Scroll to **"SMTP Settings"**
3. Either:
   - Use Supabase's built-in email (limited)
   - Or configure your own SMTP (recommended for production)

For now, you can skip this and manually create users.

---

## Step 8: Test the Connection

1. **Restart your dev server** if you haven't already:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

2. **Clear localStorage** to remove mock data:
   - Open browser DevTools (F12)
   - Go to **Application** → **Local Storage**
   - Right-click → **Clear**

3. **Test login**:
   - Go to `http://localhost:3000/login`
   - Use your Supabase user credentials (not the demo ones)
   - Should successfully log in!

4. **Test project upload**:
   - Navigate to `/admin/projects`
   - Upload a test project
   - Check Supabase Storage to verify image was uploaded
   - Check Database to verify project row was created

---

## Verification Checklist

After setup, verify these items:

- [ ] Environment variables are set in `.env.local`
- [ ] Dev server restarted
- [ ] Database tables created (`projects`, `profile`)
- [ ] Storage bucket `portfolio-assets` exists and is public
- [ ] Admin user created in Authentication
- [ ] Can log in with Supabase credentials
- [ ] Can upload projects (images go to Storage)
- [ ] Projects appear on homepage
- [ ] Can update profile

---

## Troubleshooting

### "Missing Supabase environment variables" error
- Check `.env.local` has both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart dev server after adding variables

### "Failed to upload image" error
- Verify storage bucket is named exactly `portfolio-assets`
- Check bucket is set to **public**
- Verify storage policies allow authenticated uploads

### Login fails
- Check user was created in Supabase Authentication
- Verify **Auto Confirm User** was enabled
- Try resetting user password in Supabase dashboard

### Images not displaying
- Check storage bucket policies allow public reads
- Verify bucket is public
- Check Network tab in DevTools for 404 errors

---

## Next: Migrate Mock Data (Optional)

If you've already created projects/profile using the mock system, you can:

1. **Manually re-create** them in the admin panel (recommended)
2. Or **export from localStorage** and import to Supabase

The app automatically detects Supabase and stops using mock data once credentials are configured.

---

## Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Check Supabase logs in the dashboard
3. Verify all steps above were completed
4. Let me know what error you're seeing!
