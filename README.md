# 📦 StockFlow — SaaS Inventory Management System

A full-stack, multi-tenant inventory management SaaS application built with **Next.js**, **Express.js**, **Prisma**, and **SQLite**. Designed for small-to-medium businesses to manage products, monitor stock levels, and configure organization-wide settings — all within a clean, modern dashboard.

---

## ✨ Features

| Module          | Details                                                                 |
|-----------------|-------------------------------------------------------------------------|
| **Auth**        | JWT-based signup/login with bcrypt password hashing & protected routes  |
| **Dashboard**   | Overview cards for total products, low-stock alerts, and inventory value |
| **Products**    | Full CRUD — create, list, edit, and delete products with SKU tracking   |
| **Settings**    | Configure low-stock threshold per organization                         |
| **Multi-Tenant**| Organization-scoped data isolation for all resources                    |

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** (Pages Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Zustand** for state management
- **Axios** for API communication
- **Lucide React** for icons

### Backend
- **Express 5** (Node.js)
- **Prisma ORM** with SQLite
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** configured for cross-origin requests

---

## 📁 Project Structure

```
(Scope-Reduced)/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma        # Database models (Organization, User, Product, Settings)
│   ├── src/
│   │   ├── config/              # Database configuration
│   │   ├── controllers/         # Business logic handlers
│   │   ├── middlewares/         # Auth middleware (JWT verification)
│   │   ├── routes/              # API route definitions
│   │   │   ├── authRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── productsRoutes.js
│   │   │   └── settingsRoutes.js
│   │   ├── services/            # Service layer
│   │   └── server.js            # Express app entry point
│   ├── .env                     # Backend environment variables
│   └── package.json
│
├── frontend/
│   ├── components/
│   │   ├── layout/              # Layout components (Sidebar, Header, etc.)
│   │   └── ui/                  # Reusable UI components
│   ├── lib/                     # Utility functions & API client
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── login.tsx        # Login page
│   │   │   └── signup.tsx       # Signup page
│   │   ├── products/
│   │   │   ├── index.tsx        # Product listing
│   │   │   ├── create.tsx       # Add new product
│   │   │   └── edit/            # Edit product
│   │   ├── dashboard.tsx        # Main dashboard
│   │   ├── settings.tsx         # Organization settings
│   │   └── index.tsx            # Landing / redirect
│   ├── store/                   # Zustand state stores
│   ├── styles/                  # Global CSS & Tailwind config
│   ├── .env.local               # Frontend environment variables
│   └── package.json
│
└── README.md
```

---

## 🗄️ Database Schema

```
Organization 1──* User
Organization 1──* Product
Organization 1──1 Settings
```

| Model          | Key Fields                                                    |
|----------------|---------------------------------------------------------------|
| **Organization** | `id`, `name`, `createdAt`                                   |
| **User**         | `id`, `email`, `password`, `organizationId`                 |
| **Product**      | `id`, `name`, `sku`, `quantity`, `price`, `organizationId`  |
| **Settings**     | `id`, `lowStockThreshold`, `organizationId`                 |

> Products enforce a unique constraint on `(sku, organizationId)` to prevent duplicate SKUs within an organization.

---

## 🔌 API Endpoints

| Method   | Endpoint                   | Description                    | Auth Required |
|----------|----------------------------|--------------------------------|:-------------:|
| `POST`   | `/api/auth/signup`         | Register a new user & org      | ✅            |
| `POST`   | `/api/auth/login`          | Login and receive JWT token    | ✅            |
| `GET`    | `/api/dashboard`           | Fetch dashboard stats          | ✅            |
| `GET`    | `/api/products`            | List all products              | ✅            |
| `POST`   | `/api/products`            | Create a new product           | ✅            |
| `PUT`    | `/api/products/:id`        | Update a product               | ✅            |
| `DELETE` | `/api/products/:id`        | Delete a product               | ✅            |
| `GET`    | `/api/settings`            | Get organization settings      | ✅            |
| `PUT`    | `/api/settings`            | Update organization settings   | ✅            |
| `GET`    | `/health`                  | Health check                   | ✅            |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clone the Repository

```bash
git clone https://github.com/piyushthawale19/SaaS-Inventory-Management-System-Scope-Reduced-.git
cd SaaS-Inventory-Management-System-Scope-Reduced-
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:3000
PORT=5000
```

Generate the Prisma client and initialize the database:

```bash
npx prisma generate
npx prisma db push
```

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be running at `http://localhost:3000`.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable        | Description                        | Example                      |
|-----------------|------------------------------------|------------------------------|
| `DATABASE_URL`  | Prisma database connection string  | `file:./dev.db`              |
| `JWT_SECRET`    | Secret key for signing JWT tokens  | `your_jwt_secret_here`       |
| `FRONTEND_URL`  | Allowed CORS origin               | `http://localhost:3000`      |
| `PORT`          | Server port                        | `5000`                       |

### Frontend (`frontend/.env.local`)

| Variable              | Description             | Example                          |
|-----------------------|-------------------------|----------------------------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL    | `http://localhost:5000/api`      |

---

## 📜 Available Scripts

### Backend

| Script          | Command               | Description                         |
|-----------------|------------------------|-------------------------------------|
| `npm run dev`   | `node --watch src/server.js` | Start dev server with auto-reload |
| `npm start`     | `node src/server.js`   | Start production server             |
| `npm run build` | `npx prisma generate`  | Generate Prisma client              |

### Frontend

| Script          | Command          | Description                    |
|-----------------|------------------|--------------------------------|
| `npm run dev`   | `next dev`       | Start Next.js dev server       |
| `npm run build` | `next build`     | Create production build        |
| `npm start`     | `next start`     | Start production server        |
| `npm run lint`  | `eslint`         | Run ESLint                     |

---

## 🧑‍💻 Author

**Piyush Thawale**

---

## 📄 License

This project is licensed under the ISC License.
