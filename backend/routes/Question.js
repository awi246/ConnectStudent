const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const questionDB = require("../models/Question");
const Filter = require("bad-words");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const profanityWordsFilePath = path.join(__dirname, "profanityWords.json");
const customProfanityWords = JSON.parse(
  fs.readFileSync(profanityWordsFilePath)
);

const profanityFilter = new Filter();
customProfanityWords.forEach((wordObject) => {
  const { value } = wordObject;
  profanityFilter.addWords(value);
});

router.post("/", (req, res, next) => {
  upload.single("questionImage")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Multer error occurred (e.g., file size exceeded)
      return res.status(400).send({
        status: false,
        message: "Multer error: " + err.message,
      });
    } else if (err) {
      // Non-Multer error occurred
      return res.status(500).send({
        status: false,
        message: "Error uploading file: " + err.message,
      });
    }

    try {
      let questionImageName = null;

      // Check if an image is provided in the request
      if (req.file) {
        const originalQuestionImageName = req.file.originalname.split(".")[0];
        questionImageName = `question-${originalQuestionImageName}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(
            path.join(__dirname, `../img/questionImages/${questionImageName}`)
          );
      }

      await questionDB.create({
        questionName: req.body.questionName,
        questionSubject: req.body.questionSubject,
        questionImage: questionImageName,
        uid: req.body.uid,
        postedBy: req.body.postedBy,
        createdAt: req.body.createdAt,
        userType: req.body.userType,
        userPhoto: req.body.userPhoto,
      });

      res.status(201).send({
        status: true,
        message: "Question added successfully",
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        status: false,
        message: "Error while adding the question",
      });
    }
  });
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

router.put("/:questionId", async (req, res) => {
  const { questionId } = req.params;
  const { questionName, questionUrl, questionSubject, questionImage } =
    req.body;

  try {
    if (
      profanityFilter.isProfane(questionName) ||
      profanityFilter.isProfane(questionSubject)
    ) {
      return res.status(400).json({
        status: false,
        message: "Cannot update a question with offensive words",
      });
    }

    const updatedQuestion = await questionDB.findByIdAndUpdate(
      questionId,
      {
        $set: {
          questionName,
          questionUrl,
          questionImage,
          questionSubject,
        },
      },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({
      status: true,
      message: "Question updated successfully",
      updatedQuestion,
    });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.delete("/:questionId", async (req, res) => {
  const { questionId } = req.params;

  try {
    const deletedQuestion = await questionDB.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({
      status: true,
      message: "Question deleted successfully",
      deletedQuestion,
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

module.exports = router;
