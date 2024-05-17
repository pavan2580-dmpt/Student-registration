const express = require("express");
const router = express.Router();

const {AddUser} = require("../controllers/NewUser")
const {GetUserDetails} = require("../controllers/SingleUser")
const {UpdateUser} = require("../controllers/UpdateUser")
const {Uplaod_CSV_TO_FireStore} = require("../controllers/UploadCSV_TO_FireStore")

// @get route
// route for getting the student details using id
// if exists sends  res as "old user" ,else sends res as "new user".
router.route("/firebase/getUserInfo/:Reg").get(GetUserDetails);

// -----------------------------------------------------------------------------------
// @put to fire-store
// Creates a dox file for registration form using the details
// and updates then in the fire store
router.route("/firebase/update").put(UpdateUser);

// ----------------------------------------------------------------------------------------
//@put to fire-store
// creates a html file for registrarion from using the details
// and update them in the fire-store
// router.route("/firebase/html/update").put(async (req, res) => {
//   try {
//     const {
//       DocumentId,
//       sem_no,
//       Email_Address,
//       Father_Name,
//       Mother_Name,
//       Name_as_per_certificate,
//       Mobile,
//       Registration_No,
//       Branch,
//       Occupation,
//       Door_No,
//       Street_Name,
//       Area_Name,
//       Village_Town_Name,
//       State_Name,
//       Pin_Code,
//       JVD_Applicable,
//       Hostel,
//       Date_of_Birth,
//       District_Name,
//       Aadhaar_No,
//       RED_ANTS_Club1,
//       Blood_Group,
//       Gender,
//     } = req.body;

//     if (
//       !DocumentId ||
//       !Email_Address ||
//       !Father_Name ||
//       !Name_as_per_certificate ||
//       !Mobile ||
//       !Mother_Name ||
//       !Registration_No ||
//       !Branch ||
//       !Gender ||
//       !Occupation ||
//       !Door_No ||
//       !Street_Name ||
//       !Area_Name ||
//       !Village_Town_Name ||
//       !State_Name ||
//       !Pin_Code ||
//       !JVD_Applicable ||
//       !Hostel ||
//       !Date_of_Birth ||
//       !District_Name ||
//       !Aadhaar_No ||
//       !RED_ANTS_Club1 ||
//       !Blood_Group ||
//       !sem_no
//     ) {
//       res.status(400).send("missing data");
//       return;
//     }

//     const student_year = Registration_No.slice(0, 2);
//     const full_student_year = "20" + student_year;
//     const date = new Date();
//     const present_year = date.getUTCFullYear();
//     const present_studying_year =
//       Number(present_year) - Number(full_student_year) + 1;

//     if (present_studying_year === 1) {
//       BTech_year = "I";
//     } else if (present_studying_year === 2) {
//       BTech_year = "II";
//     } else if (present_studying_year === 3) {
//       BTech_year = "III";
//     } else {
//       BTech_year = "IV";
//     }
//     const year = present_year;
//     const next_year = present_year + 1;

//     const DocRef = db.collection("StudentSemDetails").doc(DocumentId);

//     const updateData = {
//       sem_no: sem_no,
//       Email_Address: Email_Address,
//       Registration_No: Registration_No,
//       Branch: Branch,
//       Gender: Gender,
//       Mother_Name: Mother_Name,
//       Name_as_per_certificate: Name_as_per_certificate,
//       Aadhaar_No: Aadhaar_No,
//       Date_of_Birth: Date_of_Birth,
//       Blood_Group: Blood_Group,
//       Mobile: Mobile,
//       Father_Name: Father_Name,
//       Occupation: Occupation,
//       Door_No: Door_No,
//       Street_Name: Street_Name,
//       Area_Name: Area_Name,
//       Village_Town_Name: Village_Town_Name,
//       District_Name: District_Name,
//       State_Name: State_Name,
//       Pin_Code: Pin_Code,
//       // Parent_Mobile: Parent_Mobile,
//       JVD_Applicable: JVD_Applicable,
//       Hostel: Hostel,
//       RED_ANTS_Club1: RED_ANTS_Club1,
//       RED_ANTS_Club2: "1",
//       No_of_Subjects_Passed: "1",
//       No_of_Subjects_Failed: "1",
//       No_of_Credits_Obtained: "1",
//     };
//     DocRef.set(updateData, { merge: true }).then(async () => {
//       console.log("Document successfully updated!");

//       const newData = {
//         branch: Branch,
//         name: Name_as_per_certificate,
//         rno: Registration_No,
//         fname: Father_Name,
//         ano: Aadhaar_No,
//         occ: Occupation,
//         dob: Date_of_Birth,
//         adddno: Door_No,
//         addstreet: Street_Name,
//         bg: Blood_Group,
//         addarea: Area_Name,
//         mobile: Mobile,
//         email: Email_Address,
//         addtown: Village_Town_Name,
//         adddist: District_Name,
//         addstate: State_Name,
//         pincode: Pin_Code,
//         pmobile: 989898,
//         jvd: JVD_Applicable,
//         hostel: Hostel,
//         pass: 42,
//         fail: 3,
//         hobby1: RED_ANTS_Club1,
//         hobby2: RED_ANTS_Club1,
//         credits: 128,
//         sc1: "SubjectCode1",
//         sn1: "SubjectName1",
//         sc2: "SubjectCode2",
//         sn2: "SubjectName2",
//         sc3: "SubjectCode3",
//         sn3: "SubjectName3",
//         sc4: "SubjectCode4",
//         sn4: "SubjectName4",
//       };

//       let htmlContent = fs.readFileSync(
//         "./files/IV_BTech_I_Sem_24_Reg-converted.html",
//         "utf8"
//       );

//       Object.keys(newData).forEach((key) => {
//         const regex = new RegExp(`{${key}}`, "g");
//         htmlContent = htmlContent.replace(regex, newData[key]);
//       });

//       const folderName = `Student_Register_Forms`;
//       if (!fs.existsSync(folderName)) {
//         fs.mkdirSync(folderName, { recursive: true });
//       }
//       const htmlFileName = `${folderName}/${newData.rno}.html`;
//       fs.writeFileSync(htmlFileName, htmlContent);

//       const generatedHtmlContent = fs.readFileSync(htmlFileName, "utf8");

//       res.send(generatedHtmlContent);
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// });

// ---------------------------------------------------------------------------------------------
// static file path,file path should be hardcoded.
// uplaod data to fire-store using execelsheets or csv file
router.route("/upload").get(Uplaod_CSV_TO_FireStore);



// @post route for adding user user to fire store
// and creates a registration from docx file and sends to front-end
// @public post route
router.route("/firebse/newUser").post(AddUser)




module.exports = router;
