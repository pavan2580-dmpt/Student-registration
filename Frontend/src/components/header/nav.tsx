import Logo from "../assets/images-removebg-preview.png";
function nav() {
  return (
    <>
      <div className="w-full h-[30px] flex justify-center absolute ">
        <img src={Logo} alt="logo" width={"40%"} className="h-[140px]" />
      </div>
    </>
  );
}

export default nav;
