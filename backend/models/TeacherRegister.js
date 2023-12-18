// models/TeacherRegister.js
const mongoose = require("mongoose");

const teacherRegisterSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    photo: {
      type: String,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      default: "Teacher",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  },
  {
    timestamps: true, 
  }
);

const TeacherRegister = mongoose.model("TeacherRegister", teacherRegisterSchema);

module.exports = TeacherRegister;
