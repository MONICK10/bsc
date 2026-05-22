# ⚽🏒 Bearhatty Sports Club - Official Website

A modern, responsive sports club website built with React, featuring live match streaming, upcoming matches management, achievements showcase, and an intuitive admin dashboard for non-technical users.

## 🎯 Features

### Public Features
- 🏠 **Homepage** - Hero section with club branding and upcoming matches preview
- ⚽ **Upcoming Matches** - Dynamic match listings with filtering by sport type
- 🏆 **Achievements** - Club achievements and milestones showcase
- 📺 **Live Streaming** - Real-time match streaming capability
- 🎬 **Gallery** - Photo carousel of club events
- ℹ️ **About Us** - Club information and history

### Admin Features
- 📋 **Match Management** - Create, edit, and delete upcoming matches
- 🖼️ **Image Upload** - Upload team logos with preview and progress tracking
- 📱 **Mobile-Friendly** - Optimized for tablet and phone admin use
- ✅ **Form Validation** - Clear feedback on required fields
- 🔔 **Notifications** - Toast messages for success/error feedback
- 🔐 **Authentication** - Secure admin login

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup

Create `.env` file with Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

See [QUICK_START_ADMIN.md](./QUICK_START_ADMIN.md) for detailed setup instructions.

## 📚 Documentation

- **[QUICK_START_ADMIN.md](./QUICK_START_ADMIN.md)** - 3-minute admin setup guide
- **[ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md)** - Comprehensive admin documentation
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical implementation overview
- **[TEST_SCENARIOS.md](./TEST_SCENARIOS.md)** - Testing checklist for verification
- **[database-schema.sql](./database-schema.sql)** - Database schema file

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── admin/          # Admin-specific components
│   ├── Navbar.jsx      # Navigation bar
│   ├── Footer.jsx      # Footer component
│   └── ...             # Other shared components
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── UpcomingMatchesPage.jsx
│   ├── AdminDashboard.jsx
│   ├── admin/          # Admin pages
│   └── ...
├── services/           # API and external services
│   ├── matchesService.js      # Match CRUD operations
│   ├── storageService.js      # Image upload/delete
│   └── supabaseClient.js      # Supabase initialization
├── router/             # React Router configuration
├── store/              # Zustand state management
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── styles/             # Global styles
```

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI framework |
| React Router | 6.20.0 | Client-side routing |
| Vite | 5.0.0 | Build tool |
| Tailwind CSS | 3.3.6 | Styling |
| Framer Motion | 11.0.0 | Animations |
| Supabase | 2.38.0 | Backend & storage |
| Zustand | 4.4.0 | State management |

## 🎨 Design System

### Colors
- **Sky Blue**: `#0EA5E9` - Primary accent
- **Navy Blue**: `#001F3F` - Text and titles
- **Cyan Glow**: `#06B6D4` - Hover states
- **Gradients**: Sport-specific (Football: blue, Hockey: purple)

### Typography
- **Headlines**: Oswald (bold, athletic)
- **Body**: Poppins (clean, readable)
- **Accent**: Bebas (strong presence)

### Effects
- Glassmorphism cards with frosted backdrop
- Smooth animations and transitions
- Responsive grid layouts
- Shadow and glow effects

## 🔐 Authentication

Admin login credentials (demo):
- Email: `admin@bearhatty.com`
- Password: `password123`

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop full experience
- ✅ Touch-friendly interfaces

## 🚦 Admin Workflow

### Adding a Match

1. Login to `/admin`
2. Click "+ Add New Match"
3. Fill form (Match name, teams, venue, date, time, sport)
4. Upload team logos (optional)
5. Click "Save Match"
6. Match appears on homepage and `/upcoming-matches`

### Editing a Match

1. Find match in admin dashboard
2. Click "✏️ Edit"
3. Update fields/images
4. Click "Save Match"
5. Changes sync instantly

### Deleting a Match

1. Find match in admin dashboard
2. Click "🗑️ Delete"
3. Confirm deletion
4. Match and images removed

## 🗄️ Database

All match data stored in Supabase with PostgreSQL:

- **matches** table - Stores all upcoming match information
- **upcoming-matches** storage bucket - Stores team logo images

Database automatically syncs with admin form submissions.

## 🧪 Testing

Run the comprehensive test scenarios from [TEST_SCENARIOS.md](./TEST_SCENARIOS.md) to verify all functionality:

- Admin login
- Adding matches (with and without images)
- Editing and deleting
- Mobile responsiveness
- Filter functionality
- Data persistence

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run server   # Start backend server
```

## 📦 Dependencies

### Main Dependencies
- `react` - UI framework
- `react-router-dom` - Routing
- `tailwindcss` - Utility-first CSS
- `framer-motion` - Advanced animations
- `@supabase/supabase-js` - Backend service
- `zustand` - State management

### Dev Dependencies
- `vite` - Build tool
- `eslint` - Code quality
- `postcss` - CSS processing

## 🤝 Contributing

1. Follow the existing code style
2. Use meaningful component and variable names
3. Add comments for complex logic
4. Test on mobile and desktop
5. Keep components reusable

## 📄 License

Private project for Bearhatty Sports Club

## 🎯 Future Enhancements

- [ ] Live score updates
- [ ] Match statistics and analytics
- [ ] Event notifications
- [ ] Social media integration
- [ ] Mobile app version
- [ ] Advanced analytics dashboard

## 📞 Support

For issues or questions:
1. Check console errors (F12)
2. Review documentation files
3. Check Supabase dashboard for database issues
4. Verify environment variables

## ✨ Recent Updates

### Phase 3 - Admin Match Management System
- ✅ Supabase integration for data persistence
- ✅ Dynamic match management (create/edit/delete)
- ✅ Image upload with storage management
- ✅ Dedicated matches page with filtering
- ✅ Real-time sync to public pages
- ✅ Non-technical admin interface
- ✅ Mobile-friendly admin dashboard

### Phase 1-2 - UI Modernization
- ✅ Premium sports design system
- ✅ 18+ components with animations
- ✅ Responsive layouts
- ✅ Glass-morphism effects
- ✅ Sport-specific branding

---

**🚀 Ready to manage your sports club!**

