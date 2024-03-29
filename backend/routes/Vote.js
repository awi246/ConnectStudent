const express = require("express");
const router = express.Router();

const voteDB = require("../models/Vote");
const questionDB = require("../models/Question");

router.post("/upvote", async (req, res) => {
  try {
    const { questionId, user } = req.body;
    if (!questionId || !user) {
      return res.status(400).send({
        status: false,
        message: "Invalid request body. Missing required fields.",
      });
    }

    const existingVote = await voteDB.findOne({
      questionId: questionId,
      user: user,
    });

    if (existingVote) {
      if (existingVote.voteType === "upvote") {
        await voteDB.deleteOne({
          questionId: questionId,
          user: user,
          voteType: "upvote",
        });
        await questionDB.findByIdAndUpdate(questionId, {
          $inc: { "votes.upvote": -1 },
        });

        return res.status(200).send({
          status: true,
          message: "Upvote removed successfully",
        });
      } else {
        existingVote.voteType = "upvote";
        await existingVote.save();
        await questionDB.findByIdAndUpdate(questionId, {
          $inc: { "votes.upvote": 1 },
        });

        return res.status(200).send({
          status: true,
          message: "Upvote added successfully",
        });
      }
    }
    await voteDB.create({
      voteType: "upvote",
      questionId: questionId,
      user: user,
    });

    await questionDB.findByIdAndUpdate(questionId, {
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
    const { questionId, user } = req.body;
    if (!questionId || !user) {
      return res.status(400).send({
        status: false,
        message: "Invalid request body. Missing required fields.",
      });
    }

    const existingVote = await voteDB.findOne({
      questionId: questionId,
      user: user,
    });

    if (existingVote) {
      if (existingVote.voteType === "downvote") {
        await voteDB.deleteOne({
          questionId: questionId,
          user: user,
          voteType: "downvote",
        });
        await questionDB.findByIdAndUpdate(questionId, {
          $inc: { "votes.downvote": -1 },
        });

        return res.status(200).send({
          status: true,
          message: "Downvote removed successfully",
        });
      } else {
        existingVote.voteType = "downvote";
        await existingVote.save();

        await questionDB.findByIdAndUpdate(questionId, {
          $inc: { "votes.downvote": 1 },
        });

        return res.status(200).send({
          status: true,
          message: "Downvote added successfully",
        });
      }
    }

    await voteDB.create({
      voteType: "downvote",
      questionId: questionId,
      user: user,
    });

    await questionDB.findByIdAndUpdate(questionId, {
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

router.get("/check", async (req, res) => {
  try {
    const existingVote = await voteDB.findOne({
      questionId: req.query.questionId,
      user: req.query.userId,
    });

    const question = await questionDB.findById(req.query.questionId);

    if (!question) {
      return res.status(404).send({
        status: false,
        message: "Question not found",
      });
    }

    const votes = {
      upvote: question.votes.upvote,
      downvote: question.votes.downvote,
    };

    if (existingVote) {
      res.status(200).send({
        status: true,
        voteType: existingVote.voteType,
        votes: votes,
      });
    } else {
      res.status(200).send({
        status: true,
        voteType: null,
        votes: votes,
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
