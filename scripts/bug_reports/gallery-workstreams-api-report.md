# Gallery & Workstreams API — Bug Report

## Date: 2026-02-07

## Summary
Multiple workstream content types uploaded via the admin dashboard are not appearing correctly on the public website due to backend API issues.

---

## API Status Overview

| Endpoint | Status | Issue |
|----------|--------|-------|
| `/api/workstreams/gallery` | ❌ Empty | Items not exposed publicly |
| `/api/media-galleries` | ❌ Empty | Galleries not exposed publicly |
| `/api/workstreams/programs` | ❌ Error | `programs` table doesn't exist |
| `/api/workstreams/pillars` | ❌ Error | `pillars` table doesn't exist |
| `/api/workstreams/stories` | ✅ Working | Returns 2 stories |
| `/api/workstreams/resources` | ⚠️ Empty | No data (may be intentional) |
| `/api/workstreams/events` | ✅ Working | Returns 2 events |

---

## Issues Identified

### 1. Gallery Items Not Exposed Publicly (CRITICAL)

**Symptom**: Admin creates galleries with items (see "summer test" in admin), but public gallery page shows empty placeholders.

**Evidence**:
```bash
# Admin shows galleries exist, but public endpoints return empty:
curl -s "https://api.undayouth.org/api/workstreams/gallery" 
# Returns: { "count": 0, "items": [], "success": true }

curl -s "https://api.undayouth.org/api/media-galleries"
# Returns: { "galleries": [] }
```

**Root Cause Hypothesis**:
1. Galleries created in admin aren't being marked as "published" by default
2. OR: Public API endpoints query a different table than what admin writes to
3. OR: Public API filters by `published=true` but admin doesn't set this flag

**Required Backend Fix**:
- Ensure `/api/workstreams/gallery` returns items from the same source as admin "Media Galleries"
- Verify published/draft status is being set correctly when admin saves galleries

---

### 2. Programs API - Database Table Missing (CRITICAL)

**Endpoint**: `GET /api/workstreams/programs`

**Error Response**:
```json
{
  "error": "(psycopg2.errors.UndefinedTable) relation \"programs\" does not exist...",
  "success": false
}
```

**Impact**: Programs page falls back to hardcoded static content. Any programs created via admin won't appear.

**Required Backend Fix**:
- Run database migration to create `programs` table

---

### 3. Pillars API - Database Table Missing (CRITICAL)

**Endpoint**: `GET /api/workstreams/pillars`

**Error Response**:
```json
{
  "error": "(psycopg2.errors.UndefinedTable) relation \"pillars\" does not exist...",
  "success": false
}
```

**Impact**: Pillars section on Programs page falls back to hardcoded content.

**Required Backend Fix**:
- Run database migration to create `pillars` table

---

### 4. Resources API Returns Empty

**Endpoint**: `GET /api/workstreams/resources`

**Response**:
```json
{ "count": 0, "resources": [], "success": true }
```

**Status**: Endpoint working correctly, just no data uploaded yet. Not a bug.

---

### 5. Stories API (Working Correctly ✅)

**Endpoint**: `GET /api/workstreams/stories`

**Response**: Returns 2 stories correctly with proper structure.

---

### 6. Events API (Working Correctly ✅)

**Endpoint**: `GET /api/workstreams/events`

**Response**: Returns 2 events correctly with proper structure.

---

## Frontend Fixes Applied

The following frontend fixes have been applied in `src/services/workstreamService.js`:

1. **Added `extractArray` helper** - Properly extracts arrays from API responses that return `{ success, count, <entity>: [] }` format

2. **Updated `galleryService`**:
   - Added fallback to `/api/media-galleries` endpoint
   - Properly flattens gallery items from collections
   - Handles different response structures

3. **Updated all services** (stories, resources, programs, events):
   - Fixed array extraction for all list methods
   - Fixed single-item extraction for getOne methods

**Note**: Frontend now gracefully falls back to static/default content when API fails, which is why the site still shows programs - but admin-created content won't appear until backend is fixed.

---

## Action Items for Backend Team

### Critical (Blocking content from appearing)
- [ ] **Gallery**: Fix `/api/workstreams/gallery` to return items from admin "Media Galleries" 
- [ ] **Programs**: Run migration to create `programs` table
- [ ] **Pillars**: Run migration to create `pillars` table

### Recommended
- [ ] Verify published status logic for all workstream content types
- [ ] Consider adding a "sync" mechanism or ensuring admin and public APIs share the same data source
- [ ] Add database migration status check to deployment process

---

## Testing After Backend Fix

Once backend is fixed, verify:
```bash
# Should return gallery items
curl "https://api.undayouth.org/api/workstreams/gallery?type=photo"

# Should return programs without error
curl "https://api.undayouth.org/api/workstreams/programs"

# Should return pillars without error  
curl "https://api.undayouth.org/api/workstreams/pillars"
```
