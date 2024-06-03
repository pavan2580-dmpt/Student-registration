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
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Content-Type-Options",
      "Accept",
      "X-Requested-With",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers",
    ],
  })
);

app.get("/", (req, res) => {
  res.send("From the server");
});

app.use("/", require("./Routes/routers"));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
