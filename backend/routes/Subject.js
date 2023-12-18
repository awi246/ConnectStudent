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
    res.status(500).json({
      status: false,
      message: "Error while fetching subjects",
      data: error.message,
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
        data: "Name is required for a subject.",
      });
    }

    const allowedSubjects = [
      "Advanced Java",
      "Data Warehouse",
      "PoM",
      "Project Work",
      "Information Retrieval",
      "Database Administration",
      "Software Project Management",
      "Network Security",
      "Digital System Design",
      "Network and System Administration",
      "International Marketing",
    ];

    if (!allowedSubjects.includes(name)) {
      return res.status(422).json({
        status: false,
        message:
          "Adding subjects other than the specified list is not allowed.",
        data: "Adding subjects other than the specified list is not allowed.",
      });
    }

    const existingSubject = await subjectDB.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });

    if (existingSubject) {
      return res.status(422).json({
        status: false,
        message: "Subject with a similar name already exists",
        data: "Subject with a similar name already exists",
      });
    }

    const newSubject = await subjectDB.create({ name });

    res.status(201).json({
      status: true,
      message: "Subject added successfully",
      data: newSubject,
    });
  } catch (error) {
    let status, message, data;
    if (error.name === "ValidationError") {
      status = 422;
      message = "Validation error. Please check your input.";
      data = error.message;
    } else {
      status = 500;
      message = "Error while adding subject";
      data = error.message;
    }

    res.status(status).json({
      status: false,
      message: message,
      data: data,
    });
  }
});

module.exports = router;
