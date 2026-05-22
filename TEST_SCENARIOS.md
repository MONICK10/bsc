# 🧪 Admin System - Test Scenarios

Use this checklist to verify the entire admin match management system works correctly.

---

## 📋 Pre-Test Checklist

Before running tests, verify:

- [ ] Supabase project is created
- [ ] Database table exists (run database-schema.sql)
- [ ] Storage bucket "upcoming-matches" exists and is public
- [ ] .env has Supabase credentials
- [ ] `npm install` completed successfully
- [ ] `npm run dev` is running without errors
- [ ] Admin page loads at http://localhost:5173/admin
- [ ] Browser console has no errors (F12)

---

## ✅ Test Scenario 1: Admin Login

**Goal:** Verify admin can access the dashboard

**Steps:**
1. Go to http://localhost:5173/admin
2. See login form
3. Enter credentials: `admin@bearhatty.com` / `password123`
4. Click "Login" button

**Expected Result:**
- ✅ Redirects to admin dashboard
- ✅ See "Manage Matches" page
- ✅ No errors in console

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 2: Add Match Without Images

**Goal:** Verify form validation and basic match creation

**Steps:**
1. Click "+ Add New Match" button
2. Fill in required fields:
   - Match Name: `Test Match 1`
   - Team 1: `Team Alpha`
   - Team 2: `Team Beta`
   - Venue: `Test Stadium`
   - Date: Select today's date
   - Time: 14:30
   - Sport: Football
3. Leave images empty
4. Click "Save Match"

**Expected Result:**
- ✅ Success toast notification appears
- ✅ Form clears
- ✅ Match count increases
- ✅ Match appears in match list
- ✅ No console errors

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 3: Add Match With Images

**Goal:** Verify image upload functionality

**Steps:**
1. Click "+ Add New Match" button
2. Fill in all fields:
   - Match Name: `Football Final`
   - Team 1: `Real Madrid`
   - Team 2: `Barcelona`
   - Venue: `Bernabéu Stadium`
   - Date: Tomorrow's date
   - Time: 20:00
   - Sport: Football
   - Description: `Championship final match`
3. Upload Team 1 image (JPG/PNG, max 2MB)
4. See preview image display
5. Upload Team 2 image
6. Click "Save Match"

**Expected Result:**
- ✅ Images show preview before save
- ✅ Upload progress appears
- ✅ Success notification
- ✅ Match appears with images in list
- ✅ Images have white borders and rounded corners
- ✅ No console errors

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 4: View Match on Homepage

**Goal:** Verify new match appears on public homepage

**Steps:**
1. From admin, note the match name (e.g., "Football Final")
2. Go to http://localhost:5173/
3. Scroll to "Upcoming Matches" section
4. Find your test match

**Expected Result:**
- ✅ Match displays in preview grid
- ✅ Shows team names/images
- ✅ Shows match name, venue, date/time
- ✅ Has sport icon (⚽ for Football)
- ✅ Latest matches appear (sorted by date)

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 5: View Match on Full Matches Page

**Goal:** Verify match appears on dedicated matches page

**Steps:**
1. Click "View All Matches" link on homepage preview
2. Or go directly to http://localhost:5173/upcoming-matches

**Expected Result:**
- ✅ Page shows all upcoming matches
- ✅ Your test matches appear
- ✅ "All Sports" filter shows all matches
- ✅ "Football" filter shows only football matches
- ✅ Sport icons/badges display correctly
- ✅ Stats section shows totals:
   - Total matches: X
   - Football: X
   - Hockey: X

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 6: Filter Matches by Sport

**Goal:** Verify filter functionality

**Steps:**
1. Go to http://localhost:5173/upcoming-matches
2. See "All Sports" button (active/highlighted)
3. Click "Football" button
4. Only football matches display
5. Click "Hockey" button
6. Only hockey matches display (if any)
7. Click "All Sports"
8. All matches display again

**Expected Result:**
- ✅ Filters work correctly
- ✅ Active filter shows with glow effect
- ✅ Match count updates
- ✅ Cards animate on filter change
- ✅ No console errors

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 7: Edit Match

**Goal:** Verify edit functionality

**Steps:**
1. Go to admin dashboard
2. Find one of your test matches
3. Click "✏️ Edit" button on card
4. Update fields:
   - Change Match Name to: `Updated Match Name`
   - Change Venue to: `New Venue`
5. Optionally replace images
6. Click "Save Match"

**Expected Result:**
- ✅ Form pre-fills with current data
- ✅ Can change fields
- ✅ Can upload new images
- ✅ Old images replaced (not duplicated)
- ✅ Success notification shows
- ✅ Changes appear immediately in list
- ✅ Changes appear on homepage preview

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 8: Delete Match

**Goal:** Verify delete functionality

**Steps:**
1. Go to admin dashboard
2. Find a match you want to delete
3. Click "🗑️ Delete" button
4. Confirm deletion when prompted
5. Verify match is gone

**Expected Result:**
- ✅ Confirmation dialog appears
- ✅ Match removed from list
- ✅ Success notification
- ✅ Match disappears from homepage
- ✅ Match disappears from matches page
- ✅ Images removed from storage (silently)

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 9: Mobile Responsiveness

**Goal:** Verify mobile interface works

**Steps:**
1. Open browser DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" device
4. Go to admin dashboard
5. Try adding a match on mobile:
   - Form should stack vertically
   - Inputs should be large and touchable
   - Images should preview nicely
   - Buttons should be easy to tap
6. Go to matches page on mobile:
   - Matches display in single column
   - Filters work easily
   - Swipe/scroll navigation works

**Expected Result:**
- ✅ No layout breaking
- ✅ All inputs accessible
- ✅ Images display correctly
- ✅ Buttons have good spacing (48px minimum)
- ✅ No horizontal scrolling
- ✅ Form is easy to use on small screens

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 10: Form Validation

**Goal:** Verify required fields are validated

**Steps:**
1. Click "+ Add New Match"
2. Try to save WITHOUT filling any fields
3. Observe error handling
4. Fill only Match Name
5. Try to save (missing other required fields)
6. Add all required fields
7. Save successfully

**Expected Result:**
- ✅ Cannot save with empty required fields
- ✅ Form clearly indicates what's required
- ✅ Error messages are clear
- ✅ Once all fields filled, save succeeds
- ✅ Toast shows success

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 11: Sorting by Date

**Goal:** Verify matches display in correct date order

**Steps:**
1. Add multiple matches with different dates:
   - Today
   - Tomorrow
   - Next week
   - Last week (past)
2. Go to matches page
3. Check sort order

**Expected Result:**
- ✅ Matches sorted by date (earliest first)
- ✅ Past matches appear (if any)
- ✅ Future matches after past ones
- ✅ Dates display correctly

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 12: Navbar Navigation

**Goal:** Verify navbar links work correctly

**Steps:**
1. Go to http://localhost:5173/
2. Check navbar
3. Click each link:
   - Home → /
   - About → /about
   - Achievements → /achievements
   - Matches → /upcoming-matches (NEW)
   - Live → /live

**Expected Result:**
- ✅ "Matches" link goes to /upcoming-matches (new page)
- ✅ All other links work as before
- ✅ Active link shows highlighted
- ✅ Mobile menu works (click hamburger icon)
- ✅ Mobile menu closes after clicking link

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 13: Database Persistence

**Goal:** Verify data persists and syncs correctly

**Steps:**
1. Add a match
2. Refresh browser page
3. Match still appears
4. Close browser
5. Reopen browser
6. Go to admin dashboard
7. Match still there

**Expected Result:**
- ✅ Data persists after page refresh
- ✅ Data persists after browser close/reopen
- ✅ Multiple admins can see same matches (if applicable)
- ✅ No data duplication
- ✅ Real-time sync works

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 14: Image Storage

**Goal:** Verify images properly stored and served

**Steps:**
1. Add match with both images
2. Right-click on image → "Open image in new tab"
3. Image should load from Supabase Storage URL
4. Edit match and replace one image
5. Old image should be replaced
6. Delete match
7. Try to access old image URL (should fail)

**Expected Result:**
- ✅ Images load from Supabase Storage
- ✅ Image URLs are public (from upcoming-matches bucket)
- ✅ Old images deleted when replaced
- ✅ Images cleanup on match deletion
- ✅ No orphaned images in storage

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## ✅ Test Scenario 15: Error Handling

**Goal:** Verify graceful error handling

**Steps:**
1. Temporarily disconnect internet
2. Try to load matches page
3. Reconnect internet
4. Refresh page
5. Try with corrupted .env (remove one credential)
6. Try to load admin
7. Check console errors

**Expected Result:**
- ✅ Shows loading spinner when offline
- ✅ Shows error message if connection fails
- ✅ No crashes or freezing
- ✅ Console shows helpful error messages
- ✅ User knows what went wrong

**Pass/Fail:** ☐ PASS ☐ FAIL

---

## 📊 Test Results Summary

| Scenario | Result | Notes |
|----------|--------|-------|
| 1. Login | ☐ PASS ☐ FAIL | |
| 2. Add Without Images | ☐ PASS ☐ FAIL | |
| 3. Add With Images | ☐ PASS ☐ FAIL | |
| 4. Homepage Display | ☐ PASS ☐ FAIL | |
| 5. Full Page Display | ☐ PASS ☐ FAIL | |
| 6. Filter Sport | ☐ PASS ☐ FAIL | |
| 7. Edit Match | ☐ PASS ☐ FAIL | |
| 8. Delete Match | ☐ PASS ☐ FAIL | |
| 9. Mobile Responsive | ☐ PASS ☐ FAIL | |
| 10. Form Validation | ☐ PASS ☐ FAIL | |
| 11. Date Sorting | ☐ PASS ☐ FAIL | |
| 12. Navbar Nav | ☐ PASS ☐ FAIL | |
| 13. Data Persist | ☐ PASS ☐ FAIL | |
| 14. Image Storage | ☐ PASS ☐ FAIL | |
| 15. Error Handling | ☐ PASS ☐ FAIL | |

**Overall Result:** ☐ PASS ☐ FAIL

---

## 🐛 Issues Found

Document any issues discovered during testing:

```
Issue #1: [Description]
- Steps to reproduce: 
- Expected: 
- Actual: 
- Browser/Device: 

Issue #2: [Description]
- Steps to reproduce: 
- Expected: 
- Actual: 
- Browser/Device: 
```

---

## ✅ Sign-Off

- Tested By: ___________________
- Date: ___________________
- Status: ☐ READY FOR PRODUCTION ☐ NEEDS FIXES
- Notes: ___________________

---

**Good luck with your testing!** 🚀
