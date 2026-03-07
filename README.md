# Premium Hub - Razorpay Verification Landing Page

## Overview

Ye landing page Razorpay verification ke liye banaya gaya hai. Isme app ki complete details, features, aur policies included hain.

**🚀 Dynamic Content System:** Sab data GitHub repository se automatically fetch hota hai - koi manual update ki zarurat nahi!

---

## Dynamic Features

### ✅ Automatically Fetched from GitHub:

1. **Latest APK Download Link** - Har naye release pe automatically update
2. **Version Number** - Latest release tag se fetch
3. **APK File Size** - Download button pe display
4. **Repository Stats** - Stars, forks, watchers (optional)
5. **Release Notes** - Latest release description (optional)

### 🔧 Configuration

`config.js` file me sab settings hain:

```javascript
const CONFIG = {
    github: {
        owner: 'DevStudio2k25',
        repo: 'premium-hub-web'
    },
    features: {
        autoRefresh: true,        // Auto refresh data
        refreshInterval: 10 * 60 * 1000,  // 10 minutes
        showRepoStats: true,      // Show GitHub stats
        showDownloadCount: true   // Show download count
    }
};
```

---

## Files Included

1. **index.html** - Main landing page (dynamic content enabled)
2. **app.js** - GitHub API integration & dynamic data loader
3. **config.js** - Configuration for dynamic features
4. **terms.html** - Terms & Conditions
5. **privacy.html** - Privacy Policy
6. **refund.html** - Refund Policy
7. **README.md** - Ye file

---

## Deployment Steps

### Option 1: Vercel Deployment (Recommended)

1. **GitHub Repository Banao:**

   ```bash
   # Naya repo banao GitHub pe
   # Repo name: premium-hub-landing
   ```

2. **Files Upload Karo:**
   - Sab files ko naye repo mein upload karo
   - Commit message: "Initial landing page for Razorpay verification"

3. **Vercel Pe Deploy Karo:**
   - Vercel.com pe jao
   - "New Project" click karo
   - GitHub repo select karo
   - Deploy button click karo
   - 2-3 minutes mein live ho jayega

4. **URL Copy Karo:**
   - Deployment complete hone ke baad URL milega
   - Example: `https://premium-hub-landing.vercel.app`

### Option 2: Netlify Deployment

1. **Netlify.com pe jao**
2. "Add new site" > "Deploy manually"
3. Sab files ko drag & drop karo
4. Deploy button click karo
5. URL copy karo

### Option 3: GitHub Pages

1. **GitHub repo settings mein jao**
2. "Pages" section mein jao
3. Source: "Deploy from a branch"
4. Branch: main / master
5. Folder: root
6. Save karo
7. URL: `https://username.github.io/repo-name`

---

## APK Upload Steps

### GitHub Release (Recommended) - Automatic Update System

1. **APK Build Karo:**

   ```bash
   cd C:\Users\ankes\Desktop\my_premium
   flutter build apk --release
   ```

2. **GitHub Repo Pe Jao:**
   - Releases section mein jao
   - "Create a new release" click karo

3. **Release Details:**
   - Tag: v1.0.1 (ya jo bhi next version ho)
   - Title: Premium Hub v1.0.1
   - Description: Release notes (optional)
   - Upload APK: `build/app/outputs/flutter-apk/app-release.apk`

4. **Publish Release:**
   - "Publish release" button click karo
   - **🎉 Website automatically update ho jayegi!** Koi manual change ki zarurat nahi!

5. **Verification:**
   - Website pe jao aur refresh karo
   - Download button automatically latest APK link show karega
   - Version number bhi update ho jayega

### ⚡ Kaise Kaam Karta Hai?

- `app.js` har 5 minutes me GitHub API check karta hai
- Latest release automatically detect hota hai
- Download links aur version info real-time update hote hain
- Caching system fast loading ensure karta hai

---

## Razorpay Submission Details

### App Information

- **App Name:** Premium Hub
- **Package Name:** com.devstudio.premium_hub
- **Version:** 1.0.0
- **Platform:** Android

### URLs to Submit

- **Landing Page:** [Your Vercel/Netlify URL]
- **APK Download:** [GitHub Release URL]
- **Terms:** [Landing URL]/terms.html
- **Privacy:** [Landing URL]/privacy.html
- **Refund:** [Landing URL]/refund.html

### Business Details

- **Business Name:** DevStudio
- **Business Type:** [Individual/Proprietorship/Company]
- **Contact Email:** support@devstudio.com

---

## Customization

### Update Email Addresses

Sab HTML files mein `support@devstudio.com` ko apne actual email se replace karo:

```bash
# Find and replace in all files
support@devstudio.com -> your-email@example.com
```

### Update APK Download Link

index.html mein line 234:

```html
<a href="#" class="download-btn">📥 Download APK</a>
```

Replace `#` with your GitHub release APK URL.

### Add Screenshots

Screenshot placeholders ko actual screenshots se replace karo:

1. Screenshots upload karo (GitHub/Imgur/Firebase)
2. index.html mein screenshot-placeholder divs ko replace karo
3. `<img>` tags use karo

---

## Testing Checklist

Before Razorpay submission:

- [ ] Landing page properly load ho raha hai
- [ ] All links working hain (Terms, Privacy, Refund)
- [ ] APK download link working hai
- [ ] Mobile responsive hai
- [ ] Email addresses correct hain
- [ ] No broken images
- [ ] Fast loading time

---

## Support

Agar koi issue ho to:

1. Check browser console for errors
2. Verify all file paths
3. Test on mobile device
4. Check deployment logs

---

## Quick Commands

```bash
# Git commands
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [your-repo-url]
git push -u origin main

# Build APK
flutter build apk --release

# Check APK size
ls -lh build/app/outputs/flutter-apk/app-release.apk
```

---

## Notes

1. **APK Size:** ~25 MB (approximate)
2. **Minimum Android:** 5.0 (API 21)
3. **Target Android:** 14 (API 34)
4. **Architecture:** Universal APK (works on all devices)

---

## Contact

For any questions:

- Email: support@devstudio.com
- Developer: DevStudio
