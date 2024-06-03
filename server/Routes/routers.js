const express = require("express");
const router = express.Router();

const { AddUser } = require("../controllers/NewUser");
const { GetUserDetails } = require("../controllers/SingleUser");
const { db } = require("../config/Imports.js");
const { Update__Users } = require("../controllers/update__Users");
const {
  Uplaod_CSV_TO_FireStore,
} = require("../controllers/UploadCSV_TO_FireStore");

// @get route
// route for getting the student details using id
// if exists sends  res as "old user" ,else sends res as "new user".
router.route("/firebase/getUserInfo/:Reg").get(async (req, res) => {
  const Reg = req.params.Reg;
  const snapshot = await db
    .collection("StudentSemDetails")
    .where("Registration_No", "==", Reg)
    .get();
  if (snapshot.empty) {
    res.send("new user");
    console.log("new");
  } else {
    data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    res.send(data);
  }
});

// -----------------------------------------------------------------------------------
// @put to fire-store
// Creates a dox file for registration form using the details
// and updates then in the fire store
router.route("/firebase/update").put(Update__Users);
// ---------------------------------------------------------------------------------------------
// static file path,file path should be hardcoded.
// uplaod data to fire-store using execelsheets or csv file
router.route("/upload").get(Uplaod_CSV_TO_FireStore);

// @post route for adding user user to fire store
// and creates a registration from docx file and sends to front-end
// @public post route
router.route("/firebse/newUser").post(AddUser);

module.exports = router;
