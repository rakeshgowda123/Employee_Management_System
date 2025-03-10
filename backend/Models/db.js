const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("mongoDB connected successfully");
  })
  .catch((error) => {
    console.log("error in mongoDB connection", error);
  });
