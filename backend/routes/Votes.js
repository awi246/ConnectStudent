const express = require("express");
const router = express.Router();
const Votes = require("../models/Votes");

// Upvote
router.post("/upvote", async (req, res) => {
  try {
    const { questionId } = req.body;
    // Assuming you have user information available in req.user
    const userId = req.user._id;

    const existingVote = await Votes.findOne({
      questionId,
      userId,
    });

    if (existingVote) {
      // User has already voted, handle accordingly (e.g., update vote)
      existingVote.isUpvote = true;
      await existingVote.save();
    } else {
      // Create a new vote
      await Votes.create({
        questionId,
        userId,
        isUpvote: true,
      });
    }

    res.status(200).send({ message: "Upvote successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Downvote
router.post("/downvote", async (req, res) => {
  try {
    const { questionId } = req.body;
    const userId = req.user._id;

    const existingVote = await Votes.findOne({
      questionId,
      userId,
    });

    if (existingVote) {
      existingVote.isUpvote = false;
      await existingVote.save();
    } else {
      await Votes.create({
        questionId,
        userId,
        isUpvote: false,
      });
    }

    res.status(200).send({ message: "Downvote successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
