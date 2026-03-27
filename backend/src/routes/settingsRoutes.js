const express = require('express');
const router = express.Router();
const prisma = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const settings = await prisma.settings.findFirst();
    if (!settings) {
      return res.json({ lowStockThreshold: 10 });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { lowStockThreshold } = req.body;
    let settings = await prisma.settings.findFirst();
    let org = await prisma.organization.findFirst();
    if(!org) org = await prisma.organization.create({ data: { name: 'Default Org' }});

    if (settings) {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: { lowStockThreshold }
      });
    } else {
      settings = await prisma.settings.create({
        data: { lowStockThreshold, organizationId: org.id }
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings' });
  }
});

module.exports = router;
