# Performancy

Sales Performance Platform with AI-powered coaching, RBAC and dynamic licensing system.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure your DATABASE_URL in .env

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed initial data
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📋 Demo Users

| Role | Email | Password |
|------|-------|----------|
| **ADMIN** | admin@performancy.com | admin123 |
| **DIRECTOR** | director@demo.com | director123 |
| **MANAGER** | manager@demo.com | manager123 |
| **AGENT** | agent@demo.com | agent123 |

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: PostgreSQL + Prisma 6
- **Auth**: NextAuth.js v5 (email/senha, Google, LinkedIn)

### RBAC Hierarchy

```
ADMIN (Performancy Staff)
  └── Full access to all companies
      └── DIRECTOR (Company Level)
          └── Full access to own company
              └── MANAGER (Squad Level)
                  └── Access to managed squads
                      └── AGENT (Individual)
                          └── Access to own data only
```

### License Types (Cumulative)

| License | Features |
|---------|----------|
| **AutoCRM** | Conversations, Settings, Playbooks |
| **Treinamento** | AutoCRM + Role Play, Chat AI |
| **Atividades** | Treinamento + Inbox, Calendar, Performance, Pipeline, Insights |
| **Área de Receita** | ALL features + Goals/KPIs, Bots, Executive Dashboard |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Login, Register
│   ├── (admin)/admin/      # Admin Panel (ADMIN only)
│   └── [company_slug]/     # Multi-tenant routes
│       ├── dashboard/
│       ├── conversations/
│       ├── playbooks/
│       ├── roleplay/
│       ├── chat/
│       ├── inbox/
│       ├── pipeline/
│       ├── calendar/
│       ├── performance/
│       ├── insights/
│       ├── goals/
│       ├── bots/
│       ├── settings/
│       └── profile/
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── layout/             # Sidebar, etc.
├── lib/
│   ├── auth/               # NextAuth config
│   ├── db/                 # Prisma client
│   ├── licenses/           # License system
│   └── rbac/               # RBAC permissions
└── types/                  # TypeScript types
```

## 🔐 Admin Panel

Access `/admin` with ADMIN role to:

- **Features**: Enable/disable features per license type
- **Licenses**: View license comparison
- **Permissions**: Configure CRUD permissions per role

## 📜 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed initial data
npm run db:studio    # Open Prisma Studio
```

## 🔑 Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
LINKEDIN_CLIENT_ID=""
LINKEDIN_CLIENT_SECRET=""
```

## 📄 License

Private - All rights reserved
