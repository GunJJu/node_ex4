const express = require("express");
const app = express();
const PORT = 3000;

const characterRouter=require('./routes/character')
app.use('/character', characterRouter)

app.get("/", (req, res) => {
  res.send("다 죽어라..!!");
});

app.listen(PORT, () => {
  console.log("Server is running...!");
});
