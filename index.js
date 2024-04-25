const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectToMongo = require("./config/db.js");

connectToMongo();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome To The Back-End");
});

app.use("/task", require("./routes/task.js"));
app.use("/user", require("./routes/user.js"));

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
