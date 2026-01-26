# GitHub Pages Setup Guide

## Problem: "Upgrade or make this repository public to enable Pages"

This happens because your repository is **Private** and GitHub Free plan only allows GitHub Pages for **Public** repositories.

## Solution: Make Repository Public

### Step 1: Change Repository Visibility
1. Go to: https://github.com/beerk-it/Vessel-Maintenance-Request/settings
2. Scroll down to **"Danger Zone"** section
3. Click **"Change visibility"**
4. Select **"Make public"**
5. Type the repository name to confirm: `beerk-it/Vessel-Maintenance-Request`
6. Click **"I understand, change repository visibility"**

### Step 2: Enable GitHub Pages
1. Go to: https://github.com/beerk-it/Vessel-Maintenance-Request/settings/pages
2. Under **"Build and deployment"**:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`
3. Click **Save**
4. Wait 1-2 minutes for deployment

### Step 3: Access Your Form
Your form will be available at:
**https://beerk-it.github.io/Vessel-Maintenance-Request**

## Why Make It Public?

✅ **Free** - No upgrade needed
✅ **Form is already public** - Users need to access it anyway
✅ **No sensitive code** - Just HTML/CSS/JS
✅ **Data is secure** - Form data goes to your private Google Sheets

## Alternative: Keep Private (Requires Upgrade)

If you need to keep the repository private, you'll need to:
- Upgrade to GitHub Pro ($4/month) or
- Upgrade to GitHub Enterprise

But for a public form, making the repo public is the best option!
