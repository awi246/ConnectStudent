const express = require("express");
const router = express.Router();

const questionDB = require("../models/Question");
const Filter = require("@duckodas/badwords");
const profanityFilter = new Filter();

router.post("/", async (req, res) => {
  if (
    profanityFilter.isProfane(req.body.questionName) ||
    profanityFilter.isProfane(req.body.questionSubject)
  ) {
    return res.status(400).send({
      status: false,
      message: "Cannot add a question with offensive words",
    });
  }

  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        questionSubject: req.body.questionSubject,
        questionUrl: req.body.questionUrl,
        uid: req.body.uid,
        postedBy:req.body.postedBy,
        createdAt:req.body.createdAt,
        userType:req.body.userType,
        userPhoto:req.body.userPhoto
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: "Bad format",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding the question",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await questionDB
      .aggregate([
        {
          $lookup: {
            from: "answers",
            localField: "_id",
            foreignField: "questionId",
            as: "allAnswers",
          },
        },
      ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.status(500).send({
          status: false,
          message: "Unable to get the question details",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

module.exports = router;
