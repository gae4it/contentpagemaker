# ContentPageMaker - Product Requirements Document

## 🎯 Project Status: **PRODUCTION READY** ✅

**Last Updated**: January 16, 2026  
**Version**: 3.0.0  
**Status**: Feature Complete - Authentication, Archive, Duplicate, Legal Compliance

---

## 📋 Executive Summary

ContentPageMaker is a production-ready web application for collecting, organizing, and managing landing page content. Built with the T3 Stack (Next.js 16, tRPC, Tailwind, Prisma) and Neon PostgreSQL, it features comprehensive user authentication via OAuth, advanced landing page management with archive and duplicate capabilities, and full GDPR/European legal compliance.

### Key Highlights

✅ **Multi-Provider Authentication** - GitHub, Google OAuth + Guest mode  
✅ **Advanced Landing Page Management** - Unlimited pages with archive/restore and duplicate  
✅ **Unique URL Enforcement** - Per-user URL constraints prevent duplicates  
✅ **Section Organization** - Up to 25 sections per page with rich content  
✅ **Content Management** - Text, buttons (up to 3), external images (up to 8)  
✅ **Export Functionality** - Formatted TXT file exports  
✅ **SEO Blocking** - Completely invisible to search engines  
✅ **Legal Compliance** - GDPR Privacy Policy, Terms of Service, German Impressum  
✅ **Responsive Design** - Optimized for desktop and mobile

---

## 🛠 Technology Stack

| Layer             | Technology        | Version       | Purpose                         |
| ----------------- | ----------------- | ------------- | ------------------------------- |
| **Frontend**      | Next.js           | 16.1.2        | React framework with App Router |
| **Language**      | TypeScript        | 5.9.3         | Type-safe development           |
| **UI**            | React             | 19.2.3        | Component library               |
| **Styling**       | Tailwind CSS      | 4.1.18        | Utility-first CSS               |
| **API**           | tRPC              | 11.8.1        | End-to-end type safety          |
| **Database**      | PostgreSQL (Neon) | 16            | Serverless PostgreSQL           |
| **ORM**           | Prisma            | 6.19.2        | Database toolkit                |
| **Auth**          | NextAuth.js       | 5.0.0-beta.30 | OAuth + session management      |
| **Validation**    | Zod               | 4.3.5         | Schema validation               |
| **State**         | Zustand           | 5.0.10        | Client state management         |
| **UI Components** | Headless UI       | 2.2.9         | Accessible components           |
| **Notifications** | react-hot-toast   | 2.6.0         | Toast notifications             |
| **Build**         | Turbopack         | Built-in      | Fast Next.js 16 bundler         |

---

## 🗄 Database Schema

### Authentication Models (NextAuth.js v5)

**User**

- `id` (String, CUID, PK)
- `name`, `email`, `emailVerified`, `image` (nullable)
- Relations: `accounts[]`, `sessions[]`, `landingPages[]`

**Account** (OAuth Provider Data)

- `id` (String, CUID, PK), `userId` (FK)
- `provider`, `providerAccountId`, OAuth tokens
- Unique: `[provider, providerAccountId]`

**Session**

- `id` (String, CUID, PK), `sessionToken` (unique)
- `userId` (FK), `expires` (DateTime)

**VerificationToken**

- `identifier`, `token`, `expires`
- Unique: `[identifier, token]`

### Application Models

**LandingPage**

- `id` (String, CUID, PK)
- `url` (String), `description` (String)
- `archived` (Boolean, default: false) **NEW v3.0**
- `userId` (String, FK, nullable)
- `createdAt`, `updatedAt` (DateTime)
- **Unique**: `[userId, url]` **NEW v3.0**
- Relations: `user`, `sections[]`

**Section** (Max 25 per page)

- `id` (String, CUID, PK)
- `name`, `intro` (80 chars), `title` (80 chars), `subtitle` (160 chars), `description`
- `order` (Int), `landingPageId` (FK)
- Relations: `landingPage`, `buttons[]`, `images[]`

**Button** (Max 3 per section)

- `id` (String, CUID, PK)
- `label`, `linkType` (enum: "url" | "scroll"), `value`
- `sectionId` (FK)

**Image** (Max 8 per section)

- `id` (String, CUID, PK)
- `url` (external URL), `alt` (optional)
- `sectionId` (FK)

---

## 🔐 Authentication & Authorization

### OAuth Providers

1. **GitHub OAuth** - Primary authentication
2. **Google OAuth** - Secondary authentication
3. **Guest Account** **NEW v3.0** - Shared anonymous account (no OAuth needed)

### Session Management

- **Strategy**: JWT-based (required for guest mode)
- **Expiration**: 30 days
- **Storage**: Database for OAuth, JWT-only for guests
- **Security**: HTTPS-only cookies, CSRF protection

### Protected Routes

- **Public**: `/auth/signin`, `/privacy`, `/terms`, `/legal`
- **Protected**: All others (via `src/proxy.ts` middleware)
- **API**: All tRPC procedures use `protectedProcedure`

### User Isolation

- Each user sees only their own landing pages
- Guest users share common data pool
- `userId` checked on all operations
- Unique URL constraint per user

---

## 🎯 Core Features

### 1. Landing Page Management

**Create** - Input URL (unique per user) + description  
**View/Edit** - Active and archived sections with search  
**Archive/Restore** **v3.0** - Move between active/archived  
**Duplicate** **v3.0** - Copy with auto-generated URL suffix (`-2`, `-3`)  
**Delete** - Permanent with confirmation modal

### 2. Section Management

- Create/edit up to 25 sections per page
- Reorder with up/down buttons
- Rich content: name, intro, title, subtitle, description
- Buttons (max 3): label, type (url/scroll), value
- Images (max 8): external URLs + alt text

### 3. Export Functionality

Export to formatted TXT:

```
LANDING PAGE: [url]
DESCRIPTION: [description]

=== SECTION 1: [name] ===
Intro: ...
Buttons: [label] -> [value] (type)
Images: [url1], [url2]
```

### 4. SEO Blocking **NEW v3.0**

- **robots.txt**: Blocks all crawlers (Google, Bing, DuckDuckGo, etc.)
- **Meta tags**: `noindex`, `nofollow`, `nocache`
- Complete invisibility to search engines

### 5. Legal Compliance **NEW v3.0**

**Privacy Policy** (`/privacy`) - GDPR compliant

- Data collection, legal basis, user rights (Art. 15-21)
- Retention, security, international transfers
- Cookie notice (session-only)

**Terms of Service** (`/terms`)

- Service description, user conduct, content ownership
- Disclaimers, liability limits, indemnification
- Governing law: Germany

**Legal Notice/Impressum** (`/legal`)

- §5 TMG compliance (German law)
- Contact details template (requires user input)
- EU dispute resolution, liability clauses

**Footer** - Persistent legal links on all pages

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+, npm
- Neon PostgreSQL database
- OAuth credentials (or use guest mode)

### Quick Start

```bash
# 1. Install
npm install

# 2. Configure .env
NEXTAUTH_URL=http://localhost:3000  # NO trailing slash
NEXTAUTH_SECRET=<generate-with-openssl>
DATABASE_URL=<neon-postgresql-url>
GITHUB_CLIENT_ID=<your-id>
GITHUB_CLIENT_SECRET=<your-secret>
GOOGLE_CLIENT_ID=<your-id>
GOOGLE_CLIENT_SECRET=<your-secret>

# Generate secret:
openssl rand -base64 32
# OR
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 3. Setup OAuth
# GitHub: https://github.com/settings/developers
#   Callback: http://localhost:3000/api/auth/callback/github
# Google: https://console.cloud.google.com/apis/credentials
#   Redirect: http://localhost:3000/api/auth/callback/google

# 4. Migrate database
npx prisma migrate dev

# 5. Run
npm run dev
```

Access at http://localhost:3000

---

## 🚀 Available Scripts

```bash
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run fix          # Auto-fix lint + format
npm run check        # Lint + format + typecheck
npx prisma studio    # Database GUI
```

---

## 📊 API Endpoints (tRPC)

### Landing Page Router

**Queries**

- `getAll({ archived?: boolean })` - List active/archived pages **v3.0**
- `getById({ id })` - Single page with ownership check
- `export({ id })` - TXT export

**Mutations**

- `create({ url, description, sections? })` - Create with URL uniqueness check **v3.0**
- `update({ id, url?, description? })` - Update with conflict check **v3.0**
- `duplicate({ id })` - Copy with auto-suffix **v3.0**
- `archive({ id })` - Move to archived **v3.0**
- `unarchive({ id })` - Restore to active **v3.0**
- `delete({ id })` - Permanent deletion

### Section Router

**Queries**

- `getAll({ landingPageId })` - List sections

**Mutations**

- `create({ landingPageId, ...fields })` - Create (25 max)
- `update({ id, ...fields })` - Update content
- `reorder({ id, direction })` - Up/down reordering
- `delete({ id })` - Delete with cascade

---

## 🎨 UI Components

### Custom Button Variants **v3.0**

- `primary` - Blue (default)
- `secondary` - Gray
- `danger` - Red (delete)
- `success` - Green (edit) **NEW**
- `warning` - Yellow (duplicate) **NEW**
- `gray` - Gray (archive/restore) **NEW**
- `ghost`, `outline` - Transparent/border

### Landing Page Card **v3.0**

4-button grid:

```
[ Edit (green)     ] [ Archive/Restore (gray) ]
[ Duplicate (yellow) ] [ Delete (red)        ]
```

Prop: `isArchived` controls Archive/Restore button text

---

## 🔒 Security & Privacy

### GDPR Compliance

- Minimal data collection (OAuth profile only)
- User rights: access, rectification, erasure, portability
- Data retention: until deletion + 30 days
- International transfers via SCCs

### Security Measures

- HTTPS enforced
- CSRF protection (NextAuth)
- SQL injection prevented (Prisma)
- XSS protection (React auto-escape)
- HTTP-only cookies, SameSite strict

---

## 🌍 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel (auto-detects Next.js)
3. Set env vars (without trailing slash in `NEXTAUTH_URL`)
4. Update OAuth callbacks to production URLs
5. Deploy

**Production OAuth Callbacks:**

- GitHub: `https://your-domain.vercel.app/api/auth/callback/github`
- Google: `https://your-domain.vercel.app/api/auth/callback/google`

---

## 📁 Project Structure

```
contentpagemaker/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│       ├── 20251012213314_init/
│       ├── 20260116135510_add_authentication/
│       ├── 20260116180322_create_guest_user/
│       └── 20260116183242_add_archived_and_unique_url/
├── public/
│   ├── favicon.ico
│   └── robots.txt                  # Search engine blocking
├── src/
│   ├── app/
│   │   ├── layout.tsx              # SEO blocking + Footer
│   │   ├── page.tsx
│   │   ├── add/page.tsx
│   │   ├── edit/
│   │   │   ├── page.tsx            # Active + archived sections
│   │   │   └── [id]/page.tsx
│   │   ├── auth/signin/page.tsx    # OAuth + Guest
│   │   ├── privacy/page.tsx        # GDPR Privacy Policy
│   │   ├── terms/page.tsx          # Terms of Service
│   │   ├── legal/page.tsx          # German Impressum
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       └── trpc/[trpc]/route.ts
│   ├── components/
│   │   ├── AuthProvider.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx              # Legal links
│   │   ├── LandingPageCard.tsx     # 4-button grid + isArchived
│   │   ├── SectionCard.tsx
│   │   └── ui/
│   │       └── Button.tsx          # 7 variants
│   ├── server/
│   │   ├── auth.ts                 # NextAuth + Guest provider
│   │   ├── db.ts
│   │   └── api/
│   │       ├── trpc.ts
│   │       └── routers/
│   │           ├── landingpage.ts  # Archive, duplicate, unique URL
│   │           └── section.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── validations.ts          # No 250-page limit
│   ├── proxy.ts                    # Route protection
│   └── env.js
├── .env                            # Git-ignored
├── package.json
├── PRD.md                          # This file
└── README.md
```

---

## 📝 Changelog

### v3.0.0 (January 16, 2026)

**Added**

- Archive/restore landing pages
- Duplicate with auto URL suffix
- Unique URL constraint per user
- SEO blocking (robots.txt + meta)
- Privacy Policy (GDPR)
- Terms of Service
- Legal Notice/Impressum (German law)
- Footer with legal links
- Guest account (shared)
- JWT sessions

**Changed**

- Removed 250-page limit
- Button colors: green (edit), yellow (duplicate), gray (archive)
- 2x2 button grid in cards
- Edit page: separated active/archived sections

**Database**

- Added `archived` Boolean
- Added `@@unique([userId, url])`

### v2.0.0 (January 16, 2026)

- NextAuth.js v5 integration
- GitHub + Google OAuth
- User isolation
- Protected routes
- Prisma downgrade to v6.19.2

### v1.0.0 (October 12, 2025)

- Initial release
- Landing page CRUD
- Section management
- Export to TXT

---

## ⚠️ Important Notes

### Legal Compliance

**⚠️ REQUIRED**: Update `/legal` page with your actual contact information before deployment. German law (§5 TMG) mandates complete Impressum. Placeholder text is marked in red.

### OAuth Setup

- **Local**: `http://localhost:3000` callbacks
- **Production**: `https://your-domain.vercel.app` callbacks (no trailing slash)
- **Guest mode**: Works without OAuth

### Database

- Guest user ID: `guest-user-shared-account` (created via migration)
- JWT sessions required for guest mode
- Each user sees only their own pages (guests share pool)

---

## 📞 Support

- Review this PRD thoroughly
- Check Privacy Policy, Terms, Legal Notice
- Verify env vars and OAuth callbacks
- Ensure `NEXTAUTH_URL` has no trailing slash

---

**Status**: ✅ **PRODUCTION READY**  
**Deployment**: Ready for Vercel  
**Legal**: Compliant (pending Impressum contact info)  
**Last Updated**: January 16, 2026
