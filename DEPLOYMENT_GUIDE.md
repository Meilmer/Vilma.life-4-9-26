# GitHub + Vercel Deployment Guide

## 📋 Overview

You'll upload your website to GitHub, then connect it to Vercel for hosting at vilma.life.

---

## Step 1: Upload to GitHub

### Option A: Using GitHub Website (Easiest)

1. **Go to GitHub.com and sign in**

2. **Create a new repository:**
   - Click the "+" icon (top right) → "New repository"
   - Name it: `portfolio` or `vilma-portfolio` (whatever you prefer)
   - Choose **Public** or **Private**
   - **Don't** check "Initialize with README"
   - Click "Create repository"

3. **Upload your files:**
   - On the new repository page, click "uploading an existing file"
   - Drag and drop ALL files from your `final code` folder:
     - `index.html`
     - `styles.css`
     - `script.js`
     - All `.html` project pages
     - All image files (`.jpg`, `.png`)
     - `frog-croaks-22312.mp3`
     - `README.md`
     - Any other files in the folder
   - Scroll down, write commit message: "Initial portfolio upload"
   - Click "Commit changes"

4. **Done!** Your code is now on GitHub

### Option B: Using GitHub Desktop

1. **Download GitHub Desktop** (if you don't have it): desktop.github.com

2. **Open GitHub Desktop:**
   - File → Add Local Repository
   - Click "Choose..." and select your `final code` folder
   - If it's not a git repo, GitHub Desktop will ask to initialize it - click "Yes"

3. **Publish to GitHub:**
   - Write commit message: "Initial portfolio upload"
   - Click "Publish repository"
   - Choose repository name and settings
   - Click "Publish repository"

### Option C: Using Command Line

```bash
cd "final code"
git init
git add .
git commit -m "Initial portfolio upload"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/YOURREPO.git
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Connect GitHub to Vercel:

1. **Go to Vercel.com** and sign in (use GitHub account to connect)

2. **Import your GitHub repository:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select your portfolio repository
   - Click "Import"

3. **Configure project:**
   - **Framework Preset:** Other (or "Static Site")
   - **Root Directory:** `./` (default, leave as is)
   - **Build Command:** Leave empty (not needed for static HTML)
   - **Output Directory:** Leave empty (default)
   - Click "Deploy"

4. **Wait for deployment** (takes 1-2 minutes)

5. **Your site is live!** 
   - Vercel will give you a URL like: `your-project.vercel.app`
   - You can set up custom domain (vilma.life) later in settings

---

## Step 3: Connect Custom Domain (vilma.life)

1. **In Vercel project dashboard:**
   - Go to "Settings" → "Domains"
   - Click "Add Domain"
   - Enter: `vilma.life`
   - Follow Vercel's instructions to update your domain's DNS settings

2. **Update DNS records** (wherever you registered vilma.life):
   - Add an A record pointing to Vercel's IP
   - Or add a CNAME record as instructed by Vercel
   - Vercel will show you exactly what to add

3. **Wait for DNS to propagate** (can take a few minutes to 48 hours)

---

## Future Updates

To update your website in the future:

1. **Make changes** to files in your `final code` folder locally
2. **Upload to GitHub:**
   - If using GitHub website: Edit files directly on GitHub
   - If using GitHub Desktop: Commit and push changes
   - If using command line: `git add .`, `git commit -m "Update message"`, `git push`
3. **Vercel automatically deploys** - it watches your GitHub repo and redeploys on changes!

---

## File Structure Checklist

Make sure these files are in your GitHub repository:

- ✅ `index.html` (main page)
- ✅ `styles.css` (all styling)
- ✅ `script.js` (JavaScript)
- ✅ Project HTML pages:
  - `scaly-music-app.html`
  - `mobile-app-logos.html`
  - `commission-illustrations.html`
  - `personal-work.html`
- ✅ All image files (`.jpg`, `.png`)
- ✅ Audio file (`frog-croaks-22312.mp3`)
- ✅ `README.md`

---

## Important Notes

- **All files must be in the repository root** (not in subfolders) for Vercel to serve them correctly
- **Vercel automatically detects `index.html`** as the homepage
- **Changes push automatically** - Vercel watches your GitHub repo and redeploys when you push
- **Free tier is perfect** for portfolio sites (generous limits)

---

## Troubleshooting

**Site not updating?**
- Check that you've pushed changes to GitHub
- Check Vercel dashboard for deployment status
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

**Images not showing?**
- Make sure all image files are in the repository
- Check that image paths in HTML match file names exactly
- Case-sensitive! `Image.jpg` ≠ `image.jpg`

**Domain not connecting?**
- Double-check DNS records match Vercel's instructions
- Wait a bit longer for DNS propagation
- Check Vercel domain settings for any errors

---

**Good luck with your deployment! 🚀**
