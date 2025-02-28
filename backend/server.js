require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// เชื่อมต่อฐานข้อมูล
const createConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
};

// ✅ API ดึงข้อมูล `tasks` ทั้งหมด (ใช้ async/await)
app.get("/tasks", async (req, res) => {
  try {
    const db = await createConnection();
    const [rows] = await db.execute("SELECT * FROM tasks");
    await db.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API ดึง task ตาม `id`
app.get("/tasks/:id", async (req, res) => {
  try {
    const db = await createConnection();
    const [rows] = await db.execute("SELECT * FROM tasks WHERE id = ?", [req.params.id]);
    await db.end();

    if (rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API สร้าง task ใหม่
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;
    const db = await createConnection();
    const [result] = await db.execute(
      "INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)",
      [title, description, status, due_date]
    );
    await db.end();

    res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API อัปเดต task ตาม `id`
app.put("/tasks/:id", async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;
    const formattedDueDate = new Date(due_date).toISOString().slice(0, 19).replace("T", " "); 
    const db = await createConnection();
    const [result] = await db.execute(
      "UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?",
      [title, description, status, formattedDueDate, req.params.id]
    );
    await db.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ API ลบ task ตาม `id`
app.delete("/tasks/:id", async (req, res) => {
  try {
    const db = await createConnection();
    const [result] = await db.execute("DELETE FROM tasks WHERE id = ?", [req.params.id]);
    await db.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ตั้งค่า PORT และเริ่มรันเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});