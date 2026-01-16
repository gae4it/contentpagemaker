# ContentPageMaker

**Version 3.0.0** - Production-ready landing page content management system with multi-provider authentication, archive/duplicate features, and full GDPR/EU legal compliance.

---

## ✨ Features

### Core Functionality

- **Unlimited Landing Pages** - Create, edit, and organize content
- **Rich Sections** - Up to 25 sections per page with text, buttons (3 max), images (8 max)
- **Archive & Restore** - Move old pages to archive without deletion
- **Smart Duplicate** - Copy pages with auto-generated unique URLs (`-2`, `-3`)
- **Export** - Download formatted TXT files
- **Unique URL Protection** - Per-user URL constraints prevent conflicts

### Authentication

- **GitHub OAuth** - Primary authentication
- **Google OAuth** - Secondary authentication
- **Guest Mode** - Shared anonymous account (no OAuth needed)

### Privacy & Compliance

- **SEO Blocking** - Completely invisible to search engines (robots.txt + meta tags)
- **GDPR Privacy Policy** - Article 6, 15-21 compliant
- **Terms of Service** - German law jurisdiction
- **Legal Notice/Impressum** - §5 TMG compliance (requires contact info)

---

## 🚀 Quick Start

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env
# Edit .env with your database and OAuth credentials

# 3. Setup database
npx prisma migrate dev

# 4. Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Setup

Create `.env` file:

```bash
# NextAuth (REQUIRED - no trailing slash!)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>

# Database (REQUIRED)
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# OAuth (OPTIONAL - guest mode works without these)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Generate Secret

```bash
openssl rand -base64 32
# OR
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### OAuth Setup (Optional)

**GitHub:** [https://github.com/settings/developers](https://github.com/settings/developers)

- Callback URL: `http://localhost:3000/api/auth/callback/github`

**Google:** [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

- Redirect URI: `http://localhost:3000/api/auth/callback/google`

---

## 🛠 Tech Stack

- **Framework:** Next.js 16.1.2 (Turbopack)
- **Language:** TypeScript 5.9.3
- **UI:** React 19.2.3, Tailwind CSS 4.1.18
- **API:** tRPC 11.8.1 (end-to-end type safety)
- **Database:** Neon PostgreSQL (Prisma 6.19.2)
- **Auth:** NextAuth.js v5.0.0-beta.30
- **State:** Zustand 5.0.10
- **Validation:** Zod 4.3.5

---

## 📦 Available Scripts

```bash
npm run dev       # Development server with Turbopack
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint check
npm run fix       # Auto-fix linting + formatting
npm run check     # Lint + format + typecheck

npx prisma studio # Database GUI
npx prisma migrate dev # Create migration
```

---

## 📊 Database Schema

- **User** - Auth profiles (GitHub, Google, Guest)
- **LandingPage** - URLs, descriptions, archived flag, unique per user
- **Section** - Content blocks (max 25 per page)
- **Button** - CTAs with link/scroll behavior (max 3 per section)
- **Image** - External URLs with alt text (max 8 per section)

**Migrations:**

1. `init` - Base schema
2. `add_authentication` - NextAuth models
3. `create_guest_user` - Shared guest account
4. `add_archived_and_unique_url` - v3.0 features

---

## 🌍 Deployment (Vercel)

1. Push code to GitHub
2. Import to Vercel
3. Set environment variables (production URLs, no trailing slash in `NEXTAUTH_URL`)
4. Update OAuth callbacks:
   - GitHub: `https://your-domain.vercel.app/api/auth/callback/github`
   - Google: `https://your-domain.vercel.app/api/auth/callback/google`
5. Deploy

---

## ⚠️ Important Notes

### Before Deployment

- **⚠️ Update `/legal` page** with your actual contact information (German law §5 TMG)
- Ensure `NEXTAUTH_URL` has **NO trailing slash**
- Configure OAuth callbacks for production domain

### SEO Blocking

App is completely invisible to search engines. Remove `robots.txt` and meta tags in [layout.tsx](src/app/layout.tsx) if you want it indexed.

---

## 📄 Documentation

See [PRD.md](PRD.md) for comprehensive documentation including:

- Full API reference (tRPC endpoints)
- Detailed feature descriptions
- Security & GDPR compliance details
- Complete database schema
- Deployment guide

---

## 🎨 UI Features

**Button Colors (v3.0):**

- Green - Edit
- Yellow - Duplicate
- Gray - Archive/Restore
- Red - Delete

**Responsive Design:** Optimized for desktop and mobile

---

## 📞 Support

- Review [PRD.md](PRD.md) for detailed documentation
- Check `/privacy`, `/terms`, `/legal` pages for compliance info
- Ensure OAuth callbacks match `NEXTAUTH_URL` exactly

---

**Status:** ✅ Production Ready  
**Version:** 3.0.0  
**Last Updated:** January 16, 2026

**License:** MIT
