const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (filename) => path.join(DATA_DIR, filename);

// Users
const getUsers = () => {
  const filePath = getFilePath('users.json');
  if (!fs.existsSync(filePath)) {
    // Create default admin user with hashed password (admin123)
    // Note: In production, this should be set up manually
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    const defaultUsers = [{
      id: '1',
      name: 'Admin',
      email: 'admin@timzon.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString()
    }];
    fs.writeFileSync(filePath, JSON.stringify(defaultUsers, null, 2));
    return defaultUsers;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const saveUsers = (users) => {
  fs.writeFileSync(getFilePath('users.json'), JSON.stringify(users, null, 2));
};

const getUserById = (id) => {
  return getUsers().find(u => u.id === id);
};

const getUserByEmail = (email) => {
  return getUsers().find(u => u.email === email);
};

// Products
const getProducts = () => {
  const filePath = getFilePath('products.json');
  if (!fs.existsSync(filePath)) {
    const defaultProducts = [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        price: 99.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        stock: 50,
        rating: 4.5,
        reviews: []
      },
      {
        id: '2',
        name: 'Smart Watch Pro',
        description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and GPS.',
        price: 249.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        stock: 30,
        rating: 4.8,
        reviews: []
      },
      {
        id: '3',
        name: 'Laptop Backpack',
        description: 'Durable laptop backpack with multiple compartments and USB charging port.',
        price: 49.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        stock: 100,
        rating: 4.3,
        reviews: []
      },
      {
        id: '4',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
        price: 29.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
        stock: 75,
        rating: 4.6,
        reviews: []
      },
      {
        id: '5',
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with customizable keys and tactile switches.',
        price: 129.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        stock: 40,
        rating: 4.7,
        reviews: []
      },
      {
        id: '6',
        name: 'USB-C Hub',
        description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
        price: 39.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500',
        stock: 60,
        rating: 4.4,
        reviews: []
      }
    ];
    fs.writeFileSync(filePath, JSON.stringify(defaultProducts, null, 2));
    return defaultProducts;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const saveProducts = (products) => {
  fs.writeFileSync(getFilePath('products.json'), JSON.stringify(products, null, 2));
};

const getProductById = (id) => {
  return getProducts().find(p => p.id === id);
};

// Carts
const getCarts = () => {
  const filePath = getFilePath('carts.json');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const saveCarts = (carts) => {
  fs.writeFileSync(getFilePath('carts.json'), JSON.stringify(carts, null, 2));
};

const getCartByUserId = (userId) => {
  return getCarts().find(c => c.userId === userId);
};

// Orders
const getOrders = () => {
  const filePath = getFilePath('orders.json');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const saveOrders = (orders) => {
  fs.writeFileSync(getFilePath('orders.json'), JSON.stringify(orders, null, 2));
};

const getOrdersByUserId = (userId) => {
  return getOrders().filter(o => o.userId === userId);
};

module.exports = {
  getUsers,
  saveUsers,
  getUserById,
  getUserByEmail,
  getProducts,
  saveProducts,
  getProductById,
  getCarts,
  saveCarts,
  getCartByUserId,
  getOrders,
  saveOrders,
  getOrdersByUserId
};

