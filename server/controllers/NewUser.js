const { fs, path, db, Docxtemplater, PizZip } = require("../config/Imports.js");

const AddUser = async (req, res) => {
  try {
    const {
      sem_no,
      Email_Address,
      Father_Name,
      Mother_Name,
      Name_as_per_certificate,
      Mobile,
      Registration_No,
      Branch,
      ParentphoneNumber,
      Occupation,
      Door_No,
      Failed,
      Passed,
      Credits,
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
      RED_ANTS_Club1,
      RED_ANTS_Club2,
      Blood_Group,
      Gender,
    } = req.body;
    if (
      !DocumentId ||
      !Email_Address ||
      !Father_Name ||
      !Name_as_per_certificate ||
      !Mobile ||
      !Failed ||
      !Passed ||
      !Credits ||
      !Mother_Name ||
      !Registration_No ||
      !Branch ||
      !Gender ||
      !ParentphoneNumber ||
      !Occupation ||
      !Door_No ||
      !Street_Name ||
      !Area_Name ||
      !Village_Town_Name ||
      !State_Name ||
      !Pin_Code ||
      !JVD_Applicable ||
      !Hostel ||
      !Date_of_Birth ||
      !District_Name ||
      !Aadhaar_No ||
      !RED_ANTS_Club1 ||
      !RED_ANTS_Club2||
      !Blood_Group
    ) {
      res.status(400).send("missing data");
    } else {
      const student_year = Registration_No.slice(0, 2);
      const full_student_year = "20" + student_year;
      const date = new Date();
      const present_year = date.getUTCFullYear();
      const present_studying_year =
        Number(present_year) - Number(full_student_year) + 1;

      if (present_studying_year === 1) {
        BTech_year = "I";
      } else if (present_studying_year === 2) {
        BTech_year = " II";
      } else if (present_studying_year === 3) {
        BTech_year = "III";
      } else {
        BTech_year = "IV";
      }
      const year = present_year;
      const next_year = present_year + 1;

      const newData = {
        sem_no: sem_no,
        Email_Address: Email_Address,
        Registration_No: Registration_No,
        Branch: Branch,
        Gender: Gender,
        Mother_Name: Mother_Name,
        Name_as_per_certificate: Name_as_per_certificate,
        ParentphoneNumber: ParentphoneNumber,
        Aadhaar_No: Aadhaar_No,
        Date_of_Birth: Date_of_Birth,
        Blood_Group: Blood_Group,
        Mobile: Mobile,
        Father_Name: Father_Name,
        Occupation: Occupation,
        Door_No: Door_No,
        Street_Name: Street_Name,
        Area_Name: Area_Name,
        Village_Town_Name: Village_Town_Name,
        District_Name: District_Name,
        State_Name: State_Name,
        Pin_Code: Pin_Code,
        JVD_Applicable: JVD_Applicable,
        Hostel: Hostel,
        RED_ANTS_Club1: RED_ANTS_Club1,
        RED_ANTS_Club2: RED_ANTS_Club2,
        Passed: Passed,
        Failed: Failed,
        Credits: Credits,
      };

      // create a document ref
      const DocumentRef = db.collection("StudentSemDetails");

      DocumentRef.set(newData, { merge: true }).then(async () => {
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
          bg: Blood_Group,
          addarea: Area_Name,
          mobile: Mobile,
          email: Email_Address,
          addtown: Village_Town_Name,
          adddist: District_Name,
          addstate: State_Name,
          pincode: Pin_Code,
          pmobile: ParentphoneNumber,
          jvd: JVD_Applicable,
          hostel: Hostel,
          pass: Passed,
          fail: Failed,
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

        try {
          doc.render();
          const updatedContent = doc.getZip().generate({ type: "nodebuffer" });

          const folderName = `Student_Register_Forms`;
          if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, { recursive: true });
          }
          const docxFileName = `${folderName}/${newData.rno}.docx`;
          fs.writeFileSync(docxFileName, updatedContent);
          // resp start
          const filePath = path.join(
            "Student_Register_Forms",
            `${newData.rno}.docx`
          );

          // Check if the file exists
          if (fs.existsSync(filePath)) {
            // Read the file and send it as the response
            const file = fs.createReadStream(filePath);
            res.setHeader(
              "Content-Type",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            );
            res.setHeader(
              "Content-Disposition",
              `attachment; filename=${newData.rno}.docx`
            );
            file.pipe(res);
          } else {
            console.log("file path error ....");
          }
          // response end
        } catch (err) {
          console.log(err);
          res.status(500).send("Internal server error");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { AddUser };
