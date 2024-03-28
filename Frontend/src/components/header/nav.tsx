import Logo from "../assets/SASI-LOGO.png";
function nav() {
  return (
    <>
      <div className="w-full h-[30px] flex justify-center absolute ">
        <img
          src={Logo}
          alt="logo"
          className="h-[100px] w-[100%] sm:w-[80%] sm:h-[120px] lg:w-[50%] lg:h-[130px]"
        />
      </div>
    </>
  );
}

export default nav;
