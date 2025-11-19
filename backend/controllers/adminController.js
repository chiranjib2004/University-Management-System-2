const db = require('../config/db');
const generateFiveDigitId = require('../utils/generateId');

// Add new faculty
async function addFaculty(req, res) {
  const { name, father_name, address, date_of_birth, mobile_no, experience_year, aadhar_number, qualification, department, date_of_joining, email, password } = req.body;
  const id = generateFiveDigitId();
  try {
    await db.execute(
      'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, password, 'faculty']
    );
    await db.execute(
      `INSERT INTO faculty_info (
        id, father_name, address, date_of_birth, mobile_no, experience_year,
        aadhar_number, qualification, department, date_of_joining, email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, father_name, address, date_of_birth, mobile_no, experience_year, aadhar_number, qualification, department, date_of_joining, email]
    );
    res.json({ message: 'Faculty added successfully', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Add new student
async function addStudent(req, res) {
  const { name, father_name, address, date_of_birth, mobile_no, class_10_percent, class_12_percent, aadhar_number, course, branch, date_of_joining, email, password } = req.body;
  const id = generateFiveDigitId();
  try {
    await db.execute(
      'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, password, 'student']
    );
    await db.execute(
      `INSERT INTO student_info (
        id, father_name, address, date_of_birth, mobile_no, class_10_percent,
        class_12_percent, aadhar_number, course, branch, date_of_joining, email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, father_name, address, date_of_birth, mobile_no, class_10_percent, class_12_percent, aadhar_number, course, branch, date_of_joining, email]
    );
    res.json({ message: 'Student added successfully', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get list of all faculty
async function getFacultyList(req, res) {
  try {
    const [rows] = await db.execute(
      `SELECT users.id, users.name, users.email, faculty_info.department, faculty_info.mobile_no, faculty_info.address
       FROM users
       JOIN faculty_info ON users.id = faculty_info.id
       WHERE users.role = 'faculty'`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get list of all students
async function getStudentList(req, res) {
  try {
    const [rows] = await db.execute(
      `SELECT users.id, users.name, users.email, student_info.branch, student_info.course, student_info.mobile_no, student_info.address
       FROM users
       JOIN student_info ON users.id = student_info.id
       WHERE users.role = 'student'`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get faculty by ID
async function getFacultyById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const [rows] = await db.execute(
      `SELECT * FROM users
       JOIN faculty_info ON users.id = faculty_info.id
       WHERE users.id = ? AND users.role = 'faculty'`, [id]
    );
    if (rows.length > 0) res.json(rows[0]);
    else res.status(404).json({ error: 'Faculty not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get student by ID
async function getStudentById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const [rows] = await db.execute(
      `SELECT * FROM users
       JOIN student_info ON users.id = student_info.id
       WHERE users.id = ? AND users.role = 'student'`, [id]
    );
    if (rows.length > 0) res.json(rows[0]);
    else res.status(404).json({ error: 'Student not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update faculty info
async function updateFaculty(req, res) {
  const id = parseInt(req.params.id);
  const { name, father_name, address, date_of_birth, mobile_no, experience_year, aadhar_number, qualification, department, date_of_joining, email } = req.body;
  try {
    await db.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ? AND role = "faculty"',
      [name, email, id]
    );
    await db.execute(
      `UPDATE faculty_info SET father_name = ?, address = ?, date_of_birth = ?, mobile_no = ?, experience_year = ?,
       aadhar_number = ?, qualification = ?, department = ?, date_of_joining = ?, email = ? WHERE id = ?`,
      [father_name, address, date_of_birth, mobile_no, experience_year, aadhar_number, qualification, department, date_of_joining, email, id]
    );
    res.json({ message: 'Faculty info updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update student info
async function updateStudent(req, res) {
  const id = parseInt(req.params.id);
  const { name, father_name, address, date_of_birth, mobile_no, class_10_percent, class_12_percent, aadhar_number, course, branch, date_of_joining, email } = req.body;
  try {
    await db.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ? AND role = "student"',
      [name, email, id]
    );
    await db.execute(
      `UPDATE student_info SET father_name = ?, address = ?, date_of_birth = ?, mobile_no = ?, class_10_percent = ?, class_12_percent = ?,
       aadhar_number = ?, course = ?, branch = ?, date_of_joining = ?, email = ? WHERE id = ?`,
      [father_name, address, date_of_birth, mobile_no, class_10_percent, class_12_percent, aadhar_number, course, branch, date_of_joining, email, id]
    );
    res.json({ message: 'Student info updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addFaculty,
  addStudent,
  getFacultyList,
  getStudentList,
  getFacultyById,
  getStudentById,
  updateFaculty,
  updateStudent
};
