const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "https://collage-test-project-6chv.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: 'Content-Type,Authorization'
  })
);

app.get("/", (req, res) => {
  res.send("From the server");
});

app.use("/", require("./Routes/routers"));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
