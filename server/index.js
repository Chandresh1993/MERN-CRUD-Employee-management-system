const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("../server/router/routes");
const cors = require('cors')
dotenv.config();

app.use(cors())
//middel wire
app.use(express.json());
app.use(router);


// MongoDb connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.URL);
  console.log("mongodb Connected");
}

app.listen(process.env.PORT || 6050, () => {
  console.log("this port is port running on " + process.env.PORT);
});
