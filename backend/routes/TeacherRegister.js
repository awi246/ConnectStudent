const express = require("express");
const { v4: uuidv4 } = require("uuid");
const TeacherRegister = require("../models/TeacherRegister");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, email, photo, subjectId } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: "Username and email are required fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check for duplicate entry
    const existingTeacher = await TeacherRegister.findOne({ $or: [{ email }, { uid: uuidv4() }] });
    if (existingTeacher) {
      return res.status(400).json({ error: "Duplicate teacher entry is not allowed" });
    }

    const uid = uuidv4();

    const teacherRegister = new TeacherRegister({
      username,
      email,
      photo,
      uid,
      subject: subjectId,
    });

    await teacherRegister.save();

    res.status(201).json(teacherRegister);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
