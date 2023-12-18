const express = require("express");
const router = express.Router();

const answerDB = require("../models/Answer");
const Filter = require("@duckodas/badwords");
const profanityFilter = new Filter();

router.post("/", async (req, res) => {
  if (profanityFilter.isProfane(req.body.answer)) {
    return res.status(400).send({
      status: false,
      message: "Cannot add answer with offensive words",
    });
  }
  try {
    await answerDB
      .create({
        answer: req.body.answer,
        questionId: req.body.questionId,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Answer added successfully",
        });
      })
      
      .catch((e) => {
        res.status(400).send({
          status: false,
          message: "Bad request",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding answer",
    });
  }
});

module.exports = router;
