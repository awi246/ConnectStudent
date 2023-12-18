const express = require("express");
const router = express.Router();

const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const votesRouter = require("./Vote");
const subjectRouter = require("./Subject");
const teacherRegisterRouter = require("./TeacherRegister");
const teacherLoginRouter = require("./TeacherLogin");

router.get("/", (req, res) => {
  res.send("This API is reserved for connectStudents");
});

router.use("/questions", questionRouter);
router.use("/answers", answerRouter);
router.use("/votes", votesRouter);
router.use("/subjects", subjectRouter);
router.use("/teacherRegisters", teacherRegisterRouter);
router.use("/teacherLogin", teacherLoginRouter);

module.exports = router;
