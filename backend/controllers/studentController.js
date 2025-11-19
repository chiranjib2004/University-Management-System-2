const db = require('../config/db');

exports.addStudent = async (req, res) => {
  const { id, name, address, date_of_birth, mobile_no, class_10_percent, class_12_percent, aadhar_number, course, branch, date_of_joining, email, password } = req.body;
  try {
    await db.execute("INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)", [id, name, email, password, "student"]);
    await db.execute(`INSERT INTO student_info (id, name, address, date_of_birth, mobile_no, class_10_percent, class_12_percent, aadhar_number, course, branch, date_of_joining, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [id, name, address, date_of_birth, mobile_no, class_10_percent ?? null, class_12_percent ?? null, aadhar_number ?? null, course ?? null, branch ?? null, date_of_joining ?? null, email]);
    res.status(201).json({ message: "Student added!" });
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage || err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM student_info");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  const { id, name, address, date_of_birth, mobile_no, class_10_percent, class_12_percent, aadhar_number, course, branch, date_of_joining, email } = req.body;
  try {
    await db.execute("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
    await db.execute(`UPDATE student_info SET name = ?, address = ?, date_of_birth = ?, mobile_no = ?, class_10_percent = ?, class_12_percent = ?, aadhar_number = ?, course = ?, branch = ?, date_of_joining = ?, email = ? WHERE id = ?`, [name, address, date_of_birth, mobile_no, class_10_percent ?? null, class_12_percent ?? null, aadhar_number ?? null, course ?? null, branch ?? null, date_of_joining ?? null, email, id]);
    res.json({ message: "Student updated!" });
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage || err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM student_info WHERE id = ?", [id]);
    await db.execute("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "Student deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage || err.message });
  }
};
