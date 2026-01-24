# Portfolio Website

A minimalist graphic design portfolio with admin dashboard built with Next.js 14, Supabase, and Tailwind CSS.

## Features

### Public Portfolio
- Clean, minimalist design with grid layout
- Project showcase with hover effects and modal details
- About section with bio and CV download
- Fully responsive design

### Admin Dashboard
- Secure authentication
- Project management (upload/delete)
- Profile management (bio, avatar, CV)
- Image storage via Supabase

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [https://supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the schema from `supabase-schema.sql`
3. Go to **Storage** and create a bucket named `portfolio-assets` (make it public)

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from: Project Settings > API

### 4. Create Admin User

In Supabase Dashboard:
1. Go to **Authentication** > **Users**
2. Click **Add User**
3. Create an admin account with email and password

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio.
Visit [http://localhost:3000/login](http://localhost:3000/login) to access the admin dashboard.

## Project Structure

```
portfolio/
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── api/            # API routes
│   ├── login/          # Login page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── admin/          # Admin components
│   ├── about-section.tsx
│   ├── navigation.tsx
│   ├── project-grid.tsx
│   └── project-modal.tsx
├── lib/
│   └── supabase/       # Supabase client utilities
├── types/              # TypeScript types
└── supabase-schema.sql # Database schema

```

## Usage

### Managing Projects

1. Log in to `/login` with your admin credentials
2. Navigate to **Projects** in the admin panel
3. Upload new projects with title, description, and image
4. Delete projects by clicking the trash icon

### Managing Profile

1. Log in to `/login`
2. Navigate to **Profile** in the admin panel
3. Update your bio, profile picture, and CV
4. Click **Save Changes**

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

## License

MIT
