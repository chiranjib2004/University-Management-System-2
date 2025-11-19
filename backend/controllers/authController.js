const db = require('../config/db');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  let { id, password } = req.body;
  id = parseInt(id);
  console.log("Login input:", id, password);
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0 || rows[0].password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = rows[0];
    const token = jwt.sign({ id: user.id, role: user.role }, 'mysecret', { expiresIn: '1d' });

    // --- IMPORTANT LINE ADDED HERE ---
    res.json({ token, role: user.role, id: user.id }); // Add id so frontend can store it

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { login };
