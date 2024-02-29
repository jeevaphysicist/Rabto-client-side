import React, { Fragment, useEffect, useState } from 'react';
import { Swiper , SwiperSlide} from "swiper/react";
import { Navigation  } from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation"
import { FaPen, FaRegImage, FaRegTrashCan, FaSquarePlus } from 'react-icons/fa6';
import { MdDescription, MdOutlineModeEditOutline, MdTitle } from 'react-icons/md';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { CreateEventHandler, DeleteEventHandler, GetuserEventHandler, GetuserServiceHandler, UpdateEventHandler, userid } from '../../APIS/APIs';
import { FaPlus } from 'react-icons/fa';

const Events = ({USER_NAME ,userData}) => {
  const [showModal1,setShowModel1] = useState(false);
  const [isEdit,setIsEdit] = useState(false);
  const [name,setName] = useState("");
  const [date,setDate] = useState("");
  const [eventid,setEventid] = useState("");
  const [events,setEvents] = useState([]);

  const handleModalClose = () => {
    setShowModel1(false); 
  }; 

  useEffect(()=>{
    getEventHandler();   
   },[userData])
 
 const getEventHandler = ()=>{
  GetuserEventHandler(userData._id).then(response=>{
        // console.log("reponse event",response)
        setEvents(response.data);
 
    })
   }

   const UpdateCreateHandler = async (action)=>{
    let data = {
       UserID:userid,
       name:name,
       date:date,
       userName:USER_NAME
    }
    if(action === "CREATE"){
    CreateEventHandler("POST",data).then(response=>{
        // console.log("response",response);
        if(response.isSuccess){ 
        getEventHandler();
        handleModalClose()
      }
    })
    }
    else if(action === "UPDATE"){
        //  console.log("update handler!!")
          data.UserID = userid ;
          data.eventid = eventid;
    UpdateEventHandler("POST",data).then(response=>{
            //  console.log("response",response);
             if(response.isSuccess){ 
              getEventHandler();
              handleModalClose();
             AfterUpdateHandler();

            }
 
         })
    }
 
   }
 
   const DeleteHandler = (item)=>{
    DeleteEventHandler("DELETE",{eventid:item._id}).then(response=>{
      //  console.log("response",response);
       if(response.isSuccess){ 
        getEventHandler();
        handleModalClose();

      }
 
   })
   }
   const AfterUpdateHandler =()=>{
    setIsEdit(false);
    setShowModel1(false);
    setDate("");
    setName("");    
    setEventid("")
   }
 
   const handleEdit = (data)=>{
    // console.log("data",data);
    setIsEdit(true);
    setShowModel1(true);
    setName(data.name);
    setDate(data.date);    
    setEventid(data._id)
   }


  return (
   <Fragment>
         {/* Events */}
         <div className='mt-10 mx-5'>
           <div className='text-[#000000] gilroyBold text-[18px] font-semibold mb-5 flex   items-center'><span className='flex-1 text-left'>Events</span> <span className='text-end text-[20px] active:text-[25px]'>        <div className=' text-right   font-bold'> <button className='bg-[#9EE86F] flex gap-2 text-[16px] active:text-[18px] items-center justify-center rounded-[52px] px-5 py-1 text-[#0F2604] ' onClick={()=>setShowModel1(true)}><FaPlus  className='text-[#1C1B1F]' /> Add</button> </div></span> </div>
           <Swiper
                slidesPerView={1.5}
                spaceBetween={10}
                // navigation={true}
                modules={[Navigation]}
                style={{padding:"10px 10px 20px 0px"}}
                >
                  {
                    events.length > 0 && events.map(item=>                 
                  <SwiperSlide className='w-[220px]' >
                  <div className=' shadow-lg shadow-[#1624494D] py-5 border rounded-[20px] w-[220px] relative' >
                  <button className='absolute top-0 right-0 text-[35px] active:text-[37px] text-white' onClick={()=>{handleEdit(item)}}>
              <MdOutlineModeEditOutline className=' text-[#1624494D]   p-1 rounded-[7px]'/>
              </button>
              <button className='absolute top-0 left-0 text-[30px] active:text-[35px] text-red-500' onClick={()=>DeleteHandler(item)} >
              <FaRegTrashCan className='text-[red] p-1 rounded-[7px]'/>
              </button>
              <div className="flex flex-col items-center justify-center ">
                  <span className='text-[14px] gilroyLight font-semibold'>Events Name</span>
                  <span className='text-[16px] grilroyBold font-bold'>{item.name}</span>
              </div>
              <div className="divide-y my-2 border-[1px] border-[#DADADA]"></div>
              <div className="flex flex-col items-center justify-center ">
                  <span className='text-[14px] gilroyLight font-semibold'>Date</span>
                  <span className='text-[16px] grilroyBold font-bold'>{item.date}</span>
              </div>
           </div>
                  </SwiperSlide>
                    )
                  } 
                  {/* <SwiperSlide className='w-[220px] ' >
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

        { showModal1 ?
    <Fragment>
         <div className='absolute top-0 bottom-0 left-0 right-0  z-10 bg-black opacity-60'></div>
        <div className="absolute left-0 right-0 top-0 bottom-0 z-10 bg-white ">
            <div className=' flex items-center justify-center m-auto  w-[100%] '>
                <div className='w-[100%] h-[90vh] overflow-y-scroll  bg-white ' >
               <div className="sticky z-10 top-0">
               <div className=" flex  w-[100%] py-5 px-5 bg-white ">
                <div className='flex-1 text-left'>
                    <IoMdArrowRoundBack className="text-[25px] font-bold active:text-[35px] " onClick={handleModalClose} />
                </div>
                <div >
                {
                     isEdit ?
                    <button className='text-[#52D22E] cursor-pointer font-bold' onClick={()=>{UpdateCreateHandler("UPDATE")}}>Save</button>
                     :
                    <button className='text-[#52D22E] cursor-pointer font-bold' onClick={()=>{UpdateCreateHandler("CREATE")}}>Add</button>
                  }
                </div>

               </div>
               </div>
               <div className='px-8 flex flex-col gap-5'>
               <div className='font-bold text-[18px] '> Create a Event</div>
               {/* <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><MdTitle className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Event Name<sup className='text-red-500'>*</sup></span> <span className={`text-[10px] font-medium text-end   ${false? "text-red-500":""} `}>( 0 / 100 )</span></div>

                            </div>
                            <div className="w-[100%]">
                              <input value={name} onChange={(e)=>setName(e.target.value)}   type="text" placeholder='Jubiliant Tamil Nadu ' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' />
                            </div>
                          </div> */}
                          {/* <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><BsCalendar2DateFill className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Date<sup className='text-red-500'>*</sup></span> <span className={`text-[10px] font-medium text-end   ${false? "text-red-500":""} `}>( 0 / 100 )</span></div>

                            </div>
                            <div className="w-[100%]">
                              <input value={date} onChange={(e)=>setDate(e.target.value)}   type="text" placeholder='1, 2, 3 - February - 2024' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' />
                            </div>
                          </div> */}
              <div></div>
                          
                                         </div>
              
                             
                </div>
           
            
            </div>
           
         </div>
         </Fragment>
: 
null
}
   </Fragment>
  )
}

export default Events