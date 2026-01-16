# ContentPageMaker

A complete **ContentPageMaker** web application built with the T3 Stack for collecting and organizing textual and media content for landing page creation.

## 🚀 Features

- **Modern UI**: Clean, simple interface with rounded borders and no animations
- **Section Management**: Create, edit, reorder, and delete sections with up/down buttons
- **Content Organization**: Manage text content, buttons, and external images
- **Export Functionality**: Export landing pages to formatted TXT files
- **Limits Enforcement**: Maximum 250 landing pages, 25 sections per page
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Feedback**: Toast notifications for all user actions

## 🧰 Tech Stack

| Technology            | Purpose                                |
| --------------------- | -------------------------------------- |
| **Next.js 15**        | Frontend framework with App Router     |
| **TypeScript**        | Type safety throughout the application |
| **tRPC**              | Type-safe API layer                    |
| **Prisma**            | ORM for PostgreSQL database operations |
| **Neon PostgreSQL**   | Serverless PostgreSQL 16 database      |
| **Tailwind CSS**      | Utility-first CSS framework            |
| **React Hook Form**   | Form validation and management         |
| **@headlessui/react** | Accessible modal/dialog components     |
| **react-hot-toast**   | Toast notifications                    |
| **Zustand**           | Client-side state management           |
| **Zod**               | Schema validation                      |

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Neon PostgreSQL account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/gae4it/contentpagemaker.git
   cd contentpagemaker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**
   - Copy `.env.example` to `.env`
   - Get your Neon PostgreSQL connection string from [console.neon.tech](https://console.neon.tech)
   - Update `DATABASE_URL` in `.env`:

   ```env
   DATABASE_URL="postgresql://[user]:[password]@[neon-host]/[database]?sslmode=require"
   ```

4. **Database setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev --name init

   # (Optional) Open Prisma Studio to inspect data
   npx prisma studio
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format:write` - Format code with Prettier
- `npx prisma studio` - Open database GUI
- `npx prisma migrate dev` - Run database migrations

## 🎯 Usage

### Creating Landing Pages

1. Navigate to the home page
2. Click "Add New Landing Page"
3. Fill in URL and description
4. Add sections with content, buttons, and images
5. Use up/down arrows to reorder sections
6. Save the landing page

### Managing Content

- **Sections**: Each section can have intro, title, subtitle, description
- **Buttons**: Up to 3 buttons per section (URL or scroll type)
- **Images**: Up to 8 external image URLs per section
- **Reordering**: Use up/down buttons to rearrange sections

### Exporting Data

- Go to the edit page of any landing page
- Click "Export to TXT" to download formatted content
- The export includes all sections, buttons, and images

## 🚀 Deployment

### Recommended Setup

- **Frontend**: Vercel (free tier, optimized for Next.js)
- **Database**: Neon PostgreSQL (free tier: 10GB storage)
- **Total Cost**: $0/month for small to medium projects

## 🔒 Environment Variables

```env
# Database (required)
DATABASE_URL="postgresql://[user]:[password]@[neon-host]/[database]?sslmode=require"

# Next.js (optional)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.
