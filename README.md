# Women Who Go Platform 🚀

A full-stack platform connecting women in tech to learn and master Go programming together. Built with Next.js frontend and Go backend.

![GoWomen Platform](https://img.shields.io/badge/Go-1.21+-00ADD8?style=for-the-badge&logo=go)
![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)

## 🌟 Features

### Frontend (Next.js)
- **Modern UI/UX** - Responsive design with Tailwind CSS
- **Interactive Components** - Animated hero section, membership cards
- **User Registration** - Seamless signup with form validation
- **Payment Integration** - Membership plan selection and payment initiation
- **SEO Optimized** - Built for search engine visibility

### Backend (Go)
- **RESTful API** - Clean API design with Gin framework
- **User Management** - Registration, authentication, and profiles
- **Membership System** - Tiered plans (Free, Supporter, Patron)
- **Payment Processing** - Transaction management with multiple payment methods
- **Resource Library** - Curated Go programming resources
- **PostgreSQL Database** - Robust data persistence with GORM

## 🏗️ Project Structure
women-who-go-platform/
├── backend/                # Go backend API
│   ├── handlers/           # HTTP request handlers
│   ├── database/           # Database configuration
│   ├── models/             # Data models
│   ├── main.go             # Application entry point
│   └── go.mod              # Go dependencies
├── frontend/               # Next.js frontend
│   ├── app/                # App router pages
│   ├── components/         # React components
│   ├── types/              # TypeScript definitions
│   └── public/             # Static assets
├── nixpacks.toml           # Deployment configuration
├── railway.json            # Railway deployment config
└── package.json            # Root package configuration


## 🚀 Quick Start

### Prerequisites
- Go 1.21+
- Node.js 18+
- PostgreSQL 14+

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/vivcis/women-who-go-platform.git
   cd women-who-go-platform

### Backend Setup

cd backend

# Install dependencies
go mod tidy

# Set up environment variables
cp example.env .env
# Edit .env with your database credentials

# Run the server
go run main.go

### Frontend Setup

cd frontend

# Install dependencies
npm install

# Set up environment variables
cp example.env .env

# Run development server
npm run dev


### 📊 API Endpoints

# Users
POST /api/users - Create new user
GET /api/users - Get all users
GET /api/users/:id - Get user by ID

# Membership
GET /api/membership-plans - Get available plans
POST /api/memberships - Create membership
GET /api/memberships - Get all memberships

# Payments
POST /api/payments/initiate - Start payment process
POST /api/payments/callback - Payment webhook
GET /api/payments/:reference - Get payment status

# Resources
GET /api/resources - Get learning resources
POST /api/resources - Add new resource
GET /api/resource-categories - Get resource categories

# Stats
GET /api/stats - Get platform statistics

### 🗄️ Database Schema
Users
- id, email, name, location, skill_level, bio, github_url, created_at, updated_at

Memberships
- id, user_id, plan_type, amount, status, start_date, end_date, created_at, updated_at

Transactions
- id, user_id, amount, currency, payment_method, payment_reference, status, created_at, updated_at

Resources
- id, title, description, url, category, difficulty, created_at, updated_at

Built with ❤️ for women in tech learning Go
