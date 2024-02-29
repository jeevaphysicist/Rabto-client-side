import React, { Fragment, useState } from 'react';
import  Torusknot from "../../Assets/Visitors/Torus Knot.png";
import Minilogo from "../../Assets/Visitors/mini_logo.png"
 
const gradientStyle = {
  backgroundImage: `linear-gradient(to right, #52D22E,#9EE86F ,#FCEB3C)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text', // For Safari
  color: 'transparent',
};
const Steptwo = ({handleStep}) => {
  const [companyName,setCompanyName] = useState('');
  const [mobileNo,setMobileNo] = useState('');
  const [error,setError] = useState('');

function validateMobileNumber(mobileNo) {
    // Simple example: 10 digits without any special characters
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(mobileNo);
}

function validateCompanyName(companyName) {
    // Simple example: at least 3 characters
    return companyName.length >= 3;
}
  const stepHandler = ()=>{
    if (validateMobileNumber(mobileNo) && validateCompanyName(companyName)) {
      let data = {
        companyName,
        mobileNo
     }
     handleStep(true,data)
      // console.log("Validation successful");
      setError("");
  } else {
     
      // console.log("Validation failed");
      setError("Please Fill the Details Correctly");
  }
    
  }
  
    

     
    
  return (
    <Fragment>
    <div className='mx-10 px-5 bg-white min-h-[93vh]'>
    <div className='flex items-center justify-center mt-10'>
                    <div className="flex items-center justify-center relative gap-2">
                      <img src={Minilogo} alt='Minilogo' className='w-[43px]' />
                      <span className='text-[51px] vvdsfifties text-[#0F2604]'>RABTO</span>         
                      <div className='absolute bottom-0 left-[52px] text-[#0F2604] text-[9px] text-center'>A Product of theDot Tech</div>
                      
                    </div>
                </div>
    <div className='relative mt-40'>
    <div className='flex  items-center justify-start'>
    <div className='text-[50px] font-bold vvdsfifties  ' style={{lineHeight:1,letterSpacing:"3px"}} >
         <span style={gradientStyle}>MAKE IT <br/></span> 
         <span className='text-[#1D1D1D]'>YOURS IN <br/> MINUTES</span>
    </div>
    </div>
    <img src={Torusknot} className='absolute -top-20 right-0' alt='Torusknot'/>
    </div>
    <div className='flex items-center justify-center flex-col mt-20 gap-10'>
       {error ? <div className='text-[red] font-bold'>{error}</div> : null}
        <div className='w-[100%] relative gilroyMedium'>
           <input type="text" value={companyName} placeholder='Enter Your Company Name' className='rounded-[10px] border-[#52D22E] border-[1px] px-5 h-[43px] w-[100%]' onChange={(e)=>{setCompanyName(e.target.value)}} />
            <div className=' bg-white left-5 text-[14px] font-semibold text-[#52D22E] absolute -top-3'>Company name</div>
        </div>
        <div className='w-[100%] relative gilroyMedium'>
           <input type="text" value={mobileNo} placeholder='10 Digit Mobile Number ' className='pl-[60px] rounded-[10px] border-[#52D22E] border-[1px] px-5 h-[43px] w-[100%]' onChange={(e)=>{setMobileNo(e.target.value)}} />
           <div className=' bg-white left-5 text-[14px] font-semibold text-[#52D22E] absolute -top-3'>Mobile number</div>
            <div className=' left-3 text-[14px] font-semibold text-[#000000] absolute top-[10px]'>+ 91 <span className='text-gray-500'>|</span></div>
        </div>
        <div  className=" flex items-center mb-20 justify-center gilroyMedium text-[18px] font-[600] " >
        <button className='px-[82px] py-[10px] flex item-center justify-center gap-4   rounded-[27px]  bg-[#9EE86F] relative active:text-[20px]' onClick={()=>stepHandler()}>
        <span className='text-[#0c2301]  '>Continue</span>
        </button>
    </div>
    </div>
  

    
    </div>
    <div className=' left-0 right-0 bottom-[20px]'>
    <div className=' flex items-center justify-center'>
        <div className='flex items-center justify-center w-[72px] h-[2px] bg-[#1F1F1F] rounded-8'>

        </div>
    </div>
    </div>
    
    
    </Fragment>
  )
}

export default Steptwo