# 🚀 Quick Start - Local Match Management

## Installation (2 minutes)

```bash
npm install
```

This installs multer and all dependencies. Supabase packages have been removed.

---

## Running (3 minutes)

### Open Terminal 1 - Start Backend

```bash
npm run server
```

You should see:
```
🚀 Server running on 0.0.0.0:3001
📂 Matches data: server/data/matches.json
📸 Uploads folder: server/uploads/upcoming-matches/
```

### Open Terminal 2 - Start Frontend

```bash
npm run dev
```

Frontend opens at `http://localhost:5173`

---

## Access Admin (1 minute)

Go to: **`http://localhost:5173/admin`**

Login with:
- Email: `admin@bearhatty.com`
- Password: `password123`

---

## Add Your First Match (2 minutes)

1. Click **"+ Add New Match"**
2. Fill in form:
   - Match Name: "Test Match"
   - Team 1: "Team A"
   - Team 2: "Team B"
   - Venue: "Stadium"
   - Date: Today
   - Time: 14:00
   - Sport: Football
3. Click **"Save Match"** (images optional)
4. ✅ Success! Match appears instantly

---

## Verify It Works

1. Homepage `http://localhost:5173/`
   - See match in "Upcoming Matches" section

2. Matches page `http://localhost:5173/upcoming-matches`
   - See match in full list
   - Try filter buttons

3. Admin dashboard `http://localhost:5173/admin/matches`
   - Edit the match
   - Delete the match
   - Add another

---

## Data Storage

All data is stored locally:

| What | Where |
|------|-------|
| Matches | `server/data/matches.json` |
| Images | `server/uploads/upcoming-matches/` |

You can view/edit JSON directly if needed.

---

## That's It! 🎉

Your local match management system is ready.

No Supabase. No setup. Just run it!

---

## Troubleshooting

**Backend won't start:**
- Make sure port 3001 is free
- Check `server/data/` and `server/uploads/` exist

**Frontend can't connect:**
- Make sure backend is running
- Check `http://localhost:3001` is accessible

**Images not uploading:**
- Check file is JPG/PNG
- Check file is under 5MB

**Need details?** 
Read `LOCAL_SETUP_GUIDE.md`
