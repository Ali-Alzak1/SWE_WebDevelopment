# Authentication System Setup

## Overview
This document describes the authentication system that has been implemented for the backend.

## Environment Variables Required

Add these to your `.env` file:

```
MONGO_URL=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# CORS Configuration (Security)
# Comma-separated list of allowed origins
# For local development: http://localhost:5173,http://localhost:3000
# For production: https://your-frontend-domain.com
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### CORS Security Configuration

The backend uses CORS (Cross-Origin Resource Sharing) to control which frontend domains can access the API. This is a critical security feature.

**For Local Development:**
- Default origins are `http://localhost:5173` and `http://localhost:3000`
- You can override by setting `ALLOWED_ORIGINS` in your `.env` file

**For Production:**
- **IMPORTANT**: Set `ALLOWED_ORIGINS` to your production frontend domain(s)
- Example: `ALLOWED_ORIGINS=https://your-app.com,https://www.your-app.com`
- Multiple origins can be specified by separating them with commas
- Never use `*` or allow all origins in production (security risk)

**CORS Features:**
- Validates origin on every request
- Blocks unauthorized origins with logging
- Supports credentials (cookies, authorization headers)
- Allows standard HTTP methods: GET, POST, PUT, PATCH, DELETE, OPTIONS

## API Endpoints

### Public Routes

1. **POST /api/auth/signup** - User registration
   - Body: `{ email, username, password }`
   - Returns: User data and JWT token

2. **POST /api/auth/login** - User login
   - Body: `{ username, password }`
   - Returns: User data and JWT token

3. **POST /api/auth/admin/login** - Admin login
   - Body: `{ username, password }`
   - Returns: Admin user data and JWT token (only if user has admin role)

### Protected Routes

4. **GET /api/auth/me** - Get current user profile
   - Headers: `Authorization: Bearer <token>`
   - Returns: Current user data

## File Structure

```
backend/
├── models/
│   └── User.js              (NEW - User model with password)
├── controllers/
│   └── authController.js    (NEW - Auth logic)
├── routes/
│   └── authRoutes.js        (NEW - Auth routes)
├── middleware/
│   ├── authMiddleware.js    (NEW - JWT verification)
│   └── validationMiddleware.js (NEW - Input validation)
└── index.js                 (MODIFIED - Added auth routes)
```

## Running the Server

### Development Mode
For local development with auto-reload on file changes:
```bash
npm run dev
```
This uses `nodemon` to automatically restart the server when files change.

### Production Mode
For production deployment:
```bash
npm start
```
This uses `node` directly (no auto-reload). This is what hosting platforms will use.

**Important:** The `start` script uses `node` (not `nodemon`) which is required for production environments. Development tools like `nodemon` are not suitable for production and can cause issues on hosting platforms.

## Dependencies

Make sure to install:
```bash
npm install bcrypt jsonwebtoken
```

For development, `nodemon` is included in `devDependencies` and will be installed with:
```bash
npm install
```

