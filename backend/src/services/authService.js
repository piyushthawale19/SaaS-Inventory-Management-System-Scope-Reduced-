const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

const generateToken = (userId, orgId) => {
  return jwt.sign({ userId, orgId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = async (email, password, orgName) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.$transaction(async (tx) => {
    const org = await tx.organization.create({
      data: { name: orgName },
    });

    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        organizationId: org.id,
      },
    });

    await tx.settings.create({
      data: {
        organizationId: org.id,
      },
    });

    const token = generateToken(user.id, org.id);
    return { user: { id: user.id, email: user.email, orgId: org.id }, token };
  });
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id, user.organizationId);
  return { user: { id: user.id, email: user.email, orgId: user.organizationId }, token };
};

module.exports = { registerUser, loginUser };
