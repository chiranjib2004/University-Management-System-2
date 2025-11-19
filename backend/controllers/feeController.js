const db = require('../config/db');

exports.addFee = async (req, res) => {
  const { student_id, amount, due_date, paid } = req.body;
  try {
    const sid = String(student_id).trim();
    console.log("Inserting fee:", { student_id: sid, amount, due_date, paid }); // Debug
    await db.execute(
      `INSERT INTO fee_details (student_id, amount, due_date, paid)
       VALUES (?, ?, ?, ?)`,
      [sid, amount, due_date, paid]
    );
    res.status(200).json({ message: "Fee record saved!" });
  } catch (err) {
    console.error("Error inserting fee:", err);
    res.status(500).json({ message: err.sqlMessage || err.message });
  }
};

exports.getStudentFee = async (req, res) => {
  const sid = String(req.params.student_id || '').trim();
  try {
    console.log("Fetching fee for student_id:", sid);  // Debug
    // Try primary table: fee_details
    let rows = [];
    try {
      const [r1] = await db.execute(
        `SELECT SQL_NO_CACHE student_id, amount, due_date, paid 
         FROM fee_details 
         WHERE student_id = ? 
            OR (CAST(student_id AS UNSIGNED) = CAST(? AS UNSIGNED) AND student_id REGEXP '^[0-9]+$' AND ? REGEXP '^[0-9]+$')
         ORDER BY due_date DESC`,
        [sid, sid, sid]
      );
      rows = r1;
    } catch (innerErr) {
      // If table doesn't exist or other error, try fallback table below
      console.warn('fee_details lookup failed, will try fees:', innerErr?.code || innerErr?.message);
    }

    if (!Array.isArray(rows) || rows.length === 0) {
      try {
        const [r2] = await db.execute(
          `SELECT SQL_NO_CACHE student_id, amount, due_date, paid 
           FROM fees 
           WHERE student_id = ? 
              OR (CAST(student_id AS UNSIGNED) = CAST(? AS UNSIGNED) AND student_id REGEXP '^[0-9]+$' AND ? REGEXP '^[0-9]+$')
           ORDER BY due_date DESC`,
          [sid, sid, sid]
        );
        rows = r2;
      } catch (fallbackErr) {
        console.warn('fees fallback lookup failed:', fallbackErr?.code || fallbackErr?.message);
      }
    }

    console.log("Found fee rows:", rows);  // Debug
    res.json(rows || []);
  } catch (err) {
    console.error("Error fetching fee:", err);
    res.status(500).json({ message: err.message });
  }
};
