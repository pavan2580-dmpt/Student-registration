const { fs, path, db, Docxtemplater, PizZip } = require("../config/Imports.js");
const { convertDocxToPdf } = require("./docxTopdf.js");

const Update__Users = async (req, res) => {
  try {
    const {
      DocumentId,
      sem_no,
      Email_Address,
      Father_Name,
      Mother_Name,
      Name_as_per_certificate,
      Mobile,
      ParentphoneNumber,
      Registration_No,
      Branch,
      Occupation,
      Door_No,
      Street_Name,
      Area_Name,
      Village_Town_Name,
      State_Name,
      Pin_Code,
      JVD_Applicable,
      Hostel,
      Date_of_Birth,
      District_Name,
      Aadhaar_No,
      Failed,
      Passed,
      Credits,
      RED_ANTS_Club1,
      RED_ANTS_Club2,
      Blood_Group,
      Gender,
    } = req.body;

    // Check for missing data
    const requiredFields = [
      DocumentId,
      sem_no,
      Email_Address,
      Father_Name,
      Mother_Name,
      Name_as_per_certificate,
      Mobile,
      ParentphoneNumber,
      Registration_No,
      Branch,
      Occupation,
      Door_No,
      Street_Name,
      Area_Name,
      Village_Town_Name,
      State_Name,
      Pin_Code,
      JVD_Applicable,
      Hostel,
      Date_of_Birth,
      District_Name,
      Aadhaar_No,
      Failed,
      Passed,
      Credits,
      RED_ANTS_Club1,
      RED_ANTS_Club2,
      Blood_Group,
      Gender,
    ];

    if (requiredFields.some((field) => !field)) {
      return res.status(400).send("Missing data");
    }

    const DocRef = db.collection("StudentSemDetails").doc(DocumentId);

    const student_year = Registration_No.slice(0, 2);
    const full_student_year = "20" + student_year;
    const date = new Date();
    const present_year = date.getUTCFullYear();
    const present_studying_year =
      Number(present_year) - Number(full_student_year) + 1;

    let BTech_year;
    if (present_studying_year === 1) {
      BTech_year = "I";
    } else if (present_studying_year === 2) {
      BTech_year = "II";
    } else if (present_studying_year === 3) {
      BTech_year = "III";
    } else {
      BTech_year = "IV";
    }

    const year = present_year;
    const next_year = present_year + 1;
    const childern_of = Gender === "Male" ? "S/O" : "D/O";

    const updateData = {
      Email_Address,
      Registration_No,
      sem_no,
      Branch,
      Gender,
      Mother_Name,
      Name_as_per_certificate,
      Aadhaar_No,
      Date_of_Birth,
      Blood_Group,
      Mobile,
      Father_Name,
      ParentphoneNumber,
      Occupation,
      Door_No,
      Street_Name,
      Area_Name,
      Village_Town_Name,
      District_Name,
      State_Name,
      Pin_Code,
      JVD_Applicable,
      Hostel,
      RED_ANTS_Club1,
      RED_ANTS_Club2,
      Passed,
      Failed,
      Credits,
    };

    await DocRef.set(updateData, { merge: true });

    const newData = {
      year: year,
      next_year: next_year,
      Btech_year: BTech_year,
      sem_no: sem_no,
      branch: Branch,
      name: Name_as_per_certificate,
      rno: Registration_No,
      fname: Father_Name,
      ano: Aadhaar_No,
      occ: Occupation,
      dob: Date_of_Birth,
      adddno: Door_No,
      addstreet: Street_Name,
      pmobile: ParentphoneNumber,
      bg: Blood_Group,
      addarea: Area_Name,
      mobile: Mobile,
      email: Email_Address,
      addtown: Village_Town_Name,
      adddist: District_Name,
      addstate: State_Name,
      pincode: Pin_Code,
      jvd: JVD_Applicable,
      hostel: Hostel,
      pass: Passed,
      fail: Failed,
      childern_of,
      hobby1: RED_ANTS_Club1,
      hobby2: RED_ANTS_Club2,
      credits: Credits,
      sc1: "SubjectCode1",
      sn1: "SubjectName1",
      sc2: "SubjectCode2",
      sn2: "SubjectName2",
      sc3: "SubjectCode3",
      sn3: "SubjectName3",
      sc4: "SubjectCode4",
      sn4: "SubjectName4",
    };

    const content = fs.readFileSync(
      "./files/IV_BTech_I_Sem_24_Reg.docx",
      "binary"
    );

    const zip = new PizZip(content);
    const doc = new Docxtemplater();
    doc.loadZip(zip);
    doc.setData(newData);
    doc.render();
    const updatedContent = doc.getZip().generate({ type: "nodebuffer" });

    const folderName = "Student_Register_Forms";
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }

    const docxFileName = `${folderName}/${newData.rno}.docx`;

    fs.writeFileSync(docxFileName, updatedContent);

    // Convert DOCX to PDF

    const docxfilePath = path.join(
      "Student_Register_Forms",
      `${newData.rno}.docx`
    );
    const pdffilePath = path.join(
      "Student_Register_Forms",
      `${newData.rno}.pdf`
    );

    await convertDocxToPdf(docxfilePath, pdffilePath);

    // send the pdf to frontend and delete them.
    res.download(pdffilePath, (err) => {
      if (err) {
        console.error(`Error sending file: ${err.message}`);
        res.status(500).send("Error sending file.");
      } else {
        // Delete the DOCX and PDF files after sending
        fs.unlink(docxfilePath, (err) => {
          if (err) console.error(`Error deleting DOCX file: ${err.message}`);
        });
        fs.unlink(pdffilePath, (err) => {
          if (err) console.error(`Error deleting PDF file: ${err.message}`);
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { Update__Users };
