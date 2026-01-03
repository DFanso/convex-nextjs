# Task Manager - Convex + Next.js + shadcn/ui

A beautiful, real-time task manager with community chat, built with modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Convex](https://img.shields.io/badge/Convex-Backend-orange?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## Features

- **Authentication** - Email/password auth powered by Convex Auth
- **Todo List** - Personal task management with CRUD operations
- **Real-time Chat** - Community chat for all authenticated users
- **Real-time Updates** - Instant sync across all devices via Convex
- **Premium UI** - Beautiful glassmorphism design with shadcn/ui
- **Dark Mode** - Sleek dark theme with gradient accents
- **Responsive** - Works on all screen sizes

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Backend** | Convex (Real-time Database) |
| **Authentication** | Convex Auth (Password Provider) |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui (base-lyra style) |
| **Language** | TypeScript |
| **Package Manager** | Bun |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- [Convex Account](https://convex.dev/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dfanso/convex-nextjs.git
   cd convex-nextjs
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up Convex**
   ```bash
   bunx convex dev
   ```
   Follow the prompts to create a new Convex project or link an existing one.

4. **Start the development server**
   ```bash
   bun dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles & Tailwind config
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Main page
├── components/
│   ├── auth/               # Authentication components
│   │   ├── auth-form.tsx   # Sign in/up form
│   │   └── user-button.tsx # User avatar & sign out
│   ├── chat/               # Chat components
│   │   └── chat-panel.tsx  # Floating chat panel
│   ├── providers/          # React providers
│   │   └── convex-provider.tsx
│   ├── todo/               # Todo components
│   │   ├── index.tsx       # Main TodoApp
│   │   ├── todo-input.tsx  # Add new todo
│   │   ├── todo-item.tsx   # Individual todo item
│   │   ├── todo-list.tsx   # Todo list container
│   │   └── todo-stats.tsx  # Stats dashboard
│   └── ui/                 # shadcn/ui components
├── convex/                 # Convex backend
│   ├── auth.ts             # Auth configuration
│   ├── auth.config.ts      # Auth providers config
│   ├── http.ts             # HTTP routes
│   ├── messages.ts         # Chat mutations/queries
│   ├── schema.ts           # Database schema
│   ├── todos.ts            # Todo mutations/queries
│   └── users.ts            # User queries
└── lib/
    └── utils.ts            # Utility functions
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
CONVEX_DEPLOYMENT=your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

## License

MIT License - feel free to use this project for learning or as a starting point for your own apps!

---

Built with [Next.js](https://nextjs.org/), [Convex](https://convex.dev/), and [shadcn/ui](https://ui.shadcn.com/)
