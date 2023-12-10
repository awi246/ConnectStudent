
const express = require("express");
const router = express.Router();

const voteDB = require("../models/Vote");
const questionDB = require("../models/Question");

router.post("/upvote", async (req, res) => {
  try {
    const existingVote = await voteDB.findOne({
      questionId: req.body.questionId,
      user: req.body.user,
    });

    if (existingVote) {
      // User has already voted, update the vote type
      existingVote.voteType = "upvote";
      await existingVote.save();
    } else {
      // User is voting for the first time
      await voteDB.create({
        voteType: "upvote",
        questionId: req.body.questionId,
        user: req.body.user,
      });
    }

    // Increment the upvote count in the question
    await questionDB.findByIdAndUpdate(req.body.questionId, {
      $inc: { "votes.upvote": 1 },
    });

    res.status(201).send({
      status: true,
      message: "Upvote added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      message: "Error while processing upvote",
    });
  }
});

router.post("/downvote", async (req, res) => {
  try {
    const existingVote = await voteDB.findOne({
      questionId: req.body.questionId,
      user: req.body.user,
    });

    if (existingVote) {
      // User has already voted, update the vote type
      existingVote.voteType = "downvote";
      await existingVote.save();
    } else {
      // User is voting for the first time
      await voteDB.create({
        voteType: "downvote",
        questionId: req.body.questionId,
        user: req.body.user,
      });
    }

    // Decrement the downvote count in the question
    await questionDB.findByIdAndUpdate(req.body.questionId, {
      $inc: { "votes.downvote": 1 },
    });

    res.status(201).send({
      status: true,
      message: "Downvote added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      message: "Error while processing downvote",
    });
  }
});

module.exports = router;
