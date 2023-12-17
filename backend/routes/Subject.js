const express = require("express");
const router = express.Router();

const subjectDB = require("../models/Subject");

router.get("/", async (req, res) => {
  try {
    const subjects = await subjectDB.find();
    res.json({
      status: true,
      message: "Subjects retrieved successfully",
      data: subjects,
    });
  } catch (error) {
    console.error("Error while fetching subjects:", error);
    res.status(500).json({
      status: false,
      message: "Error while fetching subjects",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(422).json({
        status: false,
        message: "Validation error. Name is required for a subject.",
      });
    }

    const newSubject = await subjectDB.create({ name });

    res.status(201).json({
      status: true,
      message: "Subject added successfully",
      data: newSubject,
    });
  } catch (error) {
    console.error("Error while adding subject:", error);

    let status, message;
    if (error.name === 'ValidationError') {
      status = 422; // Unprocessable Entity
      message = "Validation error. Please check your input.";
    } else {
      status = 500; // Internal Server Error
      message = "Error while adding subject";
    }

    res.status(status).json({
      status: false,
      message: message,
    });
  }
});

module.exports = router;
