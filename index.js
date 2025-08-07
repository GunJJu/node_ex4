const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("mongoDB 연결 성공"))
  .catch((err) => console.log('연결실패', err))

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

const characterRouter = require('./routes/character')

app.use('/api/char', characterRouter)



app.get("/", (req, res) => {
  res.send("다 죽어라..!!");
});

app.listen(PORT, () => {
  console.log("Server is running...!");
});
