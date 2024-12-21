import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [Reg, SetReg] = useState<string>("");
  const navigate = useNavigate();
  const [Loader, SetLoader] = useState<boolean>(false);

  const HandleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (Reg.length === 10 && Reg[2].toUpperCase() == "K" && Reg[3] == "6") {
      SetLoader(true);
      try {
        // https://student-registration-nxzu.onrender.com
        // http://localhost:3000

        const resp = await axios.get(
          `https://student-registration-xsif.vercel.app/firebase/getUserInfo/${Reg.toUpperCase()}`
        );
        console.log(resp.data[0].Aadhaar_No);
        if (resp.data !== "new user") {
          navigate(`/student_details/${Reg}`, {
            state: { AboutUserType: "old" },
          });
          localStorage.setItem("studentDetails", JSON.stringify(resp.data));
        } else {
          navigate(`/student_details/${Reg}`, {
            state: { AboutUserType: "new" },
          });
        }
        SetLoader(false);
      } catch (error) {
        console.error(error);
        SetLoader(false);
      }
    } else {
      toast.error("Invalid Input");
    }
  };

  return (
    <>
      <div className="Parent-container-Page w-[100%] h-[100vh] flex justify-center items-center bg-[#f2f5ff]">
        <ToastContainer />
        <div className="RegisterNo_field_Area w-[350px] h-fit flex flex-col gap-10 border-2 border-solid border-blue-400 rounded-xl py-10 px-8">
          <form>
            <div className="flex flex-col gap-3">
              <label htmlFor="register_" className="text-blue-600 text-xl">
                Register No :
              </label>
              <input
                type="text"
                name="register"
                id="register_"
                className="input h-[40px] px-3 outline-blue-400"
                placeholder="Register number"
                required
                value={Reg}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  SetReg(e.target.value);
                }}
              />
            </div>

            {!Loader && (
              <button
                className="text-blue-500 border-2 border-blue-400 p-2
             hover:bg-blue-400  hover:text-white w-full mt-8 "
                onClick={HandleClick}
              >
                Continue
              </button>
            )}
          </form>
          {Loader && (
            <button className="border-2 loader_btn bg-blue-400 text-white p-2 flex justify-center">
              <div className=" Loader_animate" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
