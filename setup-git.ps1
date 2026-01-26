# Git Setup Script for Vessel Maintenance Request Form
# Run this script in PowerShell after Git is installed

Write-Host "Setting up Git repository..." -ForegroundColor Cyan

# Initialize git repository
Write-Host "Initializing git repository..." -ForegroundColor Yellow
git init

# Add all files
Write-Host "Adding files..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Vessel Maintenance Request Form"

# Set main branch
Write-Host "Setting main branch..." -ForegroundColor Yellow
git branch -M main

Write-Host "`nGit repository initialized successfully!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Create a repository on GitHub (if you haven't already)" -ForegroundColor White
Write-Host "2. Run: git remote add origin YOUR_GITHUB_REPO_URL" -ForegroundColor White
Write-Host "3. Run: git push -u origin main" -ForegroundColor White
Write-Host "`nReplace YOUR_GITHUB_REPO_URL with your actual GitHub repository URL" -ForegroundColor Yellow
