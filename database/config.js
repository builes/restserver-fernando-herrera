const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(`database connected`);
  } catch (err) {
    console.log(err);
    throw new Error("Error connecting to database");
  }
};

module.exports = { connectDB };
