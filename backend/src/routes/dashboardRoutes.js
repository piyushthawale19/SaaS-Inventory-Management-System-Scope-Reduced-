const express = require('express');
const router = express.Router();
const prisma = require('../config/db');

router.get('/summary', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    const settings = await prisma.settings.findFirst();
    const threshold = settings?.lowStockThreshold || 10;
    
    const totalProducts = products.length;
    const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const lowStockItems = products.filter(p => p.quantity < threshold).length;

    res.json({
      totalProducts,
      totalValue,
      lowStockItems
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard summary' });
  }
});

module.exports = router;
