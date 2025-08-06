const express = require("express");
const app = express();
const PORT = 3000;

const boardRouter=require('./route/board')
app.use('/board', boardRouter)

app.get("/", (req, res) => {
  res.send("다 죽어라..!!");
});

app.listen(PORT, () => {
  console.log("Server is running...!");
});
