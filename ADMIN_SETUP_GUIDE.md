# 🎯 Bearhatty Admin Match Management System - Setup Guide

## ✨ Overview

The Bearhatty Sports Club website now features a **fully admin-managed dynamic content system** for upcoming matches. Non-technical admins can easily:

- ✅ Add upcoming matches
- ✅ Upload team logos/images
- ✅ Edit matches
- ✅ Delete matches
- ✅ See instant updates on homepage and upcoming matches page

---

## 📋 Prerequisites

Before setting up the system, ensure you have:

1. **Supabase Account** - Create a free account at https://supabase.com
2. **Node.js & npm** - For running the development server
3. **Environment Variables** - Add Supabase credentials to `.env`

---

## 🗄️ Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Enter project details and create
5. Wait for project to initialize

### 2. Get Your Credentials

Go to Project Settings → API:

- Copy **Project URL** → `VITE_SUPABASE_URL`
- Copy **anon public key** → `VITE_SUPABASE_ANON_KEY`

### 3. Create Storage Bucket

1. Go to Storage in Supabase dashboard
2. Click "Create new bucket"
3. Name it: `upcoming-matches`
4. Make it **Public**
5. Click Create

### 4. Create Database Table

Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE matches (
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

CREATE INDEX idx_match_date ON matches(match_date);
CREATE INDEX idx_sport_type ON matches(sport_type);
```

### 5. Set Row Level Security (RLS)

For **public read access** (viewers):

```sql
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
  ON matches FOR SELECT
  USING (true);
```

For **admin write access** (optional - requires authentication):

```sql
CREATE POLICY "Enable all operations for authenticated users"
  ON matches
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```

### 6. Storage Bucket Permissions

Create public access policy:

```sql
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'upcoming-matches');

CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'upcoming-matches' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'upcoming-matches' AND auth.role() = 'authenticated');
```

---

## 🔐 Environment Variables

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Get these from:**
- Supabase Dashboard → Settings → API → Project URL & anon public key

---

## 👨‍💼 Admin User Guide

### Access Admin Dashboard

1. Go to `http://localhost:5173/admin/login`
2. Demo credentials: `admin@bearhatty.com` / `password123`
3. Click "🔓 Login"

### Managing Matches

#### ➕ Add a New Match

1. Click **"⚽ Add New Match"** button
2. Fill in the form:

   **Required Fields:**
   - **Match Name**: e.g., "RMA vs BAR" or "Bearhatty SC vs Tigers FC"
   - **Team 1 Name**: e.g., "Real Madrid"
   - **Team 2 Name**: e.g., "Barcelona"
   - **Venue**: e.g., "Central Stadium"
   - **Match Date**: Select date
   - **Match Time**: Select time
   - **Sport Type**: Choose Football or Hockey

   **Optional Fields:**
   - **Team 1 Image**: Upload team logo (JPG, PNG)
   - **Team 2 Image**: Upload team logo (JPG, PNG)
   - **Description**: Add match notes

3. Click **"✅ Save Match"**
4. Wait for success notification
5. Match appears instantly on:
   - Homepage (Upcoming Matches section)
   - Upcoming Matches page (`/upcoming-matches`)

#### ✏️ Edit a Match

1. Find the match card
2. Click **"✏️ Edit"** button
3. Update any fields
4. Optionally replace images
5. Click **"✅ Save Match"**
6. Updates appear instantly

#### 🗑️ Delete a Match

1. Find the match card
2. Click **"🗑️ Delete"** button
3. Confirm deletion
4. Match removed instantly
5. Associated images automatically deleted from storage

---

## 🎨 Match Card Display

### How Matches Appear to Visitors

**Upper Section:**
- Team 1 Logo | **VS** | Team 2 Logo
- (Uses uploaded images or sport emoji fallback)

**Lower Section:**
- Match Name
- Venue (📍)
- Date & Time (📅)
- Sport Type (⚽ or 🏒)
- Description (if provided)

---

## 📱 Responsive Design

The admin interface works perfectly on:

✅ **Desktop** - Full form with side-by-side images  
✅ **Tablet** - Optimized layout  
✅ **Mobile** - Vertical stack, large buttons

---

## 📸 Image Upload Best Practices

### Recommended Image Sizes

- **Team Logos**: Square 200x200px - 500x500px
- **Format**: JPG or PNG
- **File Size**: Under 2MB each

### Storage Structure

All uploaded images automatically go to:
```
upcoming-matches/
  ├── 1234567890-team1.png
  ├── 1234567891-team2.jpg
  └── ...
```

Images are automatically deleted when matches are deleted.

---

## 🔄 How Data Flows

```
Admin Adds Match
    ↓
Images upload to Supabase Storage (upcoming-matches/)
    ↓
Match data saved to database
    ↓
Public pages fetch latest matches
    ↓
Visitors see updated matches instantly
```

---

## 🚀 Features

| Feature | Status | Details |
|---------|--------|---------|
| Add Matches | ✅ | With image uploads |
| Edit Matches | ✅ | Replace images anytime |
| Delete Matches | ✅ | Auto-cleanup of images |
| Image Preview | ✅ | See images before saving |
| Upload Progress | ✅ | Shows upload % |
| Form Validation | ✅ | All required fields checked |
| Toast Notifications | ✅ | Success/error messages |
| Responsive Design | ✅ | Works on all devices |
| Automatic Sync | ✅ | Homepage updates instantly |

---

## 🛠️ Troubleshooting

### Images Not Uploading

**Issue:** Upload fails silently  
**Solution:**
- Check Supabase credentials in `.env`
- Verify storage bucket is public
- Check file size (max 5MB)
- Check browser console for errors

### Matches Not Appearing

**Issue:** Saved matches don't show on homepage  
**Solution:**
- Wait 2-3 seconds for sync
- Refresh browser page
- Check browser console for errors
- Verify Supabase connection

### Login Not Working

**Issue:** Can't access admin dashboard  
**Solution:**
- Clear browser cookies
- Check credentials
- Verify authentication setup
- Check browser console

---

## 📞 Support

If you encounter issues:

1. Check browser console (F12 → Console tab)
2. Check Supabase dashboard for errors
3. Verify environment variables are set
4. Verify database table exists
5. Test Supabase connection directly

---

## ✅ Verification Checklist

Before going live:

- [ ] Supabase project created
- [ ] `.env` file has correct credentials
- [ ] Database table created with correct schema
- [ ] Storage bucket created and is public
- [ ] Admin can log in
- [ ] Admin can add a match
- [ ] Match appears on homepage
- [ ] Match appears on upcoming matches page
- [ ] Images upload successfully
- [ ] Can edit matches
- [ ] Can delete matches
- [ ] Mobile interface works

---

## 🎯 Next Steps

1. **Test Admin Flow**: Add a test match
2. **Share Admin URL**: Give admins access to `/admin`
3. **Train Admin**: Show how to add/edit/delete matches
4. **Monitor**: Watch for issues in browser console

---

## 📚 File Structure

```
src/
├── services/
│   ├── supabaseClient.js       # Supabase initialization
│   ├── storageService.js       # Image upload/delete
│   └── matchesService.js       # Match CRUD operations
├── components/
│   ├── admin/
│   │   └── MatchForm.jsx       # Admin form component
│   ├── ModernMatchCard.jsx     # Match display card
│   └── UpcomingMatchesPreview.jsx
├── pages/
│   ├── UpcomingMatchesPage.jsx # Public matches page
│   └── admin/
│       └── ManageMatches.jsx   # Admin dashboard
└── router/
    └── index.jsx              # Routes with new page
```

---

Enjoy managing your matches! 🎉
