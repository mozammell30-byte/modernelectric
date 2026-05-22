# Netlify Deployment Guide (With Admin Panel)

This guide explains how to deploy the **Modern Electric Website** on Netlify and keep the admin panel working.

## 1) Prerequisites

- GitHub/GitLab/Bitbucket repo with this project
- Netlify account
- Node.js 20+ locally (recommended)

## 2) Important Admin/Data Note

This project stores editable website content in:

- `data/site-content.json`
- uploaded images in `public/uploads/`

On Netlify, the filesystem is **read-only at runtime** for deployed serverless functions.  
That means admin edits and uploads will not persist after deploy/restart unless you move storage to:

- a database (Supabase, PostgreSQL, etc.), or
- Netlify Blobs / external storage (S3, Cloudinary, etc.)

You can still deploy now for preview/demo. For production admin editing, migrate storage first.

## 3) Deploy on Netlify

1. Push code to your Git repository.
2. In Netlify, click **Add new site** -> **Import an existing project**.
3. Select your repository.
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. In **Site configuration -> Environment variables**, add your required variables (see section 4).
6. Click **Deploy site**.

## 4) Required Environment Variables

Add these in Netlify (same values as your local `.env`):

- `ADMIN_PASSWORD` = your admin login password
- `ADMIN_SESSION_SECRET` = a long random secret string
- `NEXT_PUBLIC_WHATSAPP_NUMBER` = WhatsApp number in international format (example: `919800782814`)

If your project currently uses different names, copy exactly what your API/auth files expect.

## 5) Admin Panel Access

- Login URL: `/admin/login`
- Admin URL: `/admin`

After deployment, test:

1. Login with password.
2. Update one section.
3. Save and refresh.

If changes disappear, that confirms runtime storage limits on Netlify (expected with file-based JSON).

## 6) Recommended Netlify Configuration File (Optional)

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
```

## 7) Troubleshooting

### `Cannot find module './xxx.js'` / `_next/static` 404

Usually stale build cache. Fix:

1. Clear Netlify cache and redeploy.
2. Ensure Next.js version is updated (project currently works well on `15.5.18`).

### Admin/API works locally but not on Netlify

Likely due to file-write restrictions in serverless runtime.  
Migrate `data/site-content.json` and uploads to persistent external storage.

## 8) Production Recommendation

For a real production admin panel on Netlify:

1. Move site content from JSON file to database.
2. Move image uploads to cloud storage.
3. Keep only read operations in static/frontend where possible.
4. Keep admin auth secret in Netlify environment variables only.
