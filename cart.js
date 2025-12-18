const express = require('express');
const router = express.Router();
const { getCarts, saveCarts, getCartByUserId } = require('../utils/db');
const { authenticateToken } = require('../middleware/auth');

// Get user's cart
router.get('/', authenticateToken, (req, res) => {
  try {
    const cart = getCartByUserId(req.user.userId);
    res.json(cart || { items: [], total: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add item to cart
router.post('/add', authenticateToken, (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const carts = getCarts();
    let cart = carts.find(c => c.userId === req.user.userId);
    
    if (!cart) {
      cart = { userId: req.user.userId, items: [] };
      carts.push(cart);
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      cart.items.push({ productId, quantity: parseInt(quantity) });
    }

    saveCarts(carts);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cart item
router.put('/update', authenticateToken, (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const carts = getCarts();
    const cart = carts.find(c => c.userId === req.user.userId);
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.productId === productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.productId !== productId);
    } else {
      item.quantity = parseInt(quantity);
    }

    saveCarts(carts);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:productId', authenticateToken, (req, res) => {
  try {
    const carts = getCarts();
    const cart = carts.find(c => c.userId === req.user.userId);
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId !== req.params.productId);
    saveCarts(carts);
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Clear cart
router.delete('/clear', authenticateToken, (req, res) => {
  try {
    const carts = getCarts();
    const cart = carts.find(c => c.userId === req.user.userId);
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    saveCarts(carts);
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

