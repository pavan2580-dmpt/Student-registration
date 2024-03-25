import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

interface FormValues {
  fullName: string;
  registerNo: string;
  email: string;
  phoneNumber: string;
  fatherName: string;
  motherName: string;
}

interface InfoData{
  name:string;
  registerNo:string;
  fatherName:string;
  motherName:string;
  email:string;
  phoneNo:number;
}

function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const Navigation = useNavigate();

   const [showLoader,setLoaderShow] = useState<boolean>(false)
   const location = useLocation();
   const [isNewUser, setIsNewUser] = useState <boolean>(true);
   const setStudent = location.state.AboutUserType;
   const [Details,setDetails] = useState<InfoData | undefined> (undefined);
   

  useEffect(()=>{
      if(setStudent === "old"){
        setIsNewUser(false)
        const GetfromLocalStorage = localStorage.getItem("studentDetails")!        
        const Info:InfoData = JSON.parse(GetfromLocalStorage)
        setDetails(Info)
      }
      else{
        setIsNewUser(true)
      }
    },[setStudent])

    useEffect(() => {
      if (Details) {
        setValue('fullName', Details.name);
        setValue('registerNo', Details.registerNo);
        setValue('email', Details.email);
        setValue('phoneNumber', Details.phoneNo.toString());
        setValue('fatherName', Details.fatherName);
        setValue('motherName', Details.motherName);
      }
    }, [Details, setValue]);
  const onSubmit: SubmitHandler<FormValues> =async (data) => {
    setLoaderShow(true)
    try {
      if(isNewUser){
        const response = await axios.post("https://student-registration-ashen.vercel.app/AddStudentInfo",{
          email:data.email,
          fatherName:data.fatherName,
          fullName:data.fullName,
          motherName:data.motherName,
          phoneNumber:data.phoneNumber,
          registerNo:data.registerNo.toUpperCase()
        })
        if(response.status === 200){
          Navigation('/Response')
        }
      }
      else{
        const Resp = await axios.put("https://student-registration-ashen.vercel.app/updateTheInfo",{
          email:data.email,
          fatherName:data.fatherName,
          fullName:data.fullName,
          motherName:data.motherName,
          phoneNumber:data.phoneNumber,
          registerNo:data.registerNo.toUpperCase()         
        })
        console.log(Resp)
        if(Resp.status === 200){
          Navigation('/Response',{state:{show:Resp.data}})
        }
      }
      
    } catch (error) {
      console.log(error)
      Navigation("/")
    }
    setLoaderShow(true)
  };

  return (
    <>
      <div className="Form-page-parent-container w-full min-h-[100vh] max-h-auto bg-gray-300 flex justify-center items-center mt-5">
        <div className="Form_page_from_container w-[100%] h-[auto] bg-white p-5 lg:p-10 md:w-[90%] lg:w-[70%] rounded-2xl mt-10">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            {!Details ?
            (<p className='text-xl text-red-500'>Register here</p>):
            (<p className='text-xl text-red-500'>Update your data :</p>)
            }
            <div className="username">
              <label htmlFor="Username">Full Name:</label><br />
              <input
                type="text"
                id="Username"
                className="border-2 border-black border-solid w-[90%] h-[35px] px-2"
                placeholder="Enter your full name"
                
                {...register('fullName', {
                  required: 'Name is required *',
                })}
              />
              {errors.fullName && <p className='Error_message'>{errors.fullName.message}</p>}
            </div>
            <div className="register">
              <label htmlFor="RegisterNo">Register No:</label><br />
              <input
                type="text"
                id="RegisterNo"
                className="border-2 border-black border-solid w-[90%] h-[35px] px-2 mt-3"
                placeholder="Enter your Register Number"
                
                {...register('registerNo', {
                  required: 'Register is required *',
                })}               
              />
               {errors.registerNo && <p className='Error_message'>{errors.registerNo.message}</p>}
            </div>
            <div className="email">
              <label htmlFor="EmailId">Email Id:</label><br />
              <input
                type="text"
                id="EmailId"
                className="border-2 border-black border-solid w-[90%] h-[35px] px-2 mt-3"
                placeholder="Enter your Email"
                {...register('email', {
                  required: 'Email is required *',
                })}
              />
              {errors.email && <p className='Error_message'>{errors.email.message}</p>}
            </div>
            <div className="phoneNo">
              <label htmlFor="PhoneNumber">Phone Number:</label><br />
              <input
                type="tel"
                id="PhoneNumber"
                className="border-2 border-black border-solid w-[90%] h-[35px] px-2 mt-3"
                placeholder="Enter your Phone Number"
                {...register('phoneNumber', {
                  required: 'Phone number is required *',
                })}
              />
              {errors.phoneNumber && <p className='Error_message'>{errors.phoneNumber.message}</p>}
            </div>
            <div className="fatherName">
              <label htmlFor="FatherName">Father Name:</label><br />
              <input
                type="text"
                id="FatherName"
                className="border-2 border-black border-solid w-[90%] h-[35px] px-2 mt-3"
                placeholder="Enter your Father Name"
                {...register('fatherName',{
                  required:'Father name is required *'
                })}
              />
              {errors.fatherName && <p className='Error_message'>{errors.fatherName.message}</p>}
            </div>
            <div className="motherName">
              <label htmlFor="MotherName">Mother Name:</label><br />
              <input
                type="text"
                id="MotherName"
                className="border-2 border-black border-solid w-[90%] h-[35px] px-2 mt-3"
                placeholder="Enter your Mother Name"
                {...register('motherName', {
                  required: 'Mother Name is required *',
                })}
              />
             {errors.motherName && <p className='Error_message'>{errors.motherName.message}</p>}
            </div>
            <center>
              {
                !showLoader &&
                <button type="submit"className="border-2 border-solid w-[120px] border-black  
                rounded-xl py-1 hover:bg-blue-400 hover:text-white hover:border-none ">
                  { 
                    (setStudent === "old") ? "Update" :"Submit"
                  }
                  </button>
              }
            </center>

          </form>
          {
            showLoader && 
           <center>
             <button
            className="border-2 loader_btn bg-blue-400 text-white p-2 flex justify-center w-[150px] rounded-3xl"
            ><div className=" Loader_animate"></div></button> 
           </center>
          }
        </div>
      </div>
    </>
  );
}

export default Form;
