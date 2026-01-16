#!/bin/bash
# PWA Icon Generator Script
# This script generates PWA icons from the source SVG logo
# 
# Prerequisites:
#   - ImageMagick (convert command)
#   - Source SVG file at public/images/icons/logo.svg
#
# Usage:
#   bash scripts/generate-icons.sh
#   OR
#   sh scripts/generate-icons.sh

set -e

SOURCE_SVG="public/images/icons/logo.svg"
ICONS_DIR="public/images/icons"
TEMP_PNG="/tmp/logo-base.png"

echo "🎨 Generating PWA Icons from SVG source..."

# Check if source file exists
if [ ! -f "$SOURCE_SVG" ]; then
    echo "❌ Error: Source SVG not found at $SOURCE_SVG"
    exit 1
fi

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick not found. Please install it:"
    echo "   macOS: brew install imagemagick"
    echo "   Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "   Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Convert SVG to base PNG (512x512 for quality)
echo "📦 Converting SVG to PNG base..."
convert -background none "$SOURCE_SVG" -resize 512x512 "$TEMP_PNG"

# Generate standard icons
echo "📱 Generating standard icons..."
convert "$TEMP_PNG" -resize 16x16 "$ICONS_DIR/favicon-16x16.png"
convert "$TEMP_PNG" -resize 32x32 "$ICONS_DIR/favicon-32x32.png"
convert "$TEMP_PNG" -resize 192x192 "$ICONS_DIR/icon-192.png"
convert "$TEMP_PNG" -resize 512x512 "$ICONS_DIR/icon-512.png"

# Generate maskable icons (with safe zone padding: 80% of canvas)
echo "🎭 Generating maskable icons (with safe zone)..."
# 192x192: 80% = 154x154, centered
convert "$TEMP_PNG" -resize 154x154 -gravity center -extent 192x192 -background transparent "$ICONS_DIR/icon-192-maskable.png"
# 512x512: 80% = 410x410, centered
convert "$TEMP_PNG" -resize 410x410 -gravity center -extent 512x512 -background transparent "$ICONS_DIR/icon-512-maskable.png"

# Generate favicon.ico (multi-resolution)
echo "🔗 Generating favicon.ico..."
convert "$ICONS_DIR/favicon-16x16.png" "$ICONS_DIR/favicon-32x32.png" "$ICONS_DIR/favicon.ico"

# Generate screenshot mockups (optional, for manifest)
echo "📸 Generating screenshot mockups..."
# 540x720 (mobile/narrow)
convert "$TEMP_PNG" -resize 540x540 -gravity center -extent 540x720 -background "#3B82F6" "$ICONS_DIR/screenshot-540x720.png"
# 1280x720 (desktop/wide)
convert "$TEMP_PNG" -resize 720x720 -gravity center -extent 1280x720 -background "#3B82F6" "$ICONS_DIR/screenshot-1280x720.png"

# Cleanup
rm "$TEMP_PNG"

echo "✅ Icon generation complete!"
echo ""
echo "Generated files:"
ls -lh "$ICONS_DIR"/*.png "$ICONS_DIR"/favicon.ico 2>/dev/null | awk '{print "   " $9 " (" $5 ")"}'
echo ""
echo "Next steps:"
echo "  1. Verify all icons look correct"
echo "  2. Test PWA installation on mobile devices"
echo "  3. Verify favicon appears in browser tabs"
echo ""
echo "To test maskable icons, visit: https://maskable.app"
