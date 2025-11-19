const db = require('../config/db');

exports.addExam = async (req, res) => {
  const { exam_name, date, branch, semester } = req.body;
  try {
    await db.execute(
      "INSERT INTO exam_schedule (exam_name, date, branch, semester) VALUES (?, ?, ?, ?)",
      [exam_name, date, branch, semester]
    );
    res.status(201).json({ message: "Exam scheduled!" });
  } catch (err) {
    console.error("Exam scheduling error:", err);
    res.status(500).json({ message: err.sqlMessage || err.message });
  }
};


exports.getExams = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM exam_schedule ORDER BY date DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
