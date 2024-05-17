const {db} =require("../config/Imports.js")


const GetUserDetails = async (req, res) => {
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
};

module.exports = { GetUserDetails };
