const mongoose = require("mongoose");

const VotesSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Assuming you have a Users model
    required: true,
  },
  isUpvote: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


VotesSchema.post("save", async function (doc) {
  await this.model("Questions").updateOne(
    { _id: doc.questionId },
    { $push: { votes: doc._id } }
  );
});

module.exports = mongoose.model("Votes", VotesSchema);
