const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const path = require("path");

const app = express();

// express middleware

app.use(express.json());

const uri = process.env.db;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`Succsessfully connected to DB`);
});
app.get("/", (req, res) => {
  res.send("Haloo");
});

app.use("/api/lists", require("./routes/api/lists"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// serve static asset if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
