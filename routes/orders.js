const express = require('express');
const { check, validationResult } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a middleware that combines auth and authorize('admin')
const adminAuth = [auth, authorize('admin')];

const router = express.Router();

// @route   POST api/orders
// @desc    Create new order
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('orderItems', 'Order items are required').not().isEmpty(),
      check('shippingAddress', 'Shipping address is required').not().isEmpty(),
      check('paymentMethod', 'Payment method is required').not().isEmpty(),
      check('itemsPrice', 'Items price is required').isNumeric(),
      check('taxPrice', 'Tax price is required').isNumeric(),
      check('shippingPrice', 'Shipping price is required').isNumeric(),
      check('totalPrice', 'Total price is required').isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
      }

      // Get the ordered items from the database
      const itemsFromDB = await Product.find({
        _id: { $in: orderItems.map((x) => x._id) },
      });

      // Map over the order items and check if they exist and have enough stock
      const orderItemsWithPrices = orderItems.map((item) => {
        const itemFromDB = itemsFromDB.find((i) => i._id.toString() === item._id);
        
        if (!itemFromDB) {
          throw new Error(`Product ${item._id} not found`);
        }

        if (itemFromDB.stock < item.qty) {
          throw new Error(`Not enough stock for ${itemFromDB.name}`);
        }

        // Update the stock
        itemFromDB.stock -= item.qty;
        itemFromDB.save();

        return {
          name: itemFromDB.name,
          qty: item.qty,
          image: itemFromDB.images[0]?.url || '',
          price: itemFromDB.price,
          product: itemFromDB._id,
        };
      });

      const order = new Order({
        user: req.user.id,
        orderItems: orderItemsWithPrices,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message || 'Server Error' });
    }
  }
);

// @route   GET api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Make sure the order belongs to the user or the user is an admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT api/orders/:id/pay
// @desc    Update order to paid
// @access  Private
router.put('/:id/pay', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Make sure the order belongs to the user or the user is an admin
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT api/orders/:id/deliver
// @desc    Update order to delivered
// @access  Private/Admin
router.put('/:id/deliver', adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
