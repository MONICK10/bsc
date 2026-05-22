# ⚡ Quick Start - Admin Match Management

## 3-Minute Setup

### 1️⃣ Create Supabase Project (2 min)
- Go to https://supabase.com → "New Project"
- Get **Project URL** and **anon key** from Settings → API

### 2️⃣ Add Environment Variables (1 min)
Create `.env` in project root:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3️⃣ Create Database & Storage
**In Supabase SQL Editor, run:**
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON matches FOR SELECT USING (true);
```

**In Storage:**
- Create bucket named `upcoming-matches`
- Make it **Public**

### 4️⃣ Start Using

**Access Admin:**
```
http://localhost:5173/admin
Login: admin@bearhatty.com / password123
```

**Add Matches:**
1. Click "+ Add New Match"
2. Fill form (match names, teams, date/time)
3. Upload team images (optional)
4. Save

**Result:** Matches appear instantly on homepage and `/upcoming-matches`

---

## ✅ Verify It Works

1. Add a test match
2. See it on homepage "Upcoming Matches" section
3. See it on `/upcoming-matches` page
4. Try editing and deleting

That's it! 🎉

---

For full details, see [ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md)
