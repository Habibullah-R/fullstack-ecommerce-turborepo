# Fullstack E-Commerce Turborepo

A highly scalable, microservices-based fullstack e-commerce application. Built from the ground up using **Turborepo** to manage multiple applications and shared packages within a single monorepo.

This project features separate frontend applications for customers and administrators, and discrete backend microservices for authentication, products, orders, and payments. It utilizes an event-driven architecture with **Apache Kafka** for asynchronous communication between the services.

## 🏗 Architecture

The repository is structured as a monorepo using **Turborepo** and npm workspaces.

### Apps

- **`client`** (Next.js 16)
  The main customer-facing storefront. Features a responsive UI built with Tailwind CSS, state management with Zustand, form handling with React Hook Form + Zod, authentication via Clerk, and payment integration with Stripe.
- **`admin`** (Next.js 16)
  The administrator dashboard for managing products, viewing orders, and tracking metrics. Built with Tailwind CSS, React Hook Form, Recharts, and Clerk for secure access.
- **`auth-service`** (Express)
  Handles authentication flows, user synchronization via Clerk webhooks, and publishes user-related events to Kafka.
- **`product-service`** (Express)
  Manages the product catalog. Uses a PostgreSQL database via Prisma ORM and communicates over Kafka to handle cross-service data consistency.
- **`order-service`** (Fastify)
  Manages customer orders and cart checkouts. Uses a MongoDB database via Mongoose and listens to payment/product events via Kafka.
- **`payment-service`** (Hono)
  Handles payment processing via Stripe webhooks. Uses Hono on a Node server and publishes payment success/failure events to Kafka.

### Packages (Shared Libraries)

- **`@repo/kafka`**: Shared KafkaJS producer, consumer, and client configurations for event-driven communication.
- **`@repo/product-db`**: Shared Prisma schema, migrations, and database client for PostgreSQL (used by `product-service` and potentially others).
- **`@repo/order-db`**: Shared Mongoose connection setup and models for MongoDB (used by `order-service`).
- **`@repo/types`**: Shared TypeScript definitions, interfaces, and Zod validation schemas used across the monorepo.
- **`@repo/eslint-config`**: Shared ESLint configurations including Next.js and Prettier rules.
- **`@repo/typescript-config`**: Shared `tsconfig.json` base configurations.

## 📨 Event-Driven Architecture (Kafka)

Kafka is used as the central message broker to ensure asynchronous communication and data consistency across the backend microservices. The `@repo/kafka` package provides shared producer and consumer utilities.

### Event Flow

| Publisher Service | Event Topic | Consumer Service(s) | Description |
| :--- | :--- | :--- | :--- |
| **`product-service`** | `product.created` | `payment-service` | Published when a new product is added. The `payment-service` listens to this event to create a corresponding product in Stripe. |
| **`product-service`** | `product.deleted` | `payment-service` | Published when a product is deleted. The `payment-service` listens to this to remove the product from Stripe. |
| **`payment-service`** | `payment.successful` | `order-service` | Published when a Stripe webhook confirms a successful payment checkout. The `order-service` consumes this event to finalize and create the order in the database. |

## 🚀 Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, Zustand, React Query, Recharts
- **Backend**: Express, Fastify, Hono, Node.js
- **Databases**: PostgreSQL (via Prisma), MongoDB (via Mongoose)
- **Message Broker**: Apache Kafka (via KafkaJS)
- **Authentication**: Clerk (Next.js & Backend integrations)
- **Payments**: Stripe (React Stripe.js & Node SDK)
- **Monorepo Tools**: Turborepo, npm workspaces
- **Language**: TypeScript (100% Type Safe)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v11+)
- PostgreSQL (running locally or remote)
- MongoDB (running locally or remote)
- Apache Kafka (running locally via Docker or a managed service like Confluent)
- Clerk Account (for authentication keys)
- Stripe Account (for payment keys)

## 🛠 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd fullstack-ecommerce-turborepo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

You must create `.env` files in the respective service directories. Refer to the codebase for the exact variable names required.

- **`apps/client/.env`**: Requires Next.js specific public Clerk keys and Stripe public key.
- **`apps/admin/.env`**: Requires Next.js specific public Clerk keys.
- **`apps/auth-service/.env`**: Requires Clerk Secret Key and Kafka broker URL.
- **`apps/product-service/.env`**: Requires Database URL for PostgreSQL, Clerk keys, and Kafka broker URL.
- **`apps/order-service/.env`**: Requires MongoDB URI, Clerk keys, and Kafka broker URL.
- **`apps/payment-service/.env`**: Requires Stripe Secret Key, Stripe Webhook Secret, Clerk keys, and Kafka broker URL.
- **`packages/product-db/.env`**: Requires `DATABASE_URL` to run Prisma migrations.
- **`packages/order-db/.env`**: Requires MongoDB connection string.

### 4. Database Setup

**PostgreSQL Setup (Product Service):**

Navigate to the `product-db` package to set up the database schema:

```bash
cd packages/product-db
# Generate Prisma Client
npm run db:generate
# Run migrations to update your local database schema
npm run db:migrate
```

### 5. Start Development Servers

Run the following command from the root of the project to start all applications and backend services simultaneously using Turborepo's pipeline:

```bash
npm run dev
```

Alternatively, you can run services individually using filters:

```bash
npx turbo run dev --filter=client
npx turbo run dev --filter=product-service
```

### Default Ports (Check specific app configuration)
- **Client App**: `http://localhost:3002`
- **Admin App**: `http://localhost:3003`

## 📦 Available Scripts (Root)

Run these commands from the root directory:

- `npm run build`: Build all apps and packages for production.
- `npm run dev`: Start all apps and packages in development mode with hot-reloading.
- `npm run lint`: Run ESLint across all apps and packages.
- `npm run format`: Format all supported files using Prettier.
- `npm run check-types`: Run TypeScript compiler (`tsc --noEmit`) to check for type errors across the monorepo.
