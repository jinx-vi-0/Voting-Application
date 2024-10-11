const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection URL
const mongoURL = process.env.MONGO_URL;

// Check if the MONGO_URL is defined
if (!mongoURL) {
  console.error("MONGO_URL environment variable is not defined");
  process.exit(1); // Exit the application if the URL is not defined
}

// Set up MongoDB connection
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
    process.exit(1);
  });

// Connection event handlers
const db = mongoose.connection;

db.on("disconnected", () => {
  console.log("Database disconnected");
});

// Export the database connection
module.exports = db;
