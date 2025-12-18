# Timzon 🛒 - Online Store

A modern, full-stack e-commerce platform similar to Alibaba and Amazon, built with Next.js and Node.js.

## Features

- 🛍️ Product browsing and search
- 🔐 User authentication (Register/Login)
- 🛒 Shopping cart functionality
- 💳 Order management
- 👨‍💼 Admin panel for product management
- 📱 Responsive design
- 🎨 Modern and attractive UI

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: JSON-based file storage (easily upgradeable to MongoDB/PostgreSQL)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install root dependencies:
```bash
npm install
```

2. Install client dependencies:
```bash
cd client
npm install
cd ..
```

3. Create a `.env` file in the root directory (optional, defaults are provided):
```
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

4. Run the setup script to initialize the admin user:
```bash
node setup.js
```

5. Start the development server:
```bash
npm run dev
```

This will start both the backend server (port 5000) and the frontend (port 3000).

**Note:** The setup script will automatically create the admin user on first run. You can also skip step 4 as the admin user will be created automatically when the server starts for the first time.

### Default Admin Account

- Email: `admin@timzon.com`
- Password: `admin123`

## Project Structure

```
timzon/
├── client/          # Next.js frontend
├── server/          # Express backend
│   ├── routes/      # API routes
│   ├── middleware/  # Auth middleware
│   ├── utils/       # Database utilities
│   └── data/        # JSON data files
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get single order

## License

MIT

