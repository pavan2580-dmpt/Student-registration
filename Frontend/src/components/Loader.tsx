import { FaGear } from "react-icons/fa6";

function Loader() {
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
          <div className="inner_container w-fit p-[60px] h-fit ">
          <div className="w-0 h-0 t1  relative  left-[60px] top-[80px] rotate-[90deg]
  border-t-[10px] border-t-transparent
  border-r-[40px] border-r-red-600
  border-b-[10px] border-b-transparent"/>

  <div className="w-0 h-0 t2 relative  top-[75px] rotate-[60deg] right-[0px]
  border-t-[10px] border-t-transparent
  border-r-[40px] border-r-red-600
  border-b-[10px] border-b-transparent"/>
 

          <div className="w-0 h-0 t1 relative top-[100px] right-[40px] rotate-[30deg]
  border-t-[10px] border-t-transparent
  border-r-[40px] border-r-red-600
  border-b-[10px] border-b-transparent"/>


<div className="w-0 h-0 t2 relative top-[140px] right-[50px] rotate-[0deg]
  border-t-[10px] border-t-transparent
  border-r-[40px] border-r-red-600
  border-b-[10px] border-b-transparent"/>


<div className="w-0 h-0 t1 relative top-[180px] right-[10px] rotate-[-50deg]
  border-t-[10px] border-t-transparent
  border-r-[40px] border-r-red-600
  border-b-[10px] border-b-transparent"/>

<div className="w-0 h-0 t2 relative top-[185px] right-[-50px] rotate-[-90deg]
  border-t-[10px] border-t-transparent
  border-r-[40px] border-r-red-600
  border-b-[10px] border-b-transparent"/>



      <div className="w-[150px] h-[150px] rounded-full bg-red-600 flex items-center ">
      
        <div>
        
          <div className="Moonp1 w-[100px] h-[100px] rounded-full bg-white flex justify-end items-center relative right-1 ">
            <div className="Moonp2 w-[70px] h-[70px] rounded-full bg-red-600 pl-3 relative left-2"/>
          </div>
        </div>
        <FaGear size={50} className="relative  left-[15px] text-white z-10 gear"/>
      </div>
          </div>

    </div>
  );
}

export default Loader;
