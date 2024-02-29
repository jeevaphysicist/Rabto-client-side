import React, { Fragment, useEffect, useRef, useState } from 'react';
import ProfileGIF from "../../Assets/Visitors/Development purpose.gif";
import Profileimg from "../../Assets/Visitors/profile.png";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaDribbble, FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FiDribbble } from "react-icons/fi";
import { FaBehance } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { IoMdCall } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { Swiper , SwiperSlide} from "swiper/react";
import { Navigation  } from "swiper/modules";
import Rudra from "../../Assets/Visitors/rudra.png";
import csc from "../../Assets/Visitors/csc.png";
import codingdeaf from "../../Assets/Visitors/codingdeaf.png";
import anna from "../../Assets/Visitors/anna.png";
import Minilogo from "../../Assets/rabtologo.png";
import rudra from "../../Assets/users/rudra.png";
import rkbakery from "../../Assets/users/rkbakery.png";
import dental from "../../Assets/users/dental.png";
import bo from "../../Assets/users/bo.png";
import SaveContact from '../EditProfile/SaveContact';
import whatsapp from "../../Assets/whatsapp.png"
import facebook from "../../Assets/Facebook.png"
import instagram from "../../Assets/Instagram.png"
import website from "../../Assets/WEBSITE.png"
import banner from "../../Assets/yuktijewelsbanner.png"
import profile from "../../Assets/yuktijewelsprofile.png"

import "swiper/css";
import "swiper/css/navigation"
import Aside from './Aside';
import { GetuserProfile ,userid ,USER_NAME, GetuserProductHandler, GetuserServiceHandler, GetuserEventHandler} from '../../APIS/APIs';
import { useParams } from 'react-router-dom';
import Error404 from '../../Components/PageNotFound/Error404';
import Footer from '../Footer/Footer';

const Index = () => {
  const [isAtTop, setIsAtTop] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [userData,setUserData] = useState('');
  const [services,setServices] = useState([]);
  const [products,setProducts] = useState([]);
  const [events,setEvents] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const component = componentRef.current;
      const rect = component.getBoundingClientRect();
      setIsAtTop(rect.top <= 168);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAside = ()=>{
     setIsAsideOpen(!isAsideOpen);
  }

  let { profileUserName } = useParams();

  useEffect(()=>{
   getUserProfile();
 },[profileUserName])
 

const getUserProfile = async()=>{
     GetuserProfile(profileUserName).then(response=>{
   //   console.log("response",response);
     if(response.isSuccess){
        setUserData(response.data);
     }
          
     })
}

const callPhoneNumber = (phoneNumber) => {
   if(phoneNumber)
    window.location.href = `tel:${phoneNumber}`;

 };

 useEffect(()=>{
   if(userData?._id){
   serviceHandler();
   productHandler();
   getEventHandler();
   }
  },[userData])

const serviceHandler = ()=>{
   
   GetuserServiceHandler(userData?._id).then(response=>{
      //  console.log("reponse service",response)
       setServices(response.data);

   })
  }
//   console.log("user profile data ", userData)

  const productHandler = ()=>{
   GetuserProductHandler(userData?._id).then(response=>{
      //  console.log("reponse Product",response)
       setProducts(response.data);

   })
  }

  const getEventHandler = ()=>{
   GetuserEventHandler(userData?._id).then(response=>{
         // console.log("reponse event",response)
         setEvents(response.data);
  
     })
    }

  return (
   <Fragment>
      
   
   
    <Fragment>
      {/* Aside Start */}
         
    
       
      {/* Aside End */}
     

    <div className='min-h-[90vh] m-auto max-w-[600px] lg:max-w-[400px]'>
    <div className='max-w-[600px] lg:max-w-[400px] fixed z-10' >
        <img src={banner} alt="Profile GIF" />
    </div>
    
      {/* <div className={`w-[100%]   fixed z-30   h-[60px] transition-all duration-100 ${isAtTop?" -top-[4px]" :" -top-[64px]"}`}>
      <div className={`w-[100%] p-2  fixed -top-[4px]  z-0 blur-sm bg-[#3E4152] h-[60px] ${isAtTop?" -top-[4px]" :" -top-[64px]"} `}></div>
       <div className='p-2'>
      <IoMenu className='text-white absolute  left-2 font-bold text-[40px]'/>
         
       </div>

    </div> */}
    
    
    <div className='relative z-20 pt-[200px] '>
   {/* {USER_NAME === profileUserName ? <IoMenu className='  text-white fixed top-5 left-2 font-bold text-[40px]' onClick={handleAside} /> : null } */}
      <div ref={componentRef}
       className={`${isAtTop ? "rounded-[0px]" : "rounded-t-[40px]"} transition-all duration-300 bg-white  pb-10 relative `}
       >
        <div className={`${isAtTop ? "rounded-none" : "rounded-t-[40px]" } transition-all duration-300 bg-[#FFFFFF] `}>
         <div className=' relative m-auto  -top-[60px] w-[100px] h-[100px] rounded-full ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
              <img src={profile} className='w-[100px] h-[100px]  rounded-full' />
        </div>
        
        <div className='relative -top-[40px] '>
          <div className="flex items-center font-bold text-[26px] montserrat-font justify-center text-[#000000] relative gap-2 ">YUKTI JEWELS  <BsShieldFillCheck className='text-[#2F80ED]'/> </div>
          <div className="flex items-center font-bold mt-3 text-[16px] gilroyMedium justify-center text-center text-[#3E4152] px-10 mx-5">Exclusive Designer jewel boutique store R S puram</div>
           
        </div>
        </div>
        <div className='grid grid-cols-2 gap-5 relative -top-[10px] '>
           <div className='col-span-1 text-end'><button className='inline-flex  items-center text-[#9EE86F] justify-center border-[2px] h-[48px] bg-[#0F2604] font-bold px-10 py-2 rounded-[50px] text-[16px] active:text-[12px] gap-3 '  onClick={()=>callPhoneNumber(9443744445)}><IoMdCall/> Call</button></div>
           <div className='col-span-1 text-start'>
           <SaveContact 
           name={"Yukti jewels"} 
           phoneNo={"9443744445"}
           notes={" https://www.instagram.com/yuktijewels/?r=nametag , https://www.facebook.com/yuktijewelsofficial/  "} 
           email={"info@yuktijewels.com"}
           website="https://yuktijewels.com/"
           facebook="https://www.facebook.com/yuktijewelsofficial/"
           instagram="https://www.instagram.com/yuktijewels/?r=nametag"
           address="191, EAST SAMBANDHAM ROAD, R.S PURAM, COIMBATORE-641 002" />
            
        </div>
        </div>
        
              
              <Swiper
                slidesPerView={1.45}
                spaceBetween={0}
                modules={[Navigation]}
                style={{padding:"10px 20px 20px 40px",marginTop:"20px"}}
                >
                                    
                  <SwiperSlide className='w-[200px] h-[200px] ' >
                   <a href={`https://wa.me/9443744445`} target='_blank'>
                  <div  className=' shadow-lg relative shadow-[#1624494D]  pl-3 pt-3 pr-4 border rounded-[20px] w-[220px] h-[220px]' >
                     <div className='h-[100px] w-[196px] flex items-center justify-center rounded-[20px] bg-[#90E072] '>
                      <img src={whatsapp} className='w-[80px] h-[80px]  rounded-[20px] object-cover' alt="" />
                     </div>
                     <div className="text-[#162449] mt-2 text-[18px] font-bold gilroyBold py-3 flex items-center justify-center">Whatsapp</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5   '>
                    
                            <div className='flex items-center justify-center py-3 w-[100%]'>
                               <button className='w-[100%]   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                            </div>
                            
                      </div>
                   </div>
                   </a>
                  </SwiperSlide>

                  <SwiperSlide className='w-[200px] h-[200px]' >
                  <a href={`https://instagram.com/yuktijewels?r=nametag`} target='_blank'>
                  <div className=' shadow-lg relative shadow-[#1624494D]  pl-3 pt-3 pr-4 border rounded-[20px] w-[220px] h-[220px]' >
                     <div className='h-[100px] w-[196px] flex items-center justify-center rounded-[20px] bg-[#E85FBE] '>
                      <img src={instagram} className='w-[80px] h-[80px]  rounded-[20px] object-cover' alt="" />
                     </div>
                     <div className="text-[#162449] mt-2 text-[18px] font-bold gilroyBold py-3 flex items-center justify-center">Instagram</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5   '>
                    
                            <div className='flex items-center justify-center py-3 w-[100%]'>
                               <button className='w-[100%]   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                            </div>
                            
                      </div>
                   </div>
                   </a>
                  </SwiperSlide>

                  <SwiperSlide className='w-[200px] h-[200px]' >
                  <a href={`https://www.facebook.com/yuktijewelsofficial/`} target='_blank'>
                  <div className=' shadow-lg relative shadow-[#1624494D]  pl-3 pt-3 pr-4 border rounded-[20px] w-[220px] h-[220px]' >
                     <div className='h-[100px] w-[196px] flex items-center justify-center rounded-[20px] bg-[#316FF6] '>
                      <img src={facebook} className='w-[80px] h-[80px]  rounded-[20px] object-cover' alt="" />
                     </div>
                     <div className="text-[#162449] mt-2 text-[18px] font-bold gilroyBold py-3 flex items-center justify-center">Facebook</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5   '>
                    
                            <div className='flex items-center justify-center py-3 w-[100%]'>
                               <button className='w-[100%]   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                            </div>
                            
                      </div>
                   </div>
                   </a>
                  </SwiperSlide>

                  <SwiperSlide className='w-[200px] h-[200px]' >
                  <a href={`https://yuktijewels.com`} target='_blank'>
                  <div className=' shadow-lg relative shadow-[#1624494D]  pl-3 pt-3 pr-4 border rounded-[20px] w-[220px] h-[220px]' >
                     <div className='h-[100px] w-[196px] flex items-center justify-center rounded-[20px] bg-[#FFA500] '>
                      <img src={website} className='w-[80px] h-[80px]  rounded-[20px] object-cover' alt="" />
                     </div>
                     
                     <div className="text-[#162449] mt-2 text-[18px] font-bold gilroyBold py-3 flex items-center justify-center">Website</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5   '>
                    
                            <div className='flex items-center justify-center py-3 w-[100%]'>
                               <button className='w-[100%]   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                            </div>
                            
                      </div>
                   </div>
                   </a>
                  </SwiperSlide>

                
                    
                 
               </Swiper>
            
        
     
             
     
      </div>
      

    </div>
    <div>

    </div>
    </div>
            {/* Footer */}
          <Footer/>
    </Fragment>
     
    </Fragment>
  )
}

export default Index