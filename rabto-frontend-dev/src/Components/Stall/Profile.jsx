import React, { Fragment } from 'react';
import { FaArrowLeftLong, FaDownload } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import StallLogo from "../../Assets/Visitors/stallogo.png";
import banner from "../../Assets/Visitors/banner1.png";
import  Minilogo from "../../Assets/Visitors/mini_logo.png";
import  gif from "../../Assets/Visitors/Development purpose.gif";
import Footer from '../../MainComponents/Footer/Footer';

const Profile = () => {
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <Fragment>
      <div className="border max-w-[600px] lg:max-w-[400px] m-auto realtive ">
        <div className='mx-5 min-h-screen pb-5'>
            <div className='flex p-4'>        
               <div className="flex-1 text-left"><Link to="/dashboard"><FaArrowLeft className='text-[20px]' /></Link></div>
               <div className=" text-[12px] text-end text-[#3F3131] gilroyBold" ><span onClick={handlePrint} className='cursor-pointer'><span className='flex items-center text-[15px] gap-3'> <span>E-brochure</span> <FaDownload /> </span></span></div>
            </div>
            <div className='flex items-center justify-center'>
            <div className='w-[100px] h-[100px] rounded-full ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
              <img src={StallLogo} className='w-[100px] h-[100px]  rounded-full' />
            </div>
            </div>
            <div className='flex mt-5 items-center gilroyBold text-[28px] justify-center text-[#162449]'>Archident oralcare </div>
            <div className='flex mt-3 items-center gilroyBold text-[16px] justify-center text-[#3E4152] text-center'>"Transforming smiles with expert care and personalized dental solutions for a healthier, happier you." </div>
             <div className='mt-5 flex items-center justify-center gap-2'>
               <button className='px-4 py-2 bg-[#000000] rounded-[6px] text-white'>Add Contact</button>
               <button className='px-4 py-2 bg-[#000000] rounded-[6px] text-white'>Profile</button>
               <button className='px-4 py-2 bg-[#9EE86F] rounded-[6px] text-[#000000]'>BookMark</button>
             </div>
             <div className="text-[20px] font-bold  gilroyBold mt-10 pt-2 ml-2 text-[#162449]" style={{letterSpacing:"1px"}}>SERVICE / PRODUCT</div>
            <div className='grid grid-cols-4 gap-3 mt-3  pb-10'>
                {
                    [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,].map(item=>
               <div className="col-span-2 m-auto">
                <div className="w-[165px] h-auto pb-1 rounded-[20px] shadow-lg">
                    <div>
                        <img src={banner} className='rounded-t-[20px] object-cover w-[100%] h-[110px]' alt="" />
                       <div className='text-[#162449] font-bold gilroyBold text-[12px] ml-3 m-2'>Braces </div>
                    </div>
                </div>
               </div>
               )
            }
            </div>

        </div>
       
        {/* Footer */}
         <Footer/>
      </div>
    </Fragment>
  )
}

export default Profile