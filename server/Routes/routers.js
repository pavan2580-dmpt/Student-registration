const express = require("express");
const router = express.Router();
const STUDENT = require("../Models/Students");

// @check student register number,get----------
router.route("/getUserInfo/:Reg").get(async (req, res) => {
  const Reg = req.params.Reg;
  const Exists = await STUDENT.findOne({ registerNo: Reg });
  if (Exists) {
    res.send(Exists);
  } else {
    res.send("new user");
  }
});
// @post
// addeds the student to the database
router.route("/AddStudentInfo").post(async (req, res) => {
  try {
    const {
      fullName,
      registerNo,
      phoneNumber,
      email,
      fatherName,
      motherName,
      gender,
      Department,
    } = req.body;
    if (
      !fullName ||
      !registerNo ||
      !phoneNumber ||
      !email ||
      !fatherName ||
      !motherName ||
      !gender ||
      !Department
    ) {
      res.status(400).send("missing data");
    } else {
      const Exists = await STUDENT.findOne({ registerNo });
      if (Exists) {
        res.send(Exists);
      } else {
        const Response = await STUDENT.insertMany({
          name: fullName,
          registerNo: registerNo,
          phoneNo: phoneNumber,
          email: email,
          fatherName: fatherName,
          motherName: motherName,
          gender: gender,
          department: Department,
        });
        res.send(Response);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// update
// update the student data
router.route("/updateTheInfo").put(async (req, res) => {
  try {
    const {
      email,
      fatherName,
      fullName,
      motherName,
      phoneNumber,
      registerNo,
      gender,
      Department,
    } = req.body;
    if (
      !fullName ||
      !registerNo ||
      !phoneNumber ||
      !email ||
      !fatherName ||
      !motherName ||
      !gender ||
      !Department
    ) {
      res.status(400).send(req.body);
    } else {
      const Exists = await STUDENT.findOne({ registerNo });
      if (!Exists) {
        res.send("no user found");
      } else {
        const update = await STUDENT.findOneAndUpdate(
          { registerNo: registerNo },
          {
            $set: {
              email: email,
              name: fullName,
              phoneNo: phoneNumber,
              fatherName: fatherName,
              motherName: motherName,
              gender: gender,
              department: Department,
            },
          },
          { new: true }
        );
        res.send(update);
      }
    }
  } catch (error) {
    res.status(500).send("internal error");
  }
});

module.exports = router;
