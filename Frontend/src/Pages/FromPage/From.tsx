import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FormValues, InfoData } from "../../utils/utils";
import { District, Clubs, Blood, Branches } from "../../constants/contants";
import moment from "moment";
import Loader from "../../components/Loader";

function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const Navigation = useNavigate();

  const params = useParams();
  const [showLoader, setLoaderShow] = useState<boolean>(false);
  const location = useLocation();
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const setStudent = location.state?.AboutUserType;
  const [Details, setDetails] = useState<InfoData[]>([]);
  const [selectedClub1, setSelectedClub1] = useState<string>("");

  useEffect(() => {
    if (setStudent === "old") {
      setIsNewUser(false);
      const GetfromLocalStorage = localStorage.getItem("studentDetails")!;
      const Info: InfoData[] = JSON.parse(GetfromLocalStorage);
      setDetails(Info);
    } else if (setStudent === "new") {
      setIsNewUser(true);
    }
  }, [setStudent]);

  useEffect(() => {
    if (Details && Details.length > 0) {
      setValue("fullName", Details[0]?.Name_as_per_certificate);
      setValue("sem_no", Details[0]?.sem_no);
      setValue("registerNo", Details[0]?.Registration_No);
      setValue("email", Details[0].Email_Address);
      setValue("phoneNumber", Details[0].Mobile);
      setValue("fatherName", Details[0].Father_Name);
      setValue("motherName", Details[0].Mother_Name);
      setValue("gender", Details[0].Gender);
      setValue("department", Details[0].Branch);
      setValue("Occupation", Details[0].Occupation);
      setValue("Door", Details[0].Door_No);
      setValue("Street", Details[0].Street_Name);
      setValue("Area", Details[0].Area_Name);
      setValue("Village", Details[0].Village_Town_Name);
      setValue("State", Details[0].State_Name);
      setValue("PinCode", parseInt(Details[0].Pin_Code));
      setValue("jvd", Details[0].JVD_Applicable);
      setValue("Hostel", Details[0].Hostel);
      setValue("ParentphoneNumber", Details[0].ParentphoneNumber);
      let formattedDate = moment(Details[0].Date_of_Birth, "yyyy/MM/dd").format(
        "YYYY-MM-DD"
      );
      setValue("DOB", formattedDate);
      setValue("Group", Details[0].Blood_Group);
      const value = Details[0].District_Name;
      let convertedValue = value
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setValue("District", convertedValue);
      setValue("Aadhar", Details[0].Aadhaar_No);
      setValue("Club1", Details[0].RED_ANTS_Club1);
      setValue("Club2", Details[0].RED_ANTS_Club2);
      setValue("Credits", Details[0].Credits);
      setValue("Passed", Details[0].Passed);
      setValue("Failed", Details[0].Failed);
      setSelectedClub1(Details[0].RED_ANTS_Club1);
    }
  }, [Details, setValue]);

  const options = District.map((opt, index) => (
    <option value={opt} key={index}>
      {opt}
    </option>
  ));
  const Group = Blood.map((opt, inx) => (
    <option value={opt} key={inx}>
      {opt}
    </option>
  ));

  const Club = Clubs.map((opt, idx) => (
    <option value={opt} key={idx}>
      {opt}
    </option>
  ));

  const Club2Options = Clubs.filter((club) => club !== selectedClub1).map(
    (opt, idx) => (
      <option value={opt} key={idx}>
        {opt}
      </option>
    )
  );

  const BranchsOpts = Branches.map((opt, idx) => (
    <option value={opt} key={idx}>
      {opt}
    </option>
  ));
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoaderShow(true);
    try {
      if (isNewUser) {
        //  https://student-registration-nxzu.onrender.com
        // http://localhost:3000
        const response = await axios.post(
          "https://student-registration-xsif.vercel.app/firebse/newUser",
          {
            sem_no: data.sem_no,
            email: data.email,
            fatherName: data.fatherName,
            fullName: data.fullName,
            motherName: data.motherName,
            phoneNumber: data.phoneNumber,
            ParentphoneNumber: data.ParentphoneNumber,
            registerNo: data.registerNo.toUpperCase(),
            Gender: data.gender,
            Department: data.department,
            Occupation: data.Occupation,
            Door: data.Door,
            Street: data.Street,
            Area: data.Area,
            Village: data.Village,
            State: data.State,
            PinCode: data.PinCode,
            jvd: data.jvd,
            Hostel: data.Hostel,
            DOB: data.DOB,
            District: data.District,
            Aadhar: data.Aadhar,
            Club1: data.Club1,
            Club2: data.Club2,
            Group: data.Group,
            Credits: data.Credits,
            Passed: data.Passed,
            Failed: data.Failed,
          }
        );
        if (response.status === 200) {
          Navigation("/Response");
        }
      } else {
        // https://student-registration-nxzu.onrender.com
        // http://localhost:3000/firebase/update
        const Resp = await axios.put(
          "https://student-registration-xsif.vercel.app//firebase/update",
          {
            DocumentId: Details[0].id,
            sem_no: data.sem_no,
            Email_Address: data.email,
            Father_Name: data.fatherName,
            Name_as_per_certificate: data.fullName,
            Mother_Name: data.motherName,
            Mobile: data.phoneNumber,
            ParentphoneNumber: data.ParentphoneNumber,
            Registration_No: data.registerNo.toUpperCase(),
            Gender: data.gender,
            Branch: data.department,
            Occupation: data.Occupation,
            Door_No: data.Door,
            Street_Name: data.Street,
            Area_Name: data.Area,
            Village_Town_Name: data.Village,
            State_Name: data.State,
            Pin_Code: data.PinCode,
            JVD_Applicable: data.jvd,
            Hostel: data.Hostel,
            Date_of_Birth: data.DOB,
            District_Name: data.District,
            Aadhaar_No: data.Aadhar,
            RED_ANTS_Club1: data.Club1,
            RED_ANTS_Club2: data.Club2,
            Blood_Group: data.Group,
            Failed: data.Failed,
            Passed: data.Passed,
            Credits: data.Credits,
          },
          { responseType: "blob" }
        );
        if (Resp.status === 200) {
          const url = window.URL.createObjectURL(Resp.data);
          Navigation("/Response", {
            state: {
              show: url,
              filename: data.registerNo.toUpperCase(),
              username: data.fullName,
              gender: data.gender,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
      Navigation("/");
    }
    setLoaderShow(true);
  };

  return (
    <>
      {!showLoader ? (
        <div className="Form-page-parent-container w-full  min-h-fit bg-gray-300 flex justify-center items-center">
          <div className="Form_page_from_container w-[100%]  min-h-auto bg-white p-5 pt-[120px] md:w-[90%] lg:w-[70%] rounded-2xl ">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-full justify-between box-border px-6 mt-5">
                <p className="text-xl font-semibold text-blue-500">
                  {params.register?.toUpperCase()}
                </p>
                <Link to={"/"}>
                  <button className="bg-red-500 text-white text-xl px-4 py-1 rounded-md hover:bg-red-700">
                    cancel
                  </button>
                </Link>
              </div>
              {setStudent === "new" ? (
                <p className="text-xl text-red-500">Register here</p>
              ) : (
                <p className="text-xl text-red-500">Update your data :</p>
              )}

              <div className="Sem_number">
                <p>Semester No :</p>
                <div className="flex gap-5 ml-6 text-2xl">
                  <div className="flex gap-2 ">
                    <input
                      type="radio"
                      value="I"
                      className="w-[20px]"
                      {...register("sem_no", { required: "" })}
                    />{" "}
                    I
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      value="II"
                      className="w-[20px]"
                      {...register("sem_no", {
                        required: "Mention your semester",
                      })}
                    />
                    II
                  </div>
                </div>
                <br />
                {errors.sem_no && (
                  <p className="Error_message">{errors.sem_no.message}</p>
                )}
              </div>

              <div className="register">
                <label htmlFor="RegisterNo">Register No:</label>
                <br />
                <input
                  type="text"
                  id="RegisterNo"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your Register Number"
                  value={params.register?.toUpperCase()}
                  readOnly
                />
              </div>
              <div className="username">
                <label htmlFor="Username">Full Name:</label>
                <br />
                <input
                  type="text"
                  id="Username"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2"
                  placeholder="Enter your full name"
                  {...register("fullName", {
                    required: "Name is required *",
                  })}
                />
                {errors.fullName && (
                  <p className="Error_message">{errors.fullName.message}</p>
                )}
              </div>
              <div className="email">
                <label htmlFor="EmailId">Email Id:</label>
                <br />
                <input
                  type="text"
                  id="EmailId"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your Email"
                  {...register("email", {
                    required: "Email is required *",
                  })}
                />
                {errors.email && (
                  <p className="Error_message">{errors.email.message}</p>
                )}
              </div>
              <div className="DOb">
                <label htmlFor="DOB">Date OF Birth:</label>
                <br />
                <input
                  type="date"
                  id="DOB"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  {...register("DOB", {
                    required: "Date of Birth is required *",
                  })}
                />
                {errors.email && (
                  <p className="Error_message">{errors.email.message}</p>
                )}
              </div>
              <div className="gender">
                <p>Gender :</p>
                <div className="flex gap-5 ml-6 text-xl">
                  <span>
                    <input
                      type="radio"
                      value="Male"
                      {...register("gender", { required: "" })}
                    />
                    Male
                  </span>
                  <span>
                    <input
                      type="radio"
                      value="Female"
                      {...register("gender", {
                        required: "Mention your gender",
                      })}
                    />
                    Female
                  </span>
                </div>
                <br />
                {errors.gender && (
                  <p className="Error_message">{errors.gender.message}</p>
                )}
              </div>
              <div className="Group">
                <label className="text-xl">Select Blood Group :</label>
                <br />
                <select
                  className="w-[90%] h-[45px] border-2 border-black"
                  {...register("Group", {
                    required: "Please select your Boold Group",
                  })}
                  onChange={(e) => {
                    setValue("Group", e.target.value);
                  }}
                  defaultValue={Details[0]?.Blood_Group}
                >
                  <option value="">-----------------select------------</option>
                  {Group}
                </select>
              </div>
              <div className="aadhar">
                <label htmlFor="AAdhar">Aadhar Number: </label>
                <br />
                <input
                  type="tel"
                  id="AAdhar"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your Aadhar Number "
                  {...register("Aadhar", {
                    required: "AAdhar number is required *",
                    maxLength: 12,
                    minLength: 12,
                    pattern: /^[0-9]+$/,
                  })}
                />
                {errors.email && (
                  <p className="Error_message">{errors.email.message}</p>
                )}
              </div>
              <div className="dpt">
                <label className="text-xl">Select Department :</label>
                <br />
                <select
                  id="Department"
                  className="w-[90%] h-[45px] border-2 border-black"
                  {...register("department", {
                    required: "Please select your department",
                  })}
                  onChange={(e) => {
                    setValue("department", e.target.value);
                  }}
                  defaultValue={Details[0]?.Branch}
                >
                  <option value="">
                    ------------------select------------------
                  </option>
                  {BranchsOpts}
                </select>
                {errors.department && (
                  <p className="Error_message">{errors.department.message}</p>
                )}
              </div>
              <div className="phoneNo">
                <label htmlFor="PhoneNumber">Student Phone Number:</label>
                <br />
                <input
                  type="tel"
                  id="PhoneNumber"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your Phone Number"
                  {...register("phoneNumber", {
                    required: "Phone number is required *",
                    maxLength: 10,
                    minLength: 10,
                    pattern: /^[0-9]+$/,
                  })}
                />
                {errors.phoneNumber && (
                  <p className="Error_message">{errors.phoneNumber.message}</p>
                )}
              </div>
              <div className="fatherName">
                <label htmlFor="FatherName">Father Name:</label>
                <br />
                <input
                  type="text"
                  id="FatherName"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your Father Name"
                  {...register("fatherName", {
                    required: "Father name is required *",
                  })}
                />
                {errors.fatherName && (
                  <p className="Error_message">{errors.fatherName.message}</p>
                )}
              </div>
              <div className="fatherOccupation">
                <label htmlFor="Occupation">Occupation:</label>
                <br />
                <input
                  type="text"
                  id="Occupation"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your Father Occupation"
                  {...register("Occupation", {
                    required: "Father Occupation is required *",
                  })}
                />
                {errors.Occupation && (
                  <p className="Error_message">{errors.Occupation.message}</p>
                )}
              </div>
              <div className="motherName">
                <label htmlFor="MotherName">Mother Name:</label>
                <br />
                <input
                  type="text"
                  id="MotherName"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your Mother Name"
                  {...register("motherName", {
                    required: "Mother Name is required *",
                  })}
                />
                {errors.motherName && (
                  <p className="Error_message">{errors.motherName.message}</p>
                )}
              </div>
              {/* ------------ */}
              <div className="ParentphoneNo">
                <label htmlFor="ParentPhoneNumber">Parent Phone Number:</label>
                <br />
                <input
                  type="tel"
                  id="ParentPhoneNumber"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your Phone Number"
                  {...register("ParentphoneNumber", {
                    required: "Phone number is required *",
                    maxLength: 10,
                    minLength: 10,
                    pattern: /^[0-9]+$/,
                  })}
                />
                {errors.ParentphoneNumber && (
                  <p className="Error_message">
                    {errors.ParentphoneNumber.message}
                  </p>
                )}
              </div>
              {/* --------------- */}
              <div className="DoorNo">
                <label htmlFor="Door">Door No:</label>
                <br />
                <input
                  type="text"
                  id="Door"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your Door Number"
                  {...register("Door", {
                    required: "Door Number is required *",
                  })}
                />
                {errors.Door && (
                  <p className="Error_message">{errors.Door.message}</p>
                )}
              </div>
              <div className="StreetName">
                <label htmlFor="Street">Street Name : </label>
                <br />
                <input
                  type="text"
                  id="Street"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your Street Name"
                  {...register("Street", {
                    required: "Street Name is required *",
                  })}
                />
                {errors.Street && (
                  <p className="Error_message">{errors.Street.message}</p>
                )}
              </div>
              <div className="AreaName">
                <label htmlFor="Area">Area Name : </label>
                <br />
                <input
                  type="text"
                  id="Area"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your Area Name"
                  {...register("Area", {
                    required: "Area Name is required *",
                  })}
                />
                {errors.Area && (
                  <p className="Error_message">{errors.Area.message}</p>
                )}
              </div>
              <div className="Village/Town">
                <label htmlFor="Village"> Village / Town Name : </label>
                <br />
                <input
                  type="text"
                  id="Village"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your Village/Town Name"
                  {...register("Village", {
                    required: "Village/Town Name is required *",
                  })}
                />
                {errors.Village && (
                  <p className="Error_message">{errors.Village.message}</p>
                )}
              </div>
              <div className="StateName">
                <label htmlFor="State">State Name : </label>
                <br />
                <input
                  type="text"
                  id="State"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your State Name"
                  {...register("State", {
                    required: "State Name is required *",
                  })}
                />
                {errors.State && (
                  <p className="Error_message">{errors.State.message}</p>
                )}
              </div>
              <div className="District">
                <label htmlFor="State">District Name : </label>
                <br />
                <select
                  id="Districts"
                  className="w-[90%] h-[45px] border-2 border-black"
                  {...register("District", {
                    required: "Please select your District",
                  })}
                  onChange={(e) => {
                    setValue("District", e.target.value);
                  }}
                  defaultValue={Details[0]?.District_Name}
                >
                  <option value="">
                    ----------------select----------------
                  </option>
                  {options}
                </select>

                {errors.District && (
                  <p className="Error_message">{errors.District.message}</p>
                )}
              </div>
              <div className="PinCode">
                <label htmlFor="PinCode">Pin Code : </label>
                <br />
                <input
                  type="number"
                  id="PinCode"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter your State Name"
                  {...register("PinCode", {
                    required: "PinCode is required *",
                  })}
                />
                {errors.PinCode && (
                  <p className="Error_message">{errors.PinCode.message}</p>
                )}
              </div>

              <div className="Club1">
                <label htmlFor="RED ANTS Club1">RED ANTS Club1 : </label>
                <br />
                <select
                  id="RED ANTS Club1"
                  className="w-[90%] h-[45px] border-2 border-black"
                  {...register("Club1", {
                    required: "Please select your RED ANTS Club1",
                  })}
                  onChange={(e) => {
                    setValue("Club1", e.target.value);
                    setSelectedClub1(e.target.value);
                  }}
                  defaultValue={Details[0]?.RED_ANTS_Club1}
                >
                  <option value="">
                    ----------------select----------------
                  </option>
                  {Club}
                </select>

                {errors.Club1 && (
                  <p className="Error_message">{errors.Club1.message}</p>
                )}
              </div>
              {/*------------------------------- Red Ants Clud -2 --------------------------- */}

              <div className="Club2">
                <label htmlFor="RED ANTS Club2">RED ANTS Club2 : </label>
                <br />
                <select
                  id="RED ANTS Club2"
                  className="w-[90%] h-[45px] border-2 border-black"
                  {...register("Club2", {
                    required: "Please select your RED ANTS Club2",
                  })}
                  onChange={(e) => {
                    setValue("Club2", e.target.value);
                  }}
                  defaultValue={Details[0]?.RED_ANTS_Club2}
                >
                  <option value="">
                    ----------------select----------------
                  </option>
                  {Club2Options}
                </select>

                {errors.Club2 && (
                  <p className="Error_message">{errors.Club2.message}</p>
                )}
              </div>
              {/*------------------------------ club - 2 ending------------------------------------------- */}

              <div className="JVD">
                <p className="text-xl font-semibold">JVD Applicable :</p>
                <div className="flex gap-5 ml-6 text-xl">
                  <span>
                    <input
                      type="radio"
                      value="Yes"
                      {...register("jvd", { required: "" })}
                    />
                    YES
                  </span>
                  <span>
                    <input
                      type="radio"
                      value="No"
                      {...register("jvd", {
                        required: "Please fill the field",
                      })}
                    />
                    NO
                  </span>
                </div>
                <br />
                {errors.jvd && (
                  <p className="Error_message">{errors.jvd.message}</p>
                )}
              </div>
              <div className="Hostel">
                <p className="text-xl font-semibold">Hostel :</p>
                <div className="flex gap-5 ml-6 text-xl">
                  <span>
                    <input
                      type="radio"
                      value="Yes"
                      {...register("Hostel", { required: "" })}
                    />
                    YES
                  </span>
                  <span>
                    <input
                      type="radio"
                      value="No"
                      {...register("Hostel", {
                        required: "Please fill the field",
                      })}
                    />
                    NO
                  </span>
                </div>
                <br />
                {errors.Hostel && (
                  <p className="Error_message">{errors.Hostel.message}</p>
                )}
              </div>
              {/* ------------------------------------------ */}
              <div className="NoOfPass">
                <label htmlFor="NoOfSubjectsPassed">
                  No of Subjects Passed :{" "}
                </label>
                <br />
                <input
                  type="number"
                  id="NoOfSubjectsPassed"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter No of subjects passed"
                  {...register("Passed", {
                    required: "This filed is required *",
                    pattern: /^[0-9]+$/,
                  })}
                />
                {errors.Passed && (
                  <p className="Error_message">{errors.Passed.message}</p>
                )}
              </div>

              <div className="NoOfFail">
                <label htmlFor="NoOfSubjectsFailed">
                  No of Subjects Failed :{" "}
                </label>
                <br />
                <input
                  type="number"
                  id="NoOfSubjectsFailed"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter No of subjects Failed"
                  {...register("Failed", {
                    required: "*This filed is required *",
                    pattern: /^[0-9]+$/,
                  })}
                />
                {errors.Failed && (
                  <p className="Error_message">{errors.Failed.message}</p>
                )}
              </div>

              <div className="NoOfCredits">
                <label htmlFor="NoOfCreditsSecured">
                  No of Credits Obtained :{" "}
                </label>
                <br />
                <input
                  type="number"
                  id="NoOfCreditsSecured"
                  className="border-2 border-black border-solid w-[90%] h-[45px] px-2 mt-3"
                  placeholder="Enter no of Credits Obtained"
                  {...register("Credits", {
                    required: "This filed is required *",
                    pattern: /^[0-9]+$/,
                  })}
                />
                {errors.Credits && (
                  <p className="Error_message">{errors.Credits.message}</p>
                )}
              </div>

              <center>
                <button
                  type="submit"
                  className="border-2 border-solid w-[120px] border-black  
                rounded-xl py-1 hover:bg-blue-400 hover:text-white hover:border-white "
                >
                  {setStudent === "old" ? "Continue" : "Submit"}
                </button>
              </center>
            </form>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Form;
