const express = require('express');
const router = express.Router();
const User = require('../models/User');
const roles = require('../middleware/roles');

// Admin-only endpoint to set a user's role by uid
// POST /admin/set-role { uid, role }
router.post('/set-role', roles(['admin']), async (req, res) => {
  const { uid, role } = req.body;
  if (!uid || !role) return res.status(400).json({ error: 'uid and role required' });
  if (!['user', 'admin'].includes(role)) return res.status(400).json({ error: 'invalid role' });
  try {
    const user = await User.findOneAndUpdate({ uid }, { role }, { upsert: true, new: true });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /admin/me -> returns { uid, email, role }
router.get('/me', async (req, res) => {
  try {
    const { uid, email } = req.user;
    const user = await User.findOne({ uid });
    return res.json({ uid, email, role: user?.role || 'user' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
