# Render Deployment Guide

## Quick Fix for Current Error

The error occurs because Render is looking for `package.json` in the root directory, but your project has separate `backend/` and `frontend/` directories.

## Solution: Use render.yaml (Recommended)

1. **The project now includes `render.yaml`** - This file tells Render how to deploy both services
2. **In Render Dashboard:**
   - Go to "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml` and create both services

## Manual Configuration (Alternative)

If you prefer to create services manually:

### Backend Service Configuration

1. Create a new **Web Service** in Render
2. Connect your GitHub repository
3. **IMPORTANT:** Set **Root Directory** to: `backend`
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. **Environment Variables:**
   - `MONGO_URL` - Your MongoDB connection string
   - `JWT_SECRET` - A strong random string (use `openssl rand -base64 32`)
   - `ALLOWED_ORIGINS` - Your frontend URL (e.g., `https://jadwal-gym-frontend.onrender.com`)
   - `JWT_EXPIRES_IN` - `7d` (optional)
   - `PORT` - Usually auto-set by Render

### Frontend Service Configuration

1. Create a new **Static Site** in Render
2. Connect your GitHub repository
3. **IMPORTANT:** Set **Root Directory** to: `frontend`
4. **Build Command:** `npm install && npm run build`
5. **Publish Directory:** `dist`
6. **Environment Variables:**
   - `VITE_API_BASE_URL` - Your backend URL (e.g., `https://jadwal-gym-backend.onrender.com`)

## Important Notes

- **Root Directory is critical** - Without it, Render looks for `package.json` in the root and fails
- **Environment variables must be set** before deployment
- **Backend URL format:** After deploying backend, you'll get a URL like `https://jadwal-gym-backend.onrender.com`
- **Frontend URL format:** After deploying frontend, you'll get a URL like `https://jadwal-gym-frontend.onrender.com`
- **Update ALLOWED_ORIGINS** in backend with your frontend URL after both are deployed

## Deployment Order

1. Deploy backend first
2. Note the backend URL
3. Deploy frontend with `VITE_API_BASE_URL` set to backend URL
4. Update backend's `ALLOWED_ORIGINS` with frontend URL
5. Redeploy backend (to apply CORS changes)

## Troubleshooting

### "Could not read package.json" Error
- **Solution:** Set Root Directory to `backend` or `frontend` (depending on which service)

### Build Fails
- Check that Root Directory is set correctly
- Verify environment variables are set
- Check build logs for specific errors

### CORS Errors
- Ensure `ALLOWED_ORIGINS` in backend includes your exact frontend URL
- No trailing slashes in the URL
- Include `https://` protocol

