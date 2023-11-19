const mongoose = require("mongoose");

const url ="mongodb+srv://Awiral1234:8Slgo1Hy8hGJWyRF@cluster0.texd5b9.mongodb.net/?retryWrites=true&w=majority";

module.exports.connect = () => {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((error) => console.log("Error: ", error));
  };
  