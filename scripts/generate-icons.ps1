# PWA Icon Generator Script
# This PowerShell script generates PWA icons from the source SVG logo
# 
# Prerequisites:
#   - ImageMagick (convert command in PATH)
#   - Source SVG file at public/images/icons/logo.svg
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1

$ErrorActionPreference = "Stop"

$SourceSVG = "public/images/icons/logo.svg"
$IconsDir = "public/images/icons"
$TempPNG = "$env:TEMP\logo-base.png"

Write-Host "🎨 Generating PWA Icons from SVG source..." -ForegroundColor Green

# Check if source file exists
if (-not (Test-Path $SourceSVG)) {
    Write-Host "❌ Error: Source SVG not found at $SourceSVG" -ForegroundColor Red
    exit 1
}

# Check if ImageMagick is installed
try {
    $null = & convert -version 2>&1 | Select-Object -First 1
} catch {
    Write-Host "❌ Error: ImageMagick not found. Please install it:" -ForegroundColor Red
    Write-Host "   Download from: https://imagemagick.org/script/download.php#windows"
    Write-Host "   Or use Chocolatey: choco install imagemagick"
    exit 1
}

# Convert SVG to base PNG (512x512 for quality)
Write-Host "📦 Converting SVG to PNG base..." -ForegroundColor Cyan
& convert -background none $SourceSVG -resize 512x512 $TempPNG

# Generate standard icons
Write-Host "📱 Generating standard icons..." -ForegroundColor Cyan
& convert $TempPNG -resize 16x16 "$IconsDir/favicon-16x16.png"
& convert $TempPNG -resize 32x32 "$IconsDir/favicon-32x32.png"
& convert $TempPNG -resize 192x192 "$IconsDir/icon-192.png"
& convert $TempPNG -resize 512x512 "$IconsDir/icon-512.png"

# Generate maskable icons (with safe zone padding: 80% of canvas)
Write-Host "🎭 Generating maskable icons (with safe zone)..." -ForegroundColor Cyan
# 192x192: 80% = 154x154, centered
& convert $TempPNG -resize 154x154 -gravity center -extent 192x192 -background transparent "$IconsDir/icon-192-maskable.png"
# 512x512: 80% = 410x410, centered
& convert $TempPNG -resize 410x410 -gravity center -extent 512x512 -background transparent "$IconsDir/icon-512-maskable.png"

# Generate favicon.ico (multi-resolution)
Write-Host "🔗 Generating favicon.ico..." -ForegroundColor Cyan
& convert "$IconsDir/favicon-16x16.png" "$IconsDir/favicon-32x32.png" "$IconsDir/favicon.ico"

# Generate screenshot mockups (optional, for manifest)
Write-Host "📸 Generating screenshot mockups..." -ForegroundColor Cyan
# 540x720 (mobile/narrow)
& convert $TempPNG -resize 540x540 -gravity center -extent 540x720 -background "#3B82F6" "$IconsDir/screenshot-540x720.png"
# 1280x720 (desktop/wide)
& convert $TempPNG -resize 720x720 -gravity center -extent 1280x720 -background "#3B82F6" "$IconsDir/screenshot-1280x720.png"

# Cleanup
Remove-Item $TempPNG -Force

Write-Host "✅ Icon generation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Generated files:" -ForegroundColor Green
Get-ChildItem "$IconsDir/*.png", "$IconsDir/favicon.ico" -ErrorAction SilentlyContinue | ForEach-Object {
    $size = [math]::Round($_.Length / 1KB, 2)
    Write-Host "   $($_.Name) ($size KB)"
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "  1. Verify all icons look correct"
Write-Host "  2. Test PWA installation on mobile devices"
Write-Host "  3. Verify favicon appears in browser tabs"
Write-Host ""
Write-Host "To test maskable icons, visit: https://maskable.app" -ForegroundColor Gray
