import React, { Fragment, useEffect, useState } from 'react';
import Minilogo from "../../Assets/Visitors/mini_logo.png";
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import {NewEventTemparyAPIForGifts, NewEventTemparyAPIForVisitors, USER_NAME} from "../../APIS/APIs"
import JubiliantTamilnadu from "../../Assets/users/JT.png";
import { Swiper , SwiperSlide} from "swiper/react";
import { Navigation  } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"
import Footer from '../Footer/Footer';
import { RiMenu4Fill } from 'react-icons/ri';
import Aside from '../Profile/Aside';

const EventIndex = () => {
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const [gifts,setGifts] = useState([]);
    const [visitors,setVisitors] = useState([]);

    const handleAside = ()=>{
        setIsAsideOpen(!isAsideOpen);
     }  

    useEffect(()=>{
            let data = {};
            GetGiftsHandler(data);
            GetVisitorsHandler(data);
    },[])

    const GetGiftsHandler = (data) =>{        
        NewEventTemparyAPIForGifts('POST',data).then(response=>{
           console.log("Response",response);
        })
    }

    const GetVisitorsHandler = (data) =>{
        NewEventTemparyAPIForVisitors('POST',data).then(response=>{
            console.log("Response",response);
        })
    }

  return (
   <Fragment>
    <div className='max-w-[600px] lg:max-w-[400px] relative border m-auto'>
        {/* Aside Start */}
         
      <div className={` max-w-[600px] lg:max-w-[400px]  md:flex`}>
          <div className={`fixed ld:static top-0 left-0 bottom-0 right-0 bg-[#000000] opacity-[37%] transition-all duration-300 ease-in-out   z-40 ${isAsideOpen ? "w-full lg:w-full" : "w-0"}`} onClick={handleAside}></div>
          <div className={`fixed ld:static h-[100vh]  top-0 bottom-0 left-0 z-50 lg:z-50 rounded-r-[50px]  bg-white   transition-all duration-500 w-[300px] ease-in-out ${isAsideOpen ? " ml-0  md:w-[300px]" : "md:w-[0px] md:ml-0 -ml-[300px] "}`}>
           <div className={`${isAsideOpen ? "  md:block " : "md:hidden"}`}>
           <Aside />
           </div>
          </div>
       </div>
       
      {/* Aside End */}
        <div className=' min-h-[93vh] '>
            <div className='sticky top-0 left-0 z-10 right-0 bg-white'>
            <div className='mx-5 flex p-4'>        
            {USER_NAME  ?<div className='bg-white w-[40px] h-[40px] cursor-pointer rounded-[5px] absolute top-2 pt-1 shadow-md shadow-[#0E1E25]  left-2'><RiMenu4Fill className='  text-black m-auto  font-bold text-[30px]' onClick={handleAside} /></div>  : null }
            </div>
            <div className=' mx-5 text-[#000000] flex items-center justify-center mb-5 p-4 gilroybold font-bold text-[20px]'> 
              Dashboard
             </div>
             <div className=' divide-y-2 border-[1px] border-[#C8C8C8] '></div>
            </div>

        {/* Gift  */}
        <div className='mt-10 mx-5'>
           <div className='text-[#000000] gilroyBold text-[18px] font-semibold mb-5'>Gifts</div>
           <div className="grid grid-cols-1 px-2 py-4 rounded-[10px] gap-2" style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
             <div>Name</div>
             <div>Rabto98986</div>
           </div>
        </div>

         {/*  Visitors  */}
         <div className='mt-10 mx-5'>
           <div className='text-[#000000] gilroyBold text-[18px] font-semibold mb-5'>Visitors</div>
           <div className="grid grid-cols-1 px-2 py-4 rounded-[10px] gap-2" style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
             <div>Name</div>
             <div>Rabto98986</div>
           </div>
        </div>

          
        

      
        </div>
{/* Footer  */}
       <Footer/>
       </div>
   </Fragment>
  )
}

export default EventIndex