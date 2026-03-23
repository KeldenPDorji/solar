# STAR-C Platform

**Solar Training & Research Centre** — A comprehensive web platform for accelerating Bhutan's clean energy transition through expert-led solar training programs and research initiatives.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database (Neon free tier recommended)
- JWT secret key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/KeldenDorji/STAR-C.git
cd solar
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Then edit `.env.local` and add:
- `DATABASE_URL` - Your PostgreSQL connection string from [Neon](https://console.neon.tech)
- `JWT_SECRET` - Generate with: `openssl rand -hex 32`

4. **Initialize database**
```bash
pnpm db:push
```

5. **Seed sample data (optional)**
```bash
curl -X POST http://localhost:3000/api/seed
```

6. **Start development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 👤 Demo Accounts

After seeding:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@starc.io` | `Admin@123456` |
| User | `user@example.com` | `User@123456` |

---

## 📋 Features

### Phase 1 (Current)
- ✅ **User Authentication** - Registration, login, JWT-based sessions
- ✅ **Role-Based Access** - User and Admin roles with different permissions
- ✅ **User Dashboard** - View profile, registrations, and stats
- ✅ **Admin Panel** - Manage events, users, and registrations
- ✅ **Responsive Design** - Mobile-friendly modern UI
- ✅ **Error Handling** - Comprehensive error pages and validation

### Phase 2 (Planned)
- Event registrations and approvals
- News and announcements management
- Email notifications
- User certifications
- Full LMS features

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL (Neon) |
| ORM | Drizzle ORM |
| Auth | Custom JWT + bcrypt |
| Validation | Zod |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login & Register pages
│   ├── dashboard/        # User dashboard
│   ├── admin/            # Admin panel
│   └── api/              # REST API endpoints
├── lib/
│   ├── auth/             # JWT & password utilities
│   ├── db/               # Database & schemas
│   ├── types/            # TypeScript types
│   └── utils/            # Helper functions
└── components/           # Reusable components
```

---

## 🔧 Available Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm db:push          # Sync schema with database
pnpm db:pull          # Pull schema from database
pnpm db:studio        # Open Drizzle Studio (visual DB editor)
```

---

## 🔐 Security

- Passwords hashed with bcryptjs
- JWT tokens in secure httpOnly cookies
- Input validation with Zod
- SQL injection protection via Drizzle ORM
- Environment variables not committed to Git
- Admin routes protected by middleware

---

## 📖 Documentation

Detailed documentation is available in the `/docs` folder:
- `ARCHITECTURE.md` - System design and components
- `DATABASE_SCHEMA.md` - Database structure
- `API_DESIGN.md` - API endpoints and responses
- `PHASE_ROADMAP.md` - Development roadmap

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
vercel
```

Then set environment variables in Vercel dashboard and redeploy.

### Manual Deployment

1. Build the project: `pnpm build`
2. Run production server: `pnpm start`
3. Use a process manager like PM2 for stability

---

## 📧 Support & Contact

For issues, questions, or contributions:
- Open an issue on GitHub
- Email: support@starc-bhutan.org

---

## 📄 License

This project is private and confidential for STAR-C and the International Solar Alliance.

---

## 🙏 Acknowledgments

Built with ❤️ for Bhutan's clean energy transition.

**Current Version**: Phase 1 - Foundation
**Last Updated**: March 2026

