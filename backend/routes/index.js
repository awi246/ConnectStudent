const express = require("express");
const router = express.Router();

const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const votesRouter = require("./Vote"); 

router.get("/", (req, res) => {
  res.send("This API is reserved for connectStudents");
});

router.use("/questions", questionRouter);
router.use("/answers", answerRouter);
router.use("/votes", votesRouter); 

module.exports = router;
