# NEXVORA - Digital Marketplace

A premium digital products marketplace built for businesses to purchase ready-made website templates, business software, SaaS solutions, or request custom digital development.

**Tagline:** "Digital Products. Limitless Possibilities."

## Tech Stack

### Frontend
- React 18
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Framer Motion
- Lucide React
- React Hot Toast
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas with Mongoose
- JWT Authentication
- bcrypt
- Zod
- dotenv
- express-rate-limit
- cookie-parser
- cors

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for all packages:
```bash
npm run install:all
```

3. Set up environment variables:
   - Copy `server/.env.example` to `server/.env` and fill in your values
   - Copy `client/.env.example` to `client/.env` and fill in your values

4. Start development servers:
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
nexvora/
├── client/          # React frontend (Vite)
├── server/          # Express backend API
└── README.md
```

## Features

- Premium dark theme with NEXVORA brand colors
- Responsive design for all devices
- Product marketplace with filtering and search
- Shopping cart and wishlist
- User authentication and accounts
- Custom development inquiry system
- Admin dashboard
- Payment gateway integration ready (Cashfree)
- Demo mode when credentials not configured

## Brand Colors

- Midnight Black: `#030407`
- Electric Cobalt Blue: `#1558C9`
- Acid Lime: `#D4FF24`
- Card Background: `#10151E`
- Elevated Background: `#0B0E14`

## License

This is a fictional demo project created for development purposes.
