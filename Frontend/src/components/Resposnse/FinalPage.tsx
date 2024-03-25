import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
function FinalPage() {
  const location = useLocation();
  const nav = useNavigate();
  const val = location.state?.show;
  useEffect(() => {
    if (val === undefined) {
      nav("/");
    }
  }, []);

  return (
    <div className="w-f h-[100vh] flex justify-center items-center">
      <h1 className="text-2xl">
        <p className=" text-red-500">{val?.name}</p> your Resposne is submited
      </h1>
      <Link to={"/"}>
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default FinalPage;
