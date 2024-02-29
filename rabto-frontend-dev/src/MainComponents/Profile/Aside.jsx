import React, { Fragment, useEffect, useState } from 'react';
import Minilogo from "../../Assets/logonew.png";
import Profileimg from "../../Assets/logonew.png";
import { IoStatsChart } from "react-icons/io5";
import { MdOutlineDashboard, MdOutlineEdit } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Footer from '../Footer/Footer';
import { BsShieldFillCheck } from 'react-icons/bs';
import { FaUserPen } from "react-icons/fa6";
import { MdStorefront } from "react-icons/md";
import { GetuserProfile, USER_NAME, userid } from '../../APIS/APIs';

let responsePayload ;

const asideArray = [
    { path:"userdashboard",Name:"Dashboard" },
    { path:"editprofile/PROFILE",Name:"Edit Profile" },
    { path:"editstall",Name:"Edit Stall" },
    // { path:"dashboard",Name:"Dashboard" },
    ]

    

const Aside = () => {
    const location = useLocation();
  const pathname = location.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
  const token = Cookies.get('mycookie');
     if(token != undefined){
       responsePayload = jwtDecode(token);
    } 
const [user,setUser] = useState(responsePayload || false);
const [userData,setUserData] = useState("")
  
const HandleLogout = ()=>{
    Cookies.remove('mycookie');
    window.location.reload();
}

useEffect(()=>{
  getUserProfile()
},[USER_NAME])

const getUserProfile = async()=>{
  GetuserProfile(USER_NAME).then(response=>{
  // console.log("response",response);
  if(response.isSuccess){
     setUserData(response.data);
  }       
  })
}

// console.log("userData",userData);

  return (
   <Fragment>
       <div className=' absolute h-[100vh] rounded-r-[20px] bg-[#E8E8EE] w-[100%] '>
              <div className='rounded-tr-[20px] px-10 bg-[#E8E8EE] py-3'>
              <div className='h-[70px] my-auto    bottom-0 left-0 right-0 bg-[#E8E8EE]'>
              <div className='flex flex-col items-center justify-center  '>
                    <div className="flex  items-center relative  justify-center px-5 ">
                      <img src={Minilogo} alt='Minilogo' className='w-[77%] my-4' />
                      
                    </div>
                </div>
              </div>
              </div>
              <div className=''>
              <div className='bg-white mt-3 h-[75vh] mx-3  rounded-[20px] py-2'>
              
              <Link to={`/profile/${USER_NAME}`} className='flex items-center justify-start px-5   rounded-r-[20px] gap-1 mt-5'>
              <div className=' relative  w-[50px] h-[50px] rounded-full ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
              <img src={userData?.profilePhoto} className='w-[50px] h-[50px]  rounded-full' />
              </div>
              <div className='gilroyBold text-[24px] text-[#000000] ml-4'>{userData?.displayName?.substring(0,10)}{userData?.displayName?.length > 10  ? "..." : null}</div>
              <BsShieldFillCheck className='text-[#2F80ED]' />
              </Link>

              
              
            
              
              <div className='mt-5 flex flex-col gap-2 relative '>
                <div className='border-b-[1px] border-[#E7E7E7]'></div>
                 {
                  asideArray.map(menu=>
          
                    <Link to={`/${menu.path}`} className='flex gap-5 cursor-pointer  p-2 relative ' >
                     
                    {menu.path === lastSegment ?<div className='h-full w-[7px] absolute -left-[20px] top-0' style={{backgroundColor:"#52D22E"}} ></div> : null }
                     
                     <div className='flex justify-center items-center'>
                     <div className='my-auto'>
                     {menu.path === "userdashboard" ? <MdOutlineDashboard className=' my-auto text-2xl ' /> : null }
                     {menu.path === "editprofile/PROFILE" ? <FaUserPen className=' my-auto text-2xl ' /> : null }
                     {menu.path === "editstall" ? <MdStorefront className=' my-auto text-2xl ' /> : null }
                     {/* {menu.path === "dashboard" ? <span class="relative flex h-3 w-3">
                                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52D22E] opacity-75"></span>
                                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-[#52D22E]"></span>
                                                  </span> : null 
                                                  } */}
                     </div>
                     <div className='my-auto text-xl font-semibold ml-3 '>{menu.Name}</div>
                     <div className='my-auto absolute text-xl font-semibold right-5 mt-1'><IoIosArrowForward/></div>
                     </div>
                     

                    </Link>
                    )}
                     <div className='border-b-[2px] border-[#E7E7E7]'></div>
                      <div className=' absolute  top-[50vh] flex  flex-col gap-0 w-[100%]'>
                     <div className='border-b-[2px] border-[#E7E7E7]'></div>

                        <Link  className='flex gap-5 cursor-pointer w-full  p-2 relative ' >
                              
                          {"logout" === lastSegment ?<div className='h-full w-[7px] absolute -left-[20px] top-0'  ></div> : null }
                            
                            <div className='my-auto'>
                            
                            <HiOutlineLogout className='my-auto text-2xl' onClick={()=>HandleLogout(false)} />
                            </div>
                            <div className='my-auto text-xl font-semibold ' onClick={()=>HandleLogout(false)}>Logout</div>
                            {/* <div className='my-auto absolute text-xl font-semibold right-5'><IoIosArrowForward/></div> */}
                                
                        </Link>
                      </div>                             
                </div>
                
             
              
              </div>
              
              </div>
          </div>
   </Fragment>
  )
}

export default Aside