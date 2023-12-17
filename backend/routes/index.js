const express = require("express");
const router = express.Router();

const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const votesRouter = require("./Vote");
const subjectRouter = require("./Subject");

router.get("/", (req, res) => {
  res.send("This API is reserved for connectStudents");
});

router.use("/questions", questionRouter);
router.use("/answers", answerRouter);
router.use("/votes", votesRouter);
router.use("/subjects", subjectRouter);

module.exports = router;
