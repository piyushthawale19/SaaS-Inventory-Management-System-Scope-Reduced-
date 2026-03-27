require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

p.product.findMany()
  .then(r => console.log('OK products:', r.length))
  .catch(e => console.error('ERR:', e.message))
  .finally(() => p.$disconnect());
