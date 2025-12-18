const express = require('express');
const router = express.Router();
const { getProducts, saveProducts, getProductById } = require('../utils/db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Get all products
router.get('/', (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;
    let products = getProducts();

    // Filter by category
    if (category) {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Search by name or description
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by price range
    if (minPrice) {
      products = products.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      products = products.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Sort products
    if (sort === 'price-asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'name') {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'rating') {
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create product (Admin only)
router.post('/', authenticateToken, isAdmin, (req, res) => {
  try {
    const { name, description, price, category, image, stock, rating } = req.body;
    
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const products = getProducts();
    const newProduct = {
      id: Date.now().toString(),
      name,
      description,
      price: parseFloat(price),
      category,
      image: image || '/images/placeholder.jpg',
      stock: stock || 0,
      rating: rating || 0,
      reviews: [],
      createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    saveProducts(products);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', authenticateToken, isAdmin, (req, res) => {
  try {
    const products = getProducts();
    const index = products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    products[index] = { ...products[index], ...req.body, id: req.params.id };
    saveProducts(products);

    res.json(products[index]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', authenticateToken, isAdmin, (req, res) => {
  try {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== req.params.id);
    
    if (products.length === filtered.length) {
      return res.status(404).json({ message: 'Product not found' });
    }

    saveProducts(filtered);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

