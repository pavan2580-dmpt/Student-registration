const { fs, db} =require("../config/Imports.js")
const csv = require('csv-parser');


// Enter your csv file path here
const csvFilePath = "./files/studentIngo.csv";

const Uplaod_CSV_TO_FireStore = async (req, res) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", async (row) => {
        try {
          const docRef = db.collection("StudentSemDetails").doc();
          await docRef.set(row);
          console.log(`Document ${docRef.id} created`);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      })
      .on("end", () => {
        console.log("CSV file successfully processed.");
        res.send("done");
      });
  }

module.exports = {Uplaod_CSV_TO_FireStore}