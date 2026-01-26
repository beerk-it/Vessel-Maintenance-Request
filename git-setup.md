# Git Setup Instructions

## If Git is not installed:

1. Download Git from: https://git-scm.com/download/win
2. Install it with default settings
3. Restart your terminal/command prompt

## Commands to Push to GitHub:

### Step 1: Initialize Git Repository
```bash
git init
```

### Step 2: Add All Files
```bash
git add .
```

### Step 3: Create Initial Commit
```bash
git commit -m "Initial commit: Vessel Maintenance Request Form"
```

### Step 4: Add GitHub Remote
```bash
git remote add origin YOUR_GITHUB_REPO_URL
```
Replace `YOUR_GITHUB_REPO_URL` with your actual GitHub repository URL (e.g., `https://github.com/username/repo-name.git`)

### Step 5: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

## Alternative: If you already have a GitHub repo created:

1. Go to GitHub and create a new repository
2. Copy the repository URL
3. Run the commands above, replacing `YOUR_GITHUB_REPO_URL` with your actual URL

## Quick Setup Script (PowerShell):

You can also run this in PowerShell (after Git is installed):

```powershell
cd "c:\Users\Beer\Documents\CursorAI\Vessel Maintenance Request"
git init
git add .
git commit -m "Initial commit: Vessel Maintenance Request Form"
git branch -M main
# Then add your remote and push:
# git remote add origin YOUR_GITHUB_REPO_URL
# git push -u origin main
```
