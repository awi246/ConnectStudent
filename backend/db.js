const mongoose = require("mongoose");

const url =
  "mongodb+srv://awiral1234:bIltesX2frwwbCiG@cluster.uydjzsl.mongodb.net/ConnectDatabase?retryWrites=true&w=majority";

module.exports.connect = () => {
  mongoose
    .connect(url, {})
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => console.log("Error: ", error));
};
