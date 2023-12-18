const express = require("express");
const router = express.Router();

const questionDB = require("../models/Question");
const Filter = require("@duckodas/badwords");
const profanityFilter = new Filter();


// Add a new question
router.post("/", async (req, res) => {
  // console.log(req.body);
  if (profanityFilter.isProfane(req.body.questionName) || profanityFilter.isProfane(req.body.questionSubject)) {
    return res.status(400).send({
      status: false,
      message: "Cannot add question with offensive words",
    });
  }

  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        questionSubject: req.body.questionSubject,
        questionUrl: req.body.questionUrl,
        user: req.body.user,
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
      message: "Error while adding question",
    });
  }
});

// Update a question
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedQuestion } = req.body;

    const question = await questionDB.findByIdAndUpdate(id, { questionName: updatedQuestion }, { new: true });

    if (!question) {
      return res.status(404).json({ status: false, message: 'Question not found' });
    }

    res.json({ status: true, message: 'Question updated successfully', question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});

// Delete a question
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const question = await questionDB.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({ status: false, message: 'Question not found' });
    }

    res.json({ status: true, message: 'Question deleted successfully', question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});

// Get all questions with answers
router.get("/", async (req, res) => {
  try {
    await questionDB
      .aggregate([
        {
          $lookup: {
            from: "answers", // collection to join
            localField: "_id", // field from input document
            foreignField: "questionId",
            as: "allAnswers", // output array field
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
