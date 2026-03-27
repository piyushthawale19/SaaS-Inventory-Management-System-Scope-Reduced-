const express = require('express');
const router = express.Router();
const prisma = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const { lowStock } = req.query;
    let products;

    if (lowStock === 'true') {
      const settings = await prisma.settings.findFirst();
      const threshold = settings?.lowStockThreshold || 10;
      products = await prisma.product.findMany({
        where: { quantity: { lt: threshold } }
      });
    } else {
      products = await prisma.product.findMany();
    }
    
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, sku, quantity, price } = req.body;
    // mock org id since full auth isn't wired perfectly in front/back bridge yet
    let org = await prisma.organization.findFirst();
    if(!org) org = await prisma.organization.create({ data: { name: 'Default Org' }});

    const newProduct = await prisma.product.create({
      data: { name, sku, quantity, price, organizationId: org.id }
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, sku, quantity, price } = req.body;
    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data: { name, sku, quantity, price }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
