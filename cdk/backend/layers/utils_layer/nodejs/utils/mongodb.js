const mongoose = require("mongoose");
const { getSecretKey } = require("../secret/secret-manager.js");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }
  try {
    const  MONGO_URI = await getSecretKey('MONGO_URI');
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
    console.log(mongoose.connection.db.databaseName);
  }
  catch (error) {
    console.error("MongoDB Connection Failed:", error);
    throw new Error("Database connection error");
  }
};

module.exports = connectDB;
