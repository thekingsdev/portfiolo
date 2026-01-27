# Fix "Failed to Upload Image" Error

You're getting this error because Supabase Storage isn't configured yet. Here's how to fix it:

## ✅ Step 1: Create Storage Bucket

1. **Go to Supabase Dashboard**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Select your project**
3. **Click "Storage"** in the left sidebar
4. **Click "New bucket"** button

5. **Configure the bucket:**
   - **Name**: Type **exactly** `portfolio-assets` (must match this exactly!)
   - **Public bucket**: Toggle **ON** ✅ (very important!)
   - Click **"Create bucket"**

![Create bucket screenshot](https://supabase.com/docs/img/storage-create-bucket.png)

---

## ✅ Step 2: Verify Bucket Settings

After creating the bucket:

1. You should see `portfolio-assets` in the bucket list
2. It should have a "Public" badge next to it
3. If it says "Private", click the bucket → Settings → toggle "Public bucket" ON

---

## ✅ Step 3: Set Up Storage Policies (IMPORTANT!)

The storage policies allow your app to upload and read files.

**Option A: Use Supabase UI (Easier)**

1. Click on the `portfolio-assets` bucket
2. Click **"Policies"** tab  
3. Click **"New policy"**
4. Click **"Get started quickly"** 
5. Select **"Allow public read access"**
6. Click **"Review"** → **"Save policy"**

7. Click **"New policy"** again
8. Click **"For full customization"**
9. Configure:
   - **Policy name**: `Authenticated users can upload`
   - **Allowed operations**: Check **INSERT**, **UPDATE**, **DELETE**
   - **Target roles**: Select **authenticated**
   - **USING expression**: Type `true`
10. Click **"Save policy"**

**Option B: Use SQL (Better - includes all policies)**

1. In Supabase Dashboard, click **"SQL Editor"**
2. Click **"New query"**
3. Paste this SQL:

```sql
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

4. Click **"Run"** (or Ctrl+Enter)
5. You should see "Success. No rows returned"

---

## ✅ Step 4: Test Upload Again

1. Go back to your app: `http://localhost:3000/admin/projects`
2. Fill in the project form:
   - **Title**: "Test Project"
   - **Description**: "Testing Supabase Storage"
   - **Image**: Select any image
3. Click **"Upload Project"**

**Expected result:** ✅ Success! Project uploaded

---

## 🐛 Still Getting Errors?

### Check the browser console:
1. Press **F12** to open DevTools
2. Go to **Console** tab
3. Try uploading again
4. **Tell me the exact error message** you see (copy/paste it)

### Common issues:

**Error: "Bucket not found"**
- Make sure bucket is named exactly `portfolio-assets` (check for typos)

**Error: "Permission denied"**  
- Make sure bucket is set to **Public**
- Make sure storage policies are created

**Error: "Invalid credentials"**
- Check your `.env.local` file has correct Supabase URL and key
- Restart dev server if you changed `.env.local`

---

## ✅ Quick Checklist

Before uploading again, verify:

- [ ] `portfolio-assets` bucket exists in Storage
- [ ] Bucket is marked as "Public"
- [ ] Storage policies are created (3 policies)
- [ ] Dev server is running
- [ ] You're logged in to the admin panel

Once you've completed these steps, **try uploading again** and let me know if it works! 🚀
