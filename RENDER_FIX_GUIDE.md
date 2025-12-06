# Render Deployment Fix - Root Directory Issue

## The Problem
Render is looking for `package.json` in `/opt/render/project/src/package.json` instead of `backend/package.json` or `frontend/package.json`.

## Immediate Fix (Do This First)

### Step 1: Fix Backend Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **backend service** (jadwal-gym-backend)
3. Click **Settings** tab
4. Set the following fields:
   - **Root Directory**: `backend` (exactly, no quotes, no slashes)
   - **Build Command**: `npm install` (remove any `backend/ $` prefix)
   - **Start Command**: `npm start` (or `node index.js`, remove any `backend/ $` prefix)
5. Click **Save Changes**
6. Go to **Manual Deploy** → **Deploy latest commit**

### Step 2: Fix Frontend Service
1. Click on your **frontend service** (jadwal-gym-frontend)
2. Click **Settings** tab
3. Set the following fields:
   - **Root Directory**: `frontend` (exactly, no quotes, no slashes)
   - **Build Command**: `npm install && npm run build` (remove any `frontend/ $` prefix)
   - **Publish Directory**: `dist`
4. Click **Save Changes**
5. Go to **Manual Deploy** → **Deploy latest commit**

## Verify the Fix

After setting Root Directory, the build should look for:
- Backend: `/opt/render/project/src/backend/package.json` ✅
- Frontend: `/opt/render/project/src/frontend/package.json` ✅

Instead of:
- ❌ `/opt/render/project/src/package.json` (wrong - this is what's causing the error)

## If Manual Fix Doesn't Work

### Option A: Recreate Services from Blueprint
1. **Delete existing services** (or just create new ones with different names)
2. In Render Dashboard: **New** → **Blueprint**
3. Connect your GitHub repository
4. Render will auto-detect `render.yaml` and create services correctly
5. Set environment variables:
   - **Backend**: `MONGO_URL`, `JWT_SECRET`, `ALLOWED_ORIGINS`
   - **Frontend**: `VITE_API_BASE_URL`

### Option B: Check render.yaml Location
Ensure `render.yaml` is:
- ✅ At the **root** of your repository (same level as `backend/` and `frontend/`)
- ✅ Committed to Git
- ✅ Pushed to GitHub

## Common Mistakes to Avoid

❌ **Wrong**: Root Directory = `/backend` (leading slash)
❌ **Wrong**: Root Directory = `./backend` (relative path)
❌ **Wrong**: Root Directory = `backend/` (trailing slash)
❌ **Wrong**: Root Directory = empty or not set
❌ **Wrong**: Build Command = `backend/ $ npm install` (includes directory prefix)
❌ **Wrong**: Start Command = `backend/ $ node index.js` (includes directory prefix)

✅ **Correct**: Root Directory = `backend` (just the folder name)
✅ **Correct**: Build Command = `npm install` (no directory prefix, commands are relative to Root Directory)
✅ **Correct**: Start Command = `npm start` or `node index.js` (no directory prefix)

## Still Having Issues?

1. **Check Build Logs**: Look at the full build log to see the exact path it's trying
2. **Verify Git**: Make sure your latest code (including `render.yaml`) is pushed to GitHub
3. **Clear Cache**: In Render, try **Settings** → **Clear Build Cache** → **Save** → **Redeploy**

## Quick Checklist

- [ ] Root Directory set to `backend` for backend service
- [ ] Root Directory set to `frontend` for frontend service
- [ ] Changes saved in Render dashboard
- [ ] New deployment triggered
- [ ] Environment variables set correctly
- [ ] `render.yaml` is at repository root
- [ ] Latest code pushed to GitHub

