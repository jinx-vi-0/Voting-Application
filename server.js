const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/db");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

// Import route modules
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

// Use imported routes
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
