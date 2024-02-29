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
import Minilogo from "../../Assets/Visitors/mini_logo.png";
import rudra from "../../Assets/users/rudra.png";
import rkbakery from "../../Assets/users/rkbakery.png";
import dental from "../../Assets/users/dental.png";
import bo from "../../Assets/users/bo.png";
import SaveContact from './SaveContact';
import { RiMenu4Fill } from "react-icons/ri";
import eventLogo from "../../Assets/event_logo.png";
import sp from "../../Assets/Visitors/sp.png";
import sp1 from "../../Assets/Visitors/sp1.png";
import liveevent from "../../Assets/liveevent.png";

import "swiper/css";
import "swiper/css/navigation"
import Aside from './Aside';
import { GetuserProfile ,userid ,USER_NAME, GetuserProductHandler, GetuserServiceHandler, GetuserEventHandler} from '../../APIS/APIs';
import { Link, useParams } from 'react-router-dom';
import Error404 from '../../Components/PageNotFound/Error404';
import Footer from '../Footer/Footer';
import user from "../../APIS/CurrentUser";

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
      setIsAtTop(rect.top <= 148);
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
const LinkAdjustmentsHandler = (link)=>{
   if (!link.startsWith('https://')) {
      return 'https://' + link;
    }
    return link;
}
 
  return (
   <Fragment>
      {
         userData === null ?
         <Error404/>
      :
     <div className='bg-white '>
    <div className='relative m-auto max-w-[600px] lg:max-w-[400px] border'>
      {/* Aside Start */}
         
      <div className={` max-w-[600px] lg:max-w-[400px]  md:flex`}>
          <div className={`fixed ld:static h-[100vh] max-w-[600px] m-auto lg:max-w-[400px] top-0 left-0 bottom-0 right-0 bg-[#000000] opacity-[37%] transition-all  duration-300 ease-in-out   z-40 ${isAsideOpen ? "w-full lg:w-full" : "w-0"}`} onClick={handleAside}></div>
          <div className={`fixed ld:static h-[100vh] max-w-[600px] m-auto lg:max-w-[400px]  top-0 bottom-0 left-0 z-50 lg:z-50 rounded-r-[50px]  bg-white    transition-all duration-500 w-[300px] ease-in-out ${isAsideOpen ? " ml-0  md:w-[300px]" : "md:w-[0px] md:ml-0 -ml-[300px] "}`}>
           <div className={`${isAsideOpen ? "  md:block " : "  md:hidden"}`}>
           <Aside userData={userData} />
           </div>
          </div>
       </div>
       
      {/* Aside End */}
     

    <div className='min-h-[90vh] sm:max-w-[600px] lg:max-w-[400px] '>
    <div className=' w-[100%] lg:max-w-[400px] fixed z-10 ' >
      <div className='w-[100%] h-[210px] '>
        <img src={userData?.banner} alt="Profile GIF" className=' w-[100%] h-[210px] ' />
        {/* {USER_NAME === profileUserName ?<div className='bg-white w-[40px] h-[40px] cursor-pointer rounded-[5px] absolute top-2 pt-1 shadow-lg shadow-[#0E1E25]  left-2'><RiMenu4Fill className='  text-black m-auto  font-bold text-[30px]' onClick={handleAside} /></div>  : null } */}
        </div>
    </div>
    
      {/* <div className={`w-[100%]   fixed z-30   h-[60px] transition-all duration-100 ${isAtTop?" -top-[4px]" :" -top-[64px]"}`}>
      <div className={`w-[100%] p-2  fixed -top-[4px]  z-0 blur-sm bg-[#3E4152] h-[60px] ${isAtTop?" -top-[4px]" :" -top-[64px]"} `}></div>
       <div className='p-2'>
      <IoMenu className='text-white absolute  left-2 font-bold text-[40px]'/>
         
       </div>

    </div> */}
    
    
    <div className='relative max-w-[600px] lg:max-w-[400px] z-20 top-[150px] '>
      <div ref={componentRef}
       className={`${isAtTop ? "rounded-none" : "rounded-t-[40px]"} transition-all duration-300 bg-white min-h-[70vh]  pb-10 relative `}
       >
        <div className={`${isAtTop ? "rounded-none" : "rounded-t-[40px]" } bg-[#F4F4F4] transition-all duration-300 `}>
         <div className=' relative m-auto  -top-[60px] w-[100px] h-[100px] rounded-full bg-[#F4F4F4] ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
              <img src={userData?.profilePhoto} className='w-[100px] h-[100px] object-cover rounded-full bg-[#F4F4F4]' />
              <div className='relative -top-[30px] left-[105px]'><SaveContact name={userData?.displayName} phoneNo={userData?.mobileNo} /></div>
        </div>
        
        <div className='relative -top-[40px] '>
          <div className="flex items-center font-bold text-[24px] gilroyBold justify-center text-[#000000] relative">{userData?.displayName} </div>
          <div className="flex items-center font-bold text-[16px] gilroyMedium justify-center text-center text-[#3E4152] px-4">{userData?.About}</div>
          
           <div className='flex items-center justify-center gap-5 mt-6'>
           {userData?.whatsapp ? <a  href={`https://wa.me/91${userData?.whatsapp}`}
           target="_blank"
           rel="noopener noreferrer"
           ><FaWhatsapp className='text-[28px] text-[#162449]'/> </a> :null}
           {userData?.socialMedia?.instagram && userData?.socialMedia?.instagram.trim()  ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.instagram)}`} target='_blank'><FaInstagram className='text-[28px] text-[#162449]'/> </a> :null}
           {userData?.socialMedia?.facebook && userData?.socialMedia?.facebook.trim()  ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.facebook)}`} target='_blank'><FaFacebookF className='text-[28px] text-[#162449]'/></a>:null}
           {/* {userData?.socialMedia?.dribbble || userData?.socialMedia?.dribbble.trim() ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.dribbble)}`} target='_blank'><FaDribbble className='text-[28px] text-[#162449]'/></a>:null} */}
           {/* {userData?.socialMedia?.behance ||  userData?.socialMedia?.behance.trim() ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.behance)}`} target='_blank'><FaBehance className='text-[28px] text-[#162449]'/></a> :null} */}
           {userData?.socialMedia?.linkedin  && userData?.socialMedia?.linkedin.trim()  ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.linkedin)}`} target='_blank'><FaLinkedinIn className='text-[28px] text-[#162449]'/></a>:null}
           {userData?.socialMedia?.website && userData?.socialMedia?.website.trim()  ? <a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.website)}`} target='_blank'><TbWorld className='text-[28px] text-[#162449]'/></a>:null }
         
           </div>
        </div>
        </div>
        <div className='flex mt-10 items-center justify-center gap-5 '>
           <div className=' text-end'><button className='inline-flex w-[150px]  items-center text-[#9EE86F] justify-center border-[2px] h-[48px] bg-[#0F2604] font-bold px-10 py-2 rounded-[50px] text-[14px] active:text-[12px] gap-3 '  onClick={()=>callPhoneNumber(userData?.mobileNo)}><IoMdCall/> Call</button></div>
           <div className=' text-start'>
           <SaveContact name={userData?.displayName} phoneNo={userData?.mobileNo} />
        </div>
        </div>
        {/* Events */}
        {
         events?.length > 0 ?        
        <div className='mt-10 mx-5'>
           <div className='text-[#000000] gilroyBold text-[18px] font-semibold mb-5'>Events</div>
           <Swiper
                slidesPerView={1.3}
                spaceBetween={10}
                // navigation={true}
                modules={[Navigation]}
                style={{padding:"10px 10px 20px 0px"}}
                >
                  {
                     events?.length > 0 && events.map(item=>                  
                  <SwiperSlide className='w-[220px]' >
                  <div className=' shadow-lg shadow-[#1624494D] py-5 border rounded-[20px] w-[220px]' >
                 <div className='ml-3'>
                     <img src={eventLogo} alt="Event logo..." className='rounded-t-[20px]' />
                      
                 </div>
                 <div className=' mt-3 gilroyBold text-[#162449] flex items-center justify-center text-[16px]' style={{fontWeight:700}}>Jubilant Tamilnadu</div>

                 </div>
                  </SwiperSlide> 
                     )}
                  {/*    <SwiperSlide className='w-[220px] ' >
                  <div className=' shadow-lg shadow-[#1624494D] py-5 border rounded-[20px] w-[220px]' >
              <div className="flex flex-col items-center justify-center ">
                  <span className='text-[14px] gilroyLight font-semibold'>Events Name</span>
                  <span className='text-[16px] grilroyBold font-bold'>JUBILANT TAMILNADU</span>
              </div>
              <div className="divide-y my-2 border-[1px] border-[#DADADA]"></div>
              <div className="flex flex-col items-center justify-center ">
                  <span className='text-[14px] gilroyLight font-semibold'>Date</span>
                  <span className='text-[16px] grilroyBold font-bold'>1,2,3-February -2024</span>
              </div>
           </div>
                  </SwiperSlide>
               <SwiperSlide className='w-[220px] ' >
                  <div className=' shadow-lg shadow-[#1624494D] py-5 border rounded-[20px] w-[220px]' >
              <div className="flex flex-col items-center justify-center ">
                  <span className='text-[14px] gilroyLight font-semibold'>Events Name</span>
                  <span className='text-[16px] grilroyBold font-bold'>JUBILANT TAMILNADU</span>
              </div>
              <div className="divide-y my-2 border-[1px] border-[#DADADA]"></div>
              <div className="flex flex-col items-center justify-center ">
                  <span className='text-[14px] gilroyLight font-semibold'>Date</span>
                  <span className='text-[16px] grilroyBold font-bold'>1,2,3-February -2024</span>
              </div>
           </div>
                  </SwiperSlide>
                  <SwiperSlide className='w-100px ' >
                  <div className=' shadow-lg shadow-[#1624494D] py-5 border rounded-[20px]' >
              <div className="flex flex-col items-center justify-center ">
                  <span className='text-[14px] gilroyLight font-semibold'>Events Name</span>
                  <span className='text-[16px] grilroyBold font-bold'>JUBILANT TAMILNADU</span>
              </div>
              <div className="divide-y my-2 border-[1px] border-[#DADADA]"></div>
              <div className="flex flex-col items-center justify-center ">
                  <span className='text-[14px] gilroyLight font-semibold'>Date</span>
                  <span className='text-[16px] grilroyBold font-bold'>1,2,3-February -2024</span>
              </div>
           </div>
                  </SwiperSlide> */}
            </Swiper>
          

        </div>
        :
        null
        }

         {/* Works */}
         {
         services?.length > 0  ?         
        <div className='mt-10 mx-5'>
           <div className='text-[#000000] gilroyBold text-[18px] font-semibold mb-5'>Services</div>
           <Swiper
                slidesPerView={1.5}
                spaceBetween={10}
                // navigation={true}
                modules={[Navigation]}
                style={{padding:"10px 10px 20px 0px"}}
                >
                  {
                     services.length > 0 && services.map(item=>
                        <SwiperSlide className='h-[250px] w-[200px] ' >
                        <div>
                       <div  className=' shadow-md relative shadow-[#1624494D] pl-[9.5px]    pt-3  border rounded-[20px] h-[250px] w-[220px]' >
                        <div className="flex items-center justify-center rounded-[15px] w-[200px] h-[100px]">
                          <img src={item.coverimage} alt="product image" className='w-[200px]  h-[100px] rounded-[15px]' />
                        </div>
                           
                          <div className="text-[#162449] mt-2 text-[18px] font-bold gilroyBold py-3 flex items-center justify-start">{item.title}</div>
                          <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5   '>
                         
                                 {/* <div className='flex items-center justify-center py-3 w-[100%]'>
                                    <button className='w-[100%] bg-[#9EE86F] rounded-[20px] py-3 gilroyBold text-[#0F2604] text-[13px] '>Download E-brochure </button>
                                 </div> */}
                                 
                           </div>
                        </div>
                        </div>
                       </SwiperSlide>
                     )}
                     
                  {/*  <SwiperSlide className='w-100px h-[350px] ' >
                  <div className='relative shadow-lg shadow-[#1624494D] px-4 py-5 border rounded-[20px] w-[220px] h-[350px]' >
                     <div className='h-[100px] w-[100%]  rounded-[20px] mb-3 '>
                      <img src={csc} className='w-[100%] object-cover' alt="" />
                     </div>
                     <div className="text-[#162449] text-[18px] font-bold gilroyBold py-3">Coimbatore SocialClub</div>
                     <div className="text-[#3E4152] text-[13px] font-bold gilroyBold py-3">Dynamic website</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5 '>
                      <div className='flex items-center justify-center py-3 w-[100%]'>
                         <button className='w-[100%]  bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                      </div>
                      </div>
                   </div>
                  </SwiperSlide> 
                 <SwiperSlide className='w-100px h-[350px]' >
                  <div className='relative shadow-lg shadow-[#1624494D] px-4 py-5 border rounded-[20px] w-[220px] h-[350px]' >
                     <div className='h-[100px] w-[100%]  rounded-[20px] mb-3 '>
                      <img src={anna} className='w-[100%] object-cover' alt="" />
                     </div>
                     <div className="text-[#162449] text-[18px] font-bold gilroyBold py-3">Annalakshmi</div>
                     <div className="text-[#3E4152] text-[13px] font-bold gilroyBold py-3">Dynamic site with reservation module</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5 '>
                      <div className='flex items-center justify-center py-3 w-[100%]'>
                         <button className='w-[100%]   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                      </div>
                      </div>
                   </div>
                  </SwiperSlide> 
                  <SwiperSlide className='w-100px h-[350px] ' >
                  <div className='relative shadow-lg shadow-[#1624494D] px-4 py-5 border rounded-[20px] w-[220px] h-[350px]' >
                     <div className='h-[100px] w-[100%]  rounded-[20px] mb-3 '>
                      <img src={codingdeaf} className='w-[100%] object-cover' alt="" />
                     </div>
                     <div className="text-[#162449] text-[18px] font-bold gilroyBold py-3">Code for Deaf</div>
                     <div className="text-[#3E4152] text-[13px] font-bold gilroyBold py-3">Dynamic website</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5 '>
                      <div className='flex items-center justify-center py-3 w-[100%]'>
                         <button className='w-[100%]    bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                      </div>
                      </div>
                   </div>
                  </SwiperSlide>  */}
                  
            </Swiper>
          

        </div>
        :
        null
        }
        
         {/* Brand Ideas */}
         {
            products?.length > 0 ?         
        <div className='mt-10 mx-5'>
         <div className='text-[#000000] gilroyBold text-[18px] font-semibold mb-5'>Products</div>
           <Swiper
                slidesPerView={1.5}
                spaceBetween={10}
                // navigation={true}
                modules={[Navigation]}
                style={{padding:"10px 10px 20px 0px"}}
                >
                  {
                     products.length > 0 && products.map(item=>
                  
                        <SwiperSlide className='h-[250px] w-[200px] ' >
                        <div>
                       <div  className=' shadow-md relative shadow-[#1624494D] pl-[9.5px]    pt-3  border rounded-[20px] h-[250px] w-[220px]' >
                        <div className="flex  items-center justify-center rounded-[15px] w-[200px] h-[100px]">
                          <img src={item.coverimage} alt="product image" className='w-[200px]  h-[100px] rounded-[15px]' />
                        </div>
                           
                          <div className="text-[#162449] mt-2 text-[18px] font-bold gilroyBold py-3 flex items-center justify-start">{item.title}</div>
                          <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5   '>
                         
                                 {/* <div className='flex items-center justify-center py-3 w-[100%]'>
                                    <button className='w-[100%] bg-[#9EE86F] rounded-[20px] py-3 gilroyBold text-[#0F2604] text-[13px] '>Download E-brochure </button>
                                 </div> */}
                                 
                           </div>
                        </div>
                        </div>
                       </SwiperSlide>
                     )}
                  {/* <SwiperSlide className='w-100px h-[350px] ' >
                  <div className=' relative shadow-lg shadow-[#1624494D] px-4 py-5 border rounded-[20px] w-[220px] h-[350px]' >
                     <div className='h-[100px] w-[100%]  rounded-[20px] mb-3 '>
                      <img src={dental} className='w-[100%] object-cover' alt="" />
                     </div>
                     <div className="text-[#162449] text-[18px] font-bold gilroyBold py-3">Archident Oral Care</div>
                     <div className="text-[#3E4152] text-[13px] font-bold gilroyBold py-3">Logo Design and Branding Visual Identity</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5 '>
                      <div className='flex items-center justify-center py-3 w-[100%]'>
                         <button className='w-[100%] m-auto   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                      </div>
                      </div>
                   </div>
                  </SwiperSlide> 
                  <SwiperSlide className='w-100px h-[350px]' >
                  <div className=' relative shadow-lg shadow-[#1624494D] px-4 py-5 border rounded-[20px] w-[220px] h-[350px]' >
                     <div className='h-[100px] w-[100%]  rounded-[20px] mb-3 '>
                      <img src={bo} className='w-[100%] object-cover' alt="Bogasri Organics" />
                     </div>
                     <div className="text-[#162449] text-[18px] font-bold gilroyBold py-3">Bogasri Organics</div>
                     <div className="text-[#3E4152] text-[13px] font-bold gilroyBold py-3">Logo Design , Branding and Package design</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5 '>
                      <div className='flex items-center justify-center py-3 w-[100%]'>
                         <button className='w-[100%]   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                      </div>
                      </div>
                   </div>
                  </SwiperSlide> 
                  <SwiperSlide className='w-100px h-[350px] ' >
                  <div className=' relative shadow-lg shadow-[#1624494D] px-4 py-5 border rounded-[20px] w-[220px] h-[350px]' >
                     <div className='h-[100px] w-[100%]  rounded-[20px] mb-3 '>
                      <img src={rudra} className='w-[100%] object-cover' alt="Rudra Cycles" />
                     </div>
                     <div className="text-[#162449] text-[18px] font-bold gilroyBold py-3">Rudra Cycles</div>
                     <div className="text-[#3E4152] text-[13px] font-bold gilroyBold py-3">Branding and AD design</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5 '>
                      <div className='flex items-center justify-center py-3 w-[100%]'>
                         <button className='w-[100%]  bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                      </div>
                      </div>
                   </div>
                  </SwiperSlide>  */}
                  
            </Swiper>
          

        </div>
        :
        null
        }
     
             
     
      </div>
     <Footer/>     

      

    </div>
    <div>
    </div>
    </div>

    {/* Footer */}
           
    </div>
    </div>
      }
       <div className='shawdow-lg'>
      <Link to="/dashboard" className='fixed bottom-10 right-5 h-[50px] w-[50px] rounded-full z-50 bg-[white] shawdow-lg shadow-[#52D22E] animate-pulse border-[5px] border-[#52D22E]'>
          <img src={liveevent} alt="" className='rounded-full h-[40px] w-[50px]' />
      </Link>
      </div>
    </Fragment>
  )
}

export default Index