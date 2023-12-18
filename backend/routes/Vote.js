const express = require("express");
const router = express.Router();

const voteDB = require("../models/Vote");
const questionDB = require("../models/Question");

// POST route for upvoting
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
    res.status(500).send({
      status: false,
      message: "Error while processing upvote",
    });
  }
});

// POST route for downvoting
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
    res.status(500).send({
      status: false,
      message: "Error while processing downvote",
    });
  }
});

// GET route for checking votes
router.get("/check", async (req, res) => {
  try {
    const existingVote = await voteDB.findOne({
      questionId: req.query.questionId,
      user: req.query.userId,
    });

    if (existingVote) {
      res.status(200).send({
        status: true,
        voteType: existingVote.voteType,
      });
    } else {
      res.status(200).send({
        status: true,
        voteType: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error while checking vote",
    });
  }
});

module.exports = router;
