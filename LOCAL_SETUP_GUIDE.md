# 🚀 Local File-Based Match Management System

## Overview

The Bearhatty Sports Club website now uses a **completely local** match management system with:

- ✅ **Express.js backend** for API handling
- ✅ **Local JSON file storage** for match data
- ✅ **Local folder storage** for images
- ✅ **Multer** for file uploads
- ✅ **NO external databases** (no Supabase, Firebase, MongoDB, etc.)
- ✅ **NO cloud storage** (all files stored locally)

Everything persists locally until manually changed by the admin.

---

## 📁 System Architecture

```
bearhatty-sports-club/
├── server.js                          # Express backend with APIs
├── server/
│   ├── data/
│   │   └── matches.json              # All match data stored here
│   └── uploads/
│       └── upcoming-matches/         # All team images stored here
│           ├── team1-image-*.png
│           ├── team2-image-*.png
│           └── ...
├── src/
│   ├── services/
│   │   └── matchesService.js         # Frontend API client
│   ├── components/
│   │   ├── admin/
│   │   │   └── MatchForm.jsx
│   │   └── ModernMatchCard.jsx
│   └── pages/
│       ├── UpcomingMatchesPage.jsx
│       └── admin/
│           └── ManageMatches.jsx
└── package.json                       # Dependencies (now has multer, no Supabase)
```

---

## 🎯 How It Works

### Admin Adds a Match

**Flow:**
```
1. Admin fills form in /admin/matches
   └─ Uploads team images

2. Frontend sends FormData to Express API
   └─ POST /api/matches

3. Backend (Express):
   ├─ Receives FormData with match data + images
   ├─ Saves images to: server/uploads/upcoming-matches/
   ├─ Adds match record to: server/data/matches.json
   └─ Returns match object with image paths

4. Homepage automatically reflects new match
   └─ Fetches from /api/matches
```

### Admin Edits a Match

**Flow:**
```
1. Admin clicks "Edit" on match card

2. Form pre-fills with current data
   └─ Shows existing images

3. Admin updates fields and optionally replaces images

4. Frontend sends PUT /api/matches/:id

5. Backend:
   ├─ Deletes old images if replaced
   ├─ Saves new images
   ├─ Updates matches.json
   └─ Returns updated match

6. Changes appear instantly on all pages
```

### Admin Deletes a Match

**Flow:**
```
1. Admin clicks "Delete" on match card

2. Confirms deletion dialog

3. Frontend sends DELETE /api/matches/:id

4. Backend:
   ├─ Deletes match from matches.json
   ├─ Deletes associated images from uploads folder
   └─ Returns success

5. Match disappears from all pages
```

---

## 📊 Data Storage

### Match Data Format (matches.json)

Located at: `server/data/matches.json`

Example:
```json
[
  {
    "id": 1,
    "match_name": "RMA vs BAR",
    "team1_name": "Real Madrid",
    "team2_name": "Barcelona",
    "team1_image": "/uploads/upcoming-matches/team1-123456789.png",
    "team2_image": "/uploads/upcoming-matches/team2-987654321.png",
    "venue": "Bernabéu Stadium",
    "match_date": "2026-05-30",
    "match_time": "20:00",
    "sport_type": "Football",
    "description": "Championship final",
    "created_at": "2026-05-22T10:30:00.000Z"
  }
]
```

### Image Storage

Located at: `server/uploads/upcoming-matches/`

Examples:
- `team1-1716451800000-123456789.png`
- `team2-1716451801000-987654321.jpg`

**Naming Convention:** `{team}-{timestamp}-{randomNum}.{ext}`

---

## 🔄 API Endpoints

### GET /api/matches
Fetch all matches (sorted by date)

**Response:**
```json
[
  { match object },
  { match object }
]
```

### POST /api/matches
Create new match with images

**Request:** FormData
- `match_name` - string (required)
- `team1_name` - string (required)
- `team2_name` - string (required)
- `venue` - string (required)
- `match_date` - date (required)
- `match_time` - time (required)
- `sport_type` - 'Football' or 'Hockey' (required)
- `description` - string (optional)
- `team1_image` - File (optional)
- `team2_image` - File (optional)

**Response:**
```json
{
  "id": 1,
  "match_name": "...",
  "team1_image": "/uploads/upcoming-matches/...",
  "team2_image": "/uploads/upcoming-matches/..."
}
```

### PUT /api/matches/:id
Update existing match

**Request:** Same as POST

**Response:** Updated match object

### DELETE /api/matches/:id
Delete match and images

**Response:**
```json
{
  "message": "Match deleted successfully"
}
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

This installs multer and all other required packages.

### 2. Start the Backend Server

```bash
npm run server
```

Server runs on `http://localhost:3001`

You should see:
```
🚀 Server running on 0.0.0.0:3001
📡 Socket.IO ready for connections
📂 Matches data: D:\bsc2\server\data\matches.json
📸 Uploads folder: D:\bsc2\server\uploads\upcoming-matches
```

### 3. Start the Frontend (in another terminal)

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Access Admin Dashboard

Go to: `http://localhost:5173/admin`

Login with: `admin@bearhatty.com` / `password123`

### 5. Test Adding a Match

1. Click "+ Add New Match"
2. Fill in form fields
3. Upload team images (optional)
4. Click "Save Match"
5. Check homepage - match appears instantly!

---

## 📁 File Structure Details

### server/
```
server/
├── data/
│   └── matches.json
│       └── JSON file with all match records
│
└── uploads/
    └── upcoming-matches/
        ├── team1-1716451800000-123.png
        ├── team2-1716451801000-456.jpg
        └── (all uploaded images)
```

### Data Persistence

- **Matches data** persists in `server/data/matches.json`
- **Images** persist in `server/uploads/upcoming-matches/`
- **No external dependencies** - everything is local
- **Survives page refresh** - data remains until manually changed
- **No database setup needed** - just run the server!

---

## 🔐 Admin Interface

### What Admin Can Do

✅ **Add Matches**
- Fill match details form
- Upload team logos
- Preview images
- See success confirmation

✅ **Edit Matches**
- Update match information
- Replace or remove images
- See changes instantly

✅ **Delete Matches**
- Remove matches from system
- Auto-delete associated images
- Confirmation dialog

✅ **Mobile-Friendly**
- Works on phone, tablet, desktop
- Large touch-friendly buttons
- Clear validation messages

---

## 🎨 Frontend Integration

### How Frontend Fetches Matches

```javascript
// In services/matchesService.js
export const fetchMatches = async () => {
  const response = await fetch('http://localhost:3001/api/matches');
  return await response.json();
};
```

### Image URLs

Images are served statically:
- Original upload: `/uploads/upcoming-matches/team1-xxxxx.png`
- Served by Express as: `http://localhost:3001/uploads/upcoming-matches/team1-xxxxx.png`
- Frontend accesses via: `<img src="/uploads/upcoming-matches/team1-xxxxx.png" />`

---

## 🛠️ Development

### Adding New Features

**To add a field to matches:**
1. Update MatchForm.jsx (add input)
2. Update matches.json structure (add property)
3. Update ModernMatchCard.jsx (display it)

**To modify image handling:**
1. Edit server.js (multer configuration)
2. Update matchesService.js (API calls)

### Debugging

**Check server logs:**
```bash
npm run server
```

**Check match data:**
```bash
cat server/data/matches.json
```

**Check uploaded images:**
```bash
ls server/uploads/upcoming-matches/
```

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check port 3001 is available
# Make sure server/data and server/uploads directories exist
npm run server
```

### Images not uploading
- Check `server/uploads/upcoming-matches/` directory exists
- Check file size (max 5MB)
- Check browser console for errors

### Matches not appearing
- Check `server/data/matches.json` exists
- Check backend is running on localhost:3001
- Refresh browser page

### Data disappeared
- Check `server/data/matches.json` still exists
- Check `server/uploads/upcoming-matches/` for images
- Data only deleted when admin clicks delete button

---

## 📊 System Requirements

- **Node.js** 16+ (for server)
- **npm** (for package management)
- **5MB disk space** (for small data + uploads)
- **Port 3001** (for backend)
- **Port 5173** (for frontend)

---

## 🚀 Production Deployment

For production:

1. **Build frontend:**
   ```bash
   npm run build
   ```

2. **Backup data:**
   ```bash
   cp -r server/data server/data.backup
   cp -r server/uploads server/uploads.backup
   ```

3. **Deploy:**
   - Server: Ensure Node.js is installed
   - Keep `server/` directory writable
   - Backend serves static files
   - Frontend is built into `dist/`

---

## 🎉 Summary

**No Supabase. No Firebase. No databases.**

Just:
- ✅ Express backend
- ✅ Local JSON files
- ✅ Local image storage
- ✅ Simple APIs
- ✅ Works offline

Everything is self-contained and persistent. Admin can manage matches without any technical setup!

---

## 📞 Quick Commands

```bash
# Install dependencies
npm install

# Start backend server
npm run server

# Start frontend dev server
npm run dev

# Build for production
npm run build

# View match data
cat server/data/matches.json

# List uploaded images
ls server/uploads/upcoming-matches/
```

---

**You're all set!** 🎊
