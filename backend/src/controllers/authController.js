const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { email, password, orgName } = req.body;

    if (!email || !password || !orgName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const data = await authService.registerUser(email, password, orgName);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const data = await authService.loginUser(email, password);
    res.json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };
