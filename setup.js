// Setup script to initialize admin user
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'server/data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Create admin user if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  const adminUser = {
    id: '1',
    name: 'Admin',
    email: 'admin@timzon.com',
    password: hashedPassword,
    role: 'admin',
    createdAt: new Date().toISOString()
  };
  
  fs.writeFileSync(USERS_FILE, JSON.stringify([adminUser], null, 2));
  console.log('✅ Admin user created successfully!');
  console.log('   Email: admin@timzon.com');
  console.log('   Password: admin123');
} else {
  console.log('ℹ️  Users file already exists. Skipping admin user creation.');
}

console.log('\n✅ Setup complete!');
console.log('\nTo start the application:');
console.log('  1. Install dependencies: npm install');
console.log('  2. Install client dependencies: cd client && npm install && cd ..');
console.log('  3. Start the server: npm run dev');
console.log('\nThe application will be available at:');
console.log('  Frontend: http://localhost:3000');
console.log('  Backend: http://localhost:5000');

