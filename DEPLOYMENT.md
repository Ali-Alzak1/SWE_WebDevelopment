# Deployment Guide

This guide covers the essential steps to deploy this application to production.

## Prerequisites

- MongoDB database (MongoDB Atlas recommended for cloud hosting)
- Node.js runtime environment
- Environment variables configured

## Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# REQUIRED: MongoDB connection string
MONGO_URL=your_mongodb_connection_string

# REQUIRED: JWT secret for authentication (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# REQUIRED for production: Comma-separated list of allowed frontend origins
# Example: https://your-app.com,https://www.your-app.com
ALLOWED_ORIGINS=https://your-frontend-domain.com

# Optional: Server port (defaults to 8000)
PORT=8000

# Optional: JWT expiration time (defaults to "7d")
JWT_EXPIRES_IN=7d
```

**Critical Notes:**
- `MONGO_URL` is required - server will not start without it
- `JWT_SECRET` is required - server will not start without it
- `ALLOWED_ORIGINS` must be set to your production frontend URL(s) or CORS will block requests

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory with:

```env
# REQUIRED for production: Your backend API URL
VITE_API_BASE_URL=https://your-api-domain.com
```

**Important:** For Vite, environment variables must be prefixed with `VITE_` to be accessible in the browser. The variable is embedded at build time, so you must set it before running `npm run build`.

## Deployment Steps

### Backend Deployment

1. **Set up environment variables** on your hosting platform
2. **Install dependencies:**
   ```bash
   cd backend
   npm install --production
   ```
3. **Start the server:**
   ```bash
   npm start
   ```

### Frontend Deployment

1. **Set environment variable** `VITE_API_BASE_URL` to your production backend URL
2. **Build the application:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```
3. **Deploy the `dist/` folder** to your static hosting service

## Common Deployment Platforms

### Vercel / Netlify (Frontend)
- Set `VITE_API_BASE_URL` in environment variables
- Build command: `npm run build`
- Output directory: `dist`

### Render / Railway / Heroku (Backend)
- Set all backend environment variables
- Start command: `npm start`
- Build command: `npm install`

### MongoDB Atlas Setup
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user
3. Whitelist your server IP (or use 0.0.0.0/0 for all IPs - less secure)
4. Get connection string and set as `MONGO_URL`

## Security Checklist

- [ ] `JWT_SECRET` is a strong, random string (use `openssl rand -base64 32`)
- [ ] `ALLOWED_ORIGINS` is set to your production frontend domain(s) only
- [ ] `MONGO_URL` does not contain credentials in version control
- [ ] MongoDB database has proper access controls
- [ ] Environment variables are set in hosting platform (not in code)

## Troubleshooting

### CORS Errors
- Ensure `ALLOWED_ORIGINS` includes your exact frontend URL (including protocol and port if applicable)
- Check that the frontend URL matches exactly (no trailing slashes)

### Authentication Not Working
- Verify `JWT_SECRET` is set and consistent
- Check that tokens are being sent in Authorization header: `Bearer <token>`

### API Connection Failed
- Verify `VITE_API_BASE_URL` is set correctly in frontend build
- Check that backend is running and accessible
- Verify CORS configuration allows your frontend origin

