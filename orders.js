const express = require('express');
const router = express.Router();
const { getOrders, saveOrders, getOrdersByUserId } = require('../utils/db');
const { authenticateToken } = require('../middleware/auth');

// Get user's orders
router.get('/', authenticateToken, (req, res) => {
  try {
    const orders = getOrdersByUserId(req.user.userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create order
router.post('/', authenticateToken, (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    const orders = getOrders();
    const newOrder = {
      id: Date.now().toString(),
      userId: req.user.userId,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'card',
      status: 'pending',
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    saveOrders(orders);

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single order
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const orders = getOrders();
    const order = orders.find(o => o.id === req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

