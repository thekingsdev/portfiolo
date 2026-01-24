# Quick Setup Guide 🚀

Follow these steps to get your portfolio running:

## Step 1: Supabase Setup

### Create Project
1. Go to https://supabase.com
2. Sign in or create an account
3. Click "New Project"
4. Enter project details:
   - Name: `portfolio` (or any name)
   - Database Password: (create a strong password - save it!)
   - Region: Choose closest to you
5. Wait for project to be created (~2 minutes)

### Run Database Schema
1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Open the file `supabase-schema.sql` from your project
3. Copy ALL the SQL code
4. Paste into Supabase SQL Editor
5. Click **"Run"** button
6. You should see "Success. No rows returned" ✅

### Create Storage Bucket
1. In Supabase Dashboard, go to **Storage** (left sidebar)
2. Click **"Create a new bucket"**
3. Bucket name: `portfolio-assets`
4. Make it **Public**: Toggle ON
5. Click **"Create bucket"**
6. The storage policies were already created by the SQL schema ✅

### Get API Credentials
1. In Supabase Dashboard, go to **Settings** (gear icon)
2. Click **"API"** in the left menu
3. Find these two values:
   - **Project URL** (looks like: https://xxx.supabase.co)
   - **anon/public key** (long string)
4. Keep this tab open - you'll need these values!

---

## Step 2: Environment Variables

1. In your project folder, find `.env.local.example`
2. Create a new file called `.env.local` (without .example)
3. Copy this template and fill in YOUR values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

4. Replace the values with what you copied from Supabase
5. **Save the file** ✅

---

## Step 3: Create Admin User

You need an admin account to access the dashboard!

1. In Supabase Dashboard, go to **Authentication** (left sidebar)
2. Click **"Users"** tab
3. Click **"Add User"** button (green button top right)
4. Select **"Create new user"**
5. Enter:
   - **Email**: your-email@example.com
   - **Password**: (create a strong password - remember it!)
6. Click **"Create User"**
7. You should see the user in the list ✅

---

## Step 4: Install Dependencies

If not already done, run:

```bash
npm install
```

Or if that has issues:

```bash
npm install --legacy-peer-deps
```

Wait for all packages to download (this may take a few minutes).

---

## Step 5: Run Development Server

Once dependencies are installed:

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

---

## Step 6: Test Your Portfolio

### View Public Portfolio
1. Open browser to: **http://localhost:3000**
2. You should see:
   - Clean minimalist design
   - "Creative Work" heading
   - "No projects to display yet" (normal - you haven't uploaded any)
   - About section at bottom

### Login to Admin
1. Go to: **http://localhost:3000/login**
2. Enter the email and password you created in Step 3
3. Click "Sign In"
4. You should be redirected to: **http://localhost:3000/admin**
5. You'll see the admin dashboard with sidebar ✅

### Upload Your First Project
1. In admin dashboard, click **"Projects"** in sidebar
2. Fill in the form:
   - **Title**: "My First Project"
   - **Description**: "This is a test project"
   - **Image**: Choose any image from your computer
3. Click **"Upload Project"**
4. You should see it appear in the "All Projects" list on the right ✅

### View on Public Site
1. Open a new tab to: **http://localhost:3000**
2. You should now see your project in the grid!
3. Click on it to open the modal with full details ✅

### Update Your Profile
1. Back in admin, click **"Profile"** in sidebar
2. Update the bio text
3. Upload a profile picture
4. (Optional) Upload your CV as a PDF
5. Click **"Save Changes"**
6. Go back to **http://localhost:3000** and scroll to About section
7. You should see your updated profile! ✅

---

## Troubleshooting

### Can't connect to Supabase?
- Check your `.env.local` file has correct values
- Make sure you ran the SQL schema
- Restart the dev server: Stop (Ctrl+C) and run `npm run dev` again

### Images not showing?
- Make sure storage bucket is named exactly: `portfolio-assets`
- Make sure the bucket is **public**
- Check browser console (F12) for errors

### Can't login?
- Make sure you created a user in Supabase Authentication
- Check email and password are correct
- Look for error message on login page

### "Module not found" errors?
- Run `npm install` again
- Delete `node_modules` folder and `.next` folder
- Run `npm install` again
- Then `npm run dev`

---

## Next Steps After Setup

1. **Upload your real projects** - Add all your graphic design work
2. **Customize your profile** - Update bio, add professional photo, upload CV
3. **Test on mobile** - Open on your phone to check responsive design
4. **Deploy to production** - Follow README.md deployment guide for Vercel

---

## Need Help?

Check these files in your project:
- **README.md** - Complete project documentation
- **walkthrough.md** - Detailed feature walkthrough
- **supabase-schema.sql** - Database schema reference

Enjoy your new portfolio! 🎨✨
