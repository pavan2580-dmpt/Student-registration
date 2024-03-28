import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface FormValues {
  fullName: string;
  registerNo: string;
  email: string;
  phoneNumber: string;
  fatherName: string;
  motherName: string;
  gender: string;
  department: string;
}

interface InfoData {
  name: string;
  registerNo: string;
  fatherName: string;
  motherName: string;
  email: string;
  phoneNo: number;
  gender: string;
  department: string;
}

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
  const setStudent = location.state.AboutUserType;
  const [Details, setDetails] = useState<InfoData | undefined>(undefined);

  useEffect(() => {
    if (setStudent === "old") {
      setIsNewUser(false);
      const GetfromLocalStorage = localStorage.getItem("studentDetails")!;
      const Info: InfoData = JSON.parse(GetfromLocalStorage);
      setDetails(Info);
    } else if (setStudent === "new") {
      setIsNewUser(true);
    }
  }, [setStudent]);

  useEffect(() => {
    if (Details) {
      setValue("fullName", Details.name);
      setValue("registerNo", Details.registerNo);
      setValue("email", Details.email);
      setValue("phoneNumber", Details.phoneNo.toString());
      setValue("fatherName", Details.fatherName);
      setValue("motherName", Details.motherName);
      setValue("gender", Details.gender);
      setValue("department", Details.department);
    }
  }, [Details, setValue]);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoaderShow(true);
    try {
      if (isNewUser) {      
        const response = await axios.post(
          "https://student-registration-ashen.vercel.app/AddStudentInfo",
          {
            email: data.email,
            fatherName: data.fatherName,
            fullName: data.fullName,
            motherName: data.motherName,
            phoneNumber: data.phoneNumber,
            registerNo: data.registerNo.toUpperCase(),
            gender: data.gender,
            Department: data.department,
          }
        );
        if (response.status === 200) {
          Navigation("/Response");
        }
      } else {
          
        const Resp = await axios.put("https://student-registration-ashen.vercel.app/updateTheInfo", {
          email: data.email,
          fatherName: data.fatherName,
          fullName: data.fullName,
          motherName: data.motherName,
          phoneNumber: data.phoneNumber,
          registerNo: data.registerNo.toUpperCase(),
          gender: data.gender,
          Department: data.department,
        });
        if (Resp.statusText === "OK") {
          Navigation("/Response", { state: { show: Resp.data } });
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
            {!Details ? (
              <p className="text-xl text-red-500">Register here</p>
            ) : (
              <p className="text-xl text-red-500">Update your data :</p>
            )}

            <div className="register">
              <label htmlFor="RegisterNo">Register No:</label>
              <br />
              <input
                type="text"
                id="RegisterNo"
                className="border-2 border-black border-solid w-[90%] h-[35px] px-2 mt-3"
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
                className="border-2 border-black border-solid w-[90%] h-[35px] px-2"
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
                className="border-2 border-black border-solid w-[90%] h-[35px] px-2 mt-3"
                placeholder="Enter your Email"
                {...register("email", {
                  required: "Email is required *",
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
                    {...register("gender", { required: "Mention your gender" })}
                  />
                  Female
                </span>
              </div>
              <br />
              {errors.gender && (
                <p className="Error_message">{errors.gender.message}</p>
              )}
            </div>

            <div className="dpt">
              <label className="text-xl">Select Department :</label>
              <br />
              <select
                id="Department"
                className="w-[300px] h-[35px] border-2 border-black"
                {...register("department", {
                  required: "Please select your department",
                })}
                onChange={(e) => {
                  setValue("department", e.target.value)
                }}
                defaultValue={Details?.department}
              >
                <option value="">
                  ------------------select------------------
                </option>
                <option value="computer science and engineering">
                  Computer Science and Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Electrical and Electronics Engineering">
                  Electrical and Electronics Engineering
                </option>
                <option value="Electronics and Communication Engineering">
                  Electronics and Communication Engineering
                </option>
                <option value="Civil engineering">
                  Civil engineering
                </option>
                <option value="Computer Science and Technology">
                  Computer Science and Technology
                </option>
              </select>
              {errors.department && (
                <p className="Error_message">{errors.department.message}</p>
              )}
            </div>

            <div className="phoneNo">
              <label htmlFor="PhoneNumber">Phone Number:</label>
              <br />
              <input
                type="tel"
                id="PhoneNumber"
                className="border-2 border-black border-solid w-[90%] h-[35px] px-2 mt-3"
                placeholder="Enter your Phone Number"
                {...register("phoneNumber", {
                  required: "Phone number is required *",
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
                className="border-2 border-black border-solid w-[90%] h-[35px] px-2 mt-3"
                placeholder="Enter your Father Name"
                {...register("fatherName", {
                  required: "Father name is required *",
                })}
              />
              {errors.fatherName && (
                <p className="Error_message">{errors.fatherName.message}</p>
              )}
            </div>
            <div className="motherName">
              <label htmlFor="MotherName">Mother Name:</label>
              <br />
              <input
                type="text"
                id="MotherName"
                className="border-2 border-black border-solid w-[90%] h-[35px] px-2 mt-3"
                placeholder="Enter your Mother Name"
                {...register("motherName", {
                  required: "Mother Name is required *",
                })}
              />
              {errors.motherName && (
                <p className="Error_message">{errors.motherName.message}</p>
              )}
            </div>

            <center>
              {!showLoader && (
                <button
                  type="submit"
                  className="border-2 border-solid w-[120px] border-black  
                rounded-xl py-1 hover:bg-blue-400 hover:text-white hover:border-white "
                >
                  {setStudent === "old" ? "Update" : "Submit"}
                </button>
              )}
            </center>
          </form>
          {showLoader && (
            <center>
              <button className="border-2 loader_btn bg-blue-400 text-white p-2 flex justify-center w-[150px] rounded-3xl">
                <div className=" Loader_animate"></div>
              </button>
            </center>
          )}
        </div>
      </div>
    </>
  );
}

export default Form;
