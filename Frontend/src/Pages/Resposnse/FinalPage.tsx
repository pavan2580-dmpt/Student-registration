import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FinalPage() {
  const location = useLocation();
  const nav = useNavigate();
  const val = location.state?.show;
  const fileName = location.state?.filename;
  const fullname = location.state?.username;
  const gender = location.state?.gender;

  const navigate = useNavigate()

  useEffect(() => {
    if (val === undefined) {
      nav("/");
    }
  }, []);


  function downloadFile() {
    const link = document.createElement("a");
    link.href = val;
    link.setAttribute("download", `${fileName}.docx`); // Set the filename

    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(val);
    setTimeout(
      ()=>{
        navigate("/");
      },5000
    )
    
  }

  return (
    <>
      <div className="w-[100%] h-[100vh] pl-[20px] pt-[100px]  ">
        <h1 className="text-2xl">Hello,</h1>
        <p className="text-2xl mt-2 mb-2">
          {gender === "Male" ? "MR" : "MS"} {fullname}
        </p>
        <p className="text-2xl">Download your Registration Form</p>
        <div>
          <center>
            <button
              onClick={downloadFile}
              className="cursor-pointer  bg-red-600 text-white p-2 rounded-md mt-[30px] hover:bg-blue-500 transition"
            >
              Download File
            </button>
          </center>
        </div>
      </div>
    </>
  );
}

export default FinalPage;
