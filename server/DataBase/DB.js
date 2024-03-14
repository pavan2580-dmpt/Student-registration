const mongoose = require("mongoose");
require("dotenv").config();

const DataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to the database");
    } catch (err) {
        console.error(err);
    }
};

module.exports = DataBase;
