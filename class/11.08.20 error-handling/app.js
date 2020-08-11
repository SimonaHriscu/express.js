const express = require("express");
const app = express();
const morgan = require("morgan");

const userRouter = require("./router/users");
// const booksRouter = require("./router/books");
app.use(morgan("dev"));

app.use("/users", userRouter);
// app.use("/books", userRouter);

app
  .get("/", (req, res) => {
    console.log("GET");
    res.status(200).json({ text: "This was GET req" });
    // res.end();
  })
  .post("/", (req, res) => {
    console.log("POST");
    res.status(200).json({ text: "This was POST" });
  })
  .delete("/", (req, res) => {
    console.log("DELETE");
    res.status(200).json({ text: "This was DELETE" });
  });

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
