const db = require('../config/db');

// Add a mark entry
exports.addMark = async (req, res) => {
  const { student_id, subject, exam_name, score } = req.body;
  if (!student_id || !subject || !exam_name || score === undefined) {
    return res.status(400).json({ message: 'student_id, subject, exam_name and score are required' });
  }
  try {
    await db.execute(
      'INSERT INTO marks (student_id, subject, exam_name, score) VALUES (?, ?, ?, ?)',
      [student_id, subject, exam_name, score]
    );
    res.status(201).json({ message: 'Mark added' });
  } catch (err) {
    // If table might not exist
    if (err && err.code === 'ER_NO_SUCH_TABLE') {
      try {
        await db.execute(`CREATE TABLE IF NOT EXISTS marks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          student_id INT NOT NULL,
          subject VARCHAR(100) NOT NULL,
          exam_name VARCHAR(100) NOT NULL,
          score DECIMAL(5,2) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        await db.execute(
          'INSERT INTO marks (student_id, subject, exam_name, score) VALUES (?, ?, ?, ?)',
          [student_id, subject, exam_name, score]
        );
        return res.status(201).json({ message: 'Mark added' });
      } catch (e2) {
        return res.status(500).json({ message: e2.sqlMessage || e2.message });
      }
    }
    res.status(500).json({ message: err.sqlMessage || err.message });
  }
};

// Get all marks for a student
exports.getMarksByStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const [rows] = await db.execute('SELECT id, subject, exam_name, score, created_at FROM marks WHERE student_id = ? ORDER BY created_at DESC', [studentId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage || err.message });
  }
};

// Update a mark by id
exports.updateMark = async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;
  try {
    await db.execute('UPDATE marks SET score = ? WHERE id = ?', [score, id]);
    res.json({ message: 'Mark updated' });
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage || err.message });
  }
};
