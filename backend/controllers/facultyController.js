const db = require('../config/db');

exports.addFaculty = async (req, res) => {
  const { id, name, address, date_of_birth, mobile_no, experience_year, aadhar_number, qualification, department, date_of_joining, email, password } = req.body;
  try {
    await db.execute("INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)", [id, name, email, password, "faculty"]);
    await db.execute(`INSERT INTO faculty_info (id, name, address, date_of_birth, mobile_no, experience_year, aadhar_number, qualification, department, date_of_joining, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [id, name, address, date_of_birth, mobile_no, experience_year ?? null, aadhar_number ?? null, qualification ?? null, department ?? null, date_of_joining ?? null, email]);
    res.status(201).json({ message: "Faculty added!" });
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage || err.message });
  }
};

exports.getAllFaculty = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM faculty_info");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFaculty = async (req, res) => {
  const { id, name, address, date_of_birth, mobile_no, experience_year, aadhar_number, qualification, department, date_of_joining, email } = req.body;
  try {
    await db.execute("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
    await db.execute(`UPDATE faculty_info SET name = ?, address = ?, date_of_birth = ?, mobile_no = ?, experience_year = ?, aadhar_number = ?, qualification = ?, department = ?, date_of_joining = ?, email = ? WHERE id = ?`, [name, address, date_of_birth, mobile_no, experience_year ?? null, aadhar_number ?? null, qualification ?? null, department ?? null, date_of_joining ?? null, email, id]);
    res.json({ message: "Faculty updated!" });
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage || err.message });
  }
};

exports.deleteFaculty = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM faculty_info WHERE id = ?", [id]);
    await db.execute("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "Faculty deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage || err.message });
  }
};
