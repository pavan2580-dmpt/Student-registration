const express = require("express");
const app = express();
const cors = require("cors");
const DataBase = require("./DataBase/DB");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json())
app.use(express.json());
app.use(cors("*"));

app.get("/", (req, res) => {
    res.send("From the server");
});

app.use("/", require("./Routes/routers"));

DataBase();

app.listen(3000, () => console.log("Server is running on port 3000"));
