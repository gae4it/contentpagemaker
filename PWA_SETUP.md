# PWA Icons & Assets Setup Guide

## Overview

This project includes PWA (Progressive Web App) support with proper icon configuration for:

- Device home screen installation
- Browser tabs and bookmarks
- Adaptive icons on Android (maskable icons)
- Screenshot previews in app store

## Current Status

✅ **Configuration Complete:**

- [manifest.json](../public/manifest.json) - PWA manifest with all icon definitions
- [layout.tsx](../src/app/layout.tsx) - Metadata with favicon and manifest links
- [logo.svg](../public/images/icons/logo.svg) - Source SVG icon
- Scripts for icon generation (bash and PowerShell)

⏳ **Pending:**

- Generate PNG icons from the SVG source

## Icon Generation

### Option 1: Using PowerShell (Windows) ⭐ Recommended for this setup

```powershell
# Install ImageMagick first (if not already installed):
# Download from: https://imagemagick.org/script/download.php#windows
# OR use Chocolatey: choco install imagemagick

# Then run the generation script:
powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1
```

### Option 2: Using Bash (macOS/Linux)

```bash
# Install ImageMagick (if needed):
# macOS: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick

# Then run:
bash scripts/generate-icons.sh
```

### Option 3: Using Online Tool (maskable.app) - No Installation Required

1. Go to [maskable.app/editor](https://maskable.app/editor)
2. Upload the source icon: `public/images/icons/logo.svg`
3. Adjust the icon to fit within the safe zone (blue square)
4. Download icons in these sizes:
   - 192x192 (standard)
   - 192x192 (maskable)
   - 512x512 (standard)
   - 512x512 (maskable)
5. Save to `public/images/icons/`

Then generate favicon variants manually:

```bash
# Using ImageMagick or ImageResizer
convert public/images/icons/icon-192.png -resize 32x32 public/images/icons/favicon-32x32.png
convert public/images/icons/icon-192.png -resize 16x16 public/images/icons/favicon-16x16.png
```

### Option 4: Using pwa-asset-generator (Automated)

```bash
# Install globally
npm install -g pwa-asset-generator

# Generate all assets from SVG
pwa-asset-generator public/images/icons/logo.svg public/images/icons \
  --icon-only \
  --maskable \
  --splash false

# Move favicon files if needed
```

## Icon Files Required

After generation, you should have:

```
public/images/icons/
├── logo.svg                    # Source icon (✅ already created)
├── favicon-16x16.png          # Browser tab icon (small)
├── favicon-32x32.png          # Browser tab icon (medium)
├── favicon.ico                # Multi-resolution favicon
├── icon-192.png               # Standard PWA icon (mobile home screen)
├── icon-192-maskable.png      # Android adaptive icon (192x192)
├── icon-512.png               # High-res PWA icon
├── icon-512-maskable.png      # Android adaptive icon (512x512)
├── screenshot-540x720.png     # Mobile app store screenshot
└── screenshot-1280x720.png    # Desktop app store screenshot
```

## Testing Generated Icons

### 1. Test favicon in browser

```bash
npm run dev
# Open http://localhost:3000 in browser
# Icon should appear in browser tab
```

### 2. Test PWA installation (Chrome DevTools)

```
1. Open Chrome DevTools (F12)
2. Go to "Application" tab
3. Look for "Manifest"
4. Check all icons are loading (should show ✓)
5. Try "Install app" from address bar
```

### 3. Test on mobile device

- Scan app home screen
- Install PWA from mobile browser
- Verify icon and app name display correctly

### 4. Test maskable icons

Visit [maskable.app](https://maskable.app/) and upload the maskable icons to preview how they look with different Android masks:

- Circle
- Rounded rectangle
- Teardrop
- Squircle

## Manifest Configuration

The [public/manifest.json](../public/manifest.json) includes:

- **App metadata**: name, description, theme colors
- **Display mode**: standalone (fullscreen without browser UI)
- **Icon definitions**: Standard and maskable icons in multiple sizes
- **Shortcuts**: Quick actions for PWA (New Page, Edit Pages)
- **Screenshots**: App previews for store listings
- **Categories**: education, productivity

## Apple Web App Support

For iOS PWA installation, [src/app/layout.tsx](../src/app/layout.tsx) includes:

```tsx
appleWebApp: {
  capable: true,
  statusBarStyle: "black-translucent",
  title: "ContentPageMaker",
}
```

This enables:

- PWA installation on iOS home screen
- Custom status bar appearance
- Proper app title in iOS settings

## Design Guidelines for Icons

### Safe Zone (for maskable icons)

- Keep critical design elements within **80% of canvas** (10% padding on all sides)
- The outer 20% may be clipped by Android OS masks
- Test with various mask shapes at [maskable.app](https://maskable.app/)

### Colors & Contrast

- Use solid colors that work on both light and dark backgrounds
- Ensure sufficient contrast for small sizes (16x16 px)
- Test readability at 32x32 px size

### Design Best Practices

- Simple, recognizable design
- Works well at any size (16px to 512px)
- Scalable without pixelation (use SVG source)
- Unique silhouette for quick recognition

## Troubleshooting

### Icons not showing in browser tab

- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check favicon.ico exists at `public/favicon.ico`
- Verify manifest.json is linked in HTML head

### PWA installation not available

- Check manifest.json is valid JSON
- Verify HTTPS is enabled (or localhost)
- Check minimum requirements met:
  - Valid manifest.json
  - HTTPS (or localhost)
  - Service Worker (optional but recommended)
  - At least one icon (≥192px)

### Maskable icons not displaying correctly on Android

- Use [maskable.app](https://maskable.app/) to verify safe zone
- Ensure critical elements fit in 80% of canvas
- Test on actual Android device (emulator may vary)

## Next Steps

1. **Generate icons** using one of the methods above
2. **Run dev server**: `npm run dev`
3. **Test in browser**: Check favicon appears in tab
4. **Test PWA installation**: Use Chrome DevTools → Application → Install app
5. **Test on mobile**: Scan to mobile, add to home screen, verify appearance
6. **Deploy**: All PWA files are in `public/`, will be served automatically by Next.js

## References

- [Web App Manifest Spec](https://www.w3.org/TR/appmanifest/)
- [Maskable Icons Spec](https://w3c.github.io/manifest/#icon-masks)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [maskable.app Tool](https://maskable.app/)
- [ImageMagick Documentation](https://imagemagick.org/)

## Quick Commands

```bash
# Generate all icons (requires ImageMagick)
# Windows PowerShell:
powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1

# macOS/Linux bash:
bash scripts/generate-icons.sh

# Run development server
npm run dev

# Build for production
npm run build

# Check all files are present
ls -R public/images/icons/
```
