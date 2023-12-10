const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  
  questionName: String,
  questionUrl: String,
  questionSubject: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  },

  user: Object,
  votes: {
    upvote: {
      type: Number,
      default: 0,
    },
    downvote: {
      type: Number,
      default: 0,
    },
  },

});

module.exports = mongoose.model("Questions", QuestionSchema);
