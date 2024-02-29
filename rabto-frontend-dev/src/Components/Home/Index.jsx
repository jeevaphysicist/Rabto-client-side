import React, { Fragment, useEffect, useState } from 'react';
import c1 from "../../Assets/Visitors/c1.png";
import c2 from "../../Assets/Visitors/c2.png";
import c3 from "../../Assets/Visitors/c3.png";
import c4 from "../../Assets/Visitors/c4.png";
import slogo1 from "../../Assets/Visitors/slogo1.png";
import slogo2 from "../../Assets/Visitors/slogo2.png";
import slogo3 from "../../Assets/Visitors/slogo3.png";
import slogo4 from "../../Assets/Visitors/slogo4.png";
import Banner1 from "../../Assets/Visitors/banner1.png";
import Banner2 from "../../Assets/Visitors/banner2.png";
import Minilogo from "../../Assets/Visitors/mini_logo.png";
import { Swiper , SwiperSlide} from "swiper/react";
import { Navigation  } from "swiper/modules";
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
// import c1 from "../../Assets/Visitors/c1.png";

import "swiper/css";
import "swiper/css/navigation"
import Search from './Search';
import Loading from '../Loading/Loading';
import { BsQrCodeScan } from "react-icons/bs";
import { IoClose, IoPerson } from "react-icons/io5";
import { MdOutlineCameraswitch } from "react-icons/md";
import QrReader from 'react-qr-scanner';
import { useNavigate } from "react-router-dom"
import Footer from '../../MainComponents/Footer/Footer';
import Aside from '../../MainComponents/Profile/Aside';
import SQC from "../../Assets/sqc.png";
import { Event_ID, GetVisitorDetailsForEventsHandler, USER_NAME, getStallforEventHandler, userid } from '../../APIS/APIs';
import Html5QrcodePlugin from '../QRScanner/QRscanner';
import {user} from "../../APIS/CurrentUser";

const previewStyle = {
  height: 240,
  width: 320,
  borderRadius:'20px',
}

const Index = () => {
  // console.log("users details",user)

   const [isSearch,setIsSearch] = useState(false);
   const [query,setQuery] = useState('');
   const [isScanOpen,setIsScanOpen] = useState(false);
   const [isAlert,setIsAlert] = useState(false);
   const [facingMode, setFacingMode] = useState('rear'); 
   const [stalls,setStalls] = useState([]);
   const [filterStalls,setFilterStalls] = useState([]);
   const [visitorEventdata,setVisitorEventData] = useState('');
   const [recentvisits,setRecentVisits] = useState([]);
   const navigate = useNavigate();
   const [filter,setFilter] = useState({
        query:"",
        category:""
   })

   useEffect(()=>{
    getstallforevents();
    GetVisitorDetailsHander()
   },[])

   const getstallforevents = ()=>{
    getStallforEventHandler()
    .then(res=>{
      // console.log("response",res.data);
      setStalls(res.data);
      setFilterStalls(res.data)
    })
   }

   const GetVisitorDetailsHander = ()=>{
    let data = {
      visitorid:userid,
      eventid:Event_ID
    }
    GetVisitorDetailsForEventsHandler("POST",data).then(response=>{
      setVisitorEventData(response.data);
      setRecentVisits(response.data.RecentVisits);
      // console.log("response vistoe event response",response);
    })
   }
  //  console.log("Recent stall Visits",recentvisits);


   
   

   const switchCamera = () => {
    // console.log("swith camer",facingMode);
    setFacingMode((prevFacingMode) =>
    prevFacingMode === 'front' ? 'rear' : 'front'
    );
  };
 
function filterArrayInVisitOrder(filteredArray, recentVisit) {
  const resultArray = [];
  recentVisit.forEach(id => {
      const foundObject = filteredArray.find(obj => obj._id === id);
      if (foundObject) {
          resultArray.push(foundObject);
      }
  });
  return resultArray;
}

let filteredArray = [];
if(stalls?.length > 0 && recentvisits?.length > 0){
 filteredArray = stalls?.length > 0 && recentvisits.length > 0 &&    stalls.filter(item => recentvisits.includes(item._id));
 filteredArray =filterArrayInVisitOrder(filteredArray , recentvisits);
}
// console.log("filterarray",filteredArray);

const QueryOnChangeHandler = (e)=>{
  setFilter(prev => ({ ...prev, query: e.target.value }));
}

const filterStallHandler = () => {
  let filterdata = stalls; // Assuming stalls is your original array
  //  console.log("filter data",filterdata);
  if (filterdata.length > 0) {
    if (filter.query) {
      // console.log("query", filter.query);
      filterdata = filterdata.filter(item => item.name.toLowerCase().includes(filter.query.toLowerCase()));
    }      
    // if (filter.category) {
    //   console.log("query", filter.category);

    //   filterdata = filterdata.filter(item => item.category.toLowerCase().includes(filter.category.toLowerCase()));
    // }
  }

  setFilterStalls(filterdata);
};

useEffect(() => {
  filterStallHandler();
}, [filter]);


return (
   
    <Fragment>
      <div className="border max-w-[600px] lg:max-w-[400px] m-auto relative">
      <div className="min-h-screen">
         <div className='mx-5 '>
          <div className='grid grid-cols-4'>
             <div className="text-[20px] font-bold mt-10 poppins pt-2 ml-2 col-span-3 flex items-start justify-start" style={{letterSpacing:"1px"}}>JUBILANT TAMILNADU</div>
             {/* <div className="text-[20px] font-bold mt-10 vvdsfifties pt-2 col-span-1  flex items-start justify-end" style={{letterSpacing:"1px"}}><BsQrCodeScan className='text-end' onClick={()=>setIsScanOpen(true)} /></div> */}
             <div className="text-[20px] font-bold mt-10 Poppins pt-2 col-span-1  flex items-start justify-end" style={{letterSpacing:"1px"}}>
               <Link to={`/profile/${user.userName}`} className="w-[30px] h-[30px] p-[5px] text-[15px] bg-gray-300 rounded-full flex items-center justify-center"><IoPerson /></Link>
             </div>
          </div>
             <input type="text" value={filter.query} placeholder=' Search Stall Name ' className='border-none gilroyLight p-5 rounded-[10px] bg-[#F1F0F5] mt-3 h-[50px] w-[100%]' onChange={QueryOnChangeHandler} />
              
         </div>
         <div>
         {/* <div className=' fixed z-50  bottom-5 right-5 flex items-center justify-center bg-[#9EE86F] h-[90px] w-[90px] rounded-full' onClick={()=>setIsScanOpen(true)}> */}
            {/* <div className='fixed top-5 right-5 text-white text-[50px] font-bold flex gap-10'><MdOutlineCameraswitch onClick={switchCamera} /> <IoClose onClick={()=>{setIsScanOpen(false)}}/></div> */}
             {/* <div className="text-[40px] font-bold   col-span-1  flex items-center justify-center" ><BsQrCodeScan className='text-end' onClick={()=>setIsScanOpen(true)} /></div> */}

         {/* </div> */}
         </div>
         
         {
          isScanOpen ?
          <div className=' fixed z-50 top-0 bottom-0 left-0 right-0 bg-black flex items-center justify-center'>
            <div className='fixed top-5 right-5 text-white text-[50px] font-bold flex gap-10'><MdOutlineCameraswitch onClick={switchCamera} /> <IoClose onClick={()=>{setIsScanOpen(false)}}/></div>
          {/* <QrReader
          delay={100}
          style={previewStyle}
          onError={handleError}
          facingMode="environment"
          onScan={handleScan}
          /> */}
           <div style={{ display: isScanOpen ? 'block' : 'none' }}>
           {/* <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
                isScanOpen={isScanOpen}
                verbose={true}
                qrCodeErrorCallback={qrCodeErrorCallback}
            /> */}
          </div>
          </div>
          :
          null
         }
         {/* {
          query ?
          <Search/>
         : */}
         <Fragment>
            {/* Category */}
            {/* <div className='mx-8 mt-5 relative '>        
              <IoIosArrowDown className=" absolute top-4 z-10 right-5 text-[#313144] text-[20px]" />
          
            <select value={filter.category} onChange={(e)=>{setFilter(prev => ({ ...prev, category: e.target.value }));}}  className='w-[100%] appearance-none rounded-[8px] px-5 relative h-[50px] border-[1.3px] border-[#B8BBC2]' >
              <option value=''>-- See an stalls  by Category --</option>
              <option value='Industrial'>Industrial</option>
              <option value='Manufacturers'>Manufacturers</option>
              <option value='Commercial'>Commercial</option>
              <option value='Retail'>Retail</option>
              <option value='MediaIT'>Media & IT</option>
              <option value='Evironmental Services'>Evironmental Services</option>
            </select>
          </div> */}


            <div className="mx-5 ">
         <div className=" text-[20px] font-bold mt-5 poppins ml-2" style={{letterSpacing:"0.54px",fontWeight:400}}> RECENT VISITS </div>
         </div>

         <div className='mt-3 px-5 flex items-center justify-start flex-col gap-2  w-[100%]'>
           {
            filteredArray?.length > 0 ? filteredArray.map(item=>
              <Link to={`/stall/${item._id}`} className='flex items-center w-[100%] flex-col'>
              <div className="grid mx-5 grid-cols-7 gap-1 w-[100%]  p-2">
               <div className='text-start flex items-center col-span-6 text-[#162449] text-[14px] gilroyBold' style={{fontWeight:700}}>{item.name}</div>
               <div className='text-start col-span-1 flex items-center text-[#000000] text-[14px] gilroyMedium' style={{fontWeight:400}}>{item.stallNo}</div>
               {/* <div className='text-start col-span-1 flex items-center'><img src={c1} alt="category image" className='w-[30px] h-[30px]' /></div> */}
              </div>
              <div className='border divide-y-[1px] w-[100%] border-[#EAEAEA]'></div>
 
              </Link>) 
              :
              <div>No Recent stall Visits</div>
           }
          

            
          

         </div>

         {/* <div className="mx-5">
         <div className=" text-[20px] font-bold mt-3 vvdsfifties ml-2" style={{letterSpacing:"1px"}}> CATEGORIES </div>
         </div> */}
         
       

            {/* Category */}
           
             {/* <div className='mt-3 '>
              <Swiper
                slidesPerView={2.8}
                spaceBetween={2}
                modules={[Navigation]}
                style={{padding:"0 20px 0 20px"}}
                >
                  <SwiperSlide className='w-100px ' >
                  <div className='w-[110px] relative h-[120px]  rounded-tr-[50px] rounded-[20px] '>
                  <div className='bg-[#FFFCE3] z-0 absolute w-[100%] h-[100%] rounded-tr-[50px] rounded-[20px]  '></div>
                   <div className='z-10 absolute w-[100%] h-[100%] rounded-tr-[60px] rounded-[20px] p-5'>
                   <div className='flex gap-5 flex-col'>
                    <div className='flex items-start justify-start'>
                    <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full border-2 border-[#FFFCE3]'>
                        <img src={c1} className='w-[30px] h-[30px] object-cover rounded-full' alt="Health" />
                    </div>
                    </div>
                    <div className='text-[#000000] text-[14px] gilroyBold font-bold  ml-[10px]'>Health</div>

                   </div>
                   </div>
                </div>
                  </SwiperSlide>
                  <SwiperSlide className='w-100px'>
                  <div className='w-[110px] relative h-[120px]  rounded-tr-[50px] rounded-[20px] '>
                  <div className='bg-[#E9FFE3] z-0 absolute w-[100%] h-[100%] rounded-tr-[60px] rounded-[20px]  '></div>
                   <div className='z-10 absolute w-[100%] h-[100%] rounded-tr-[50px] rounded-[20px] p-5'>
                   <div className='flex gap-5 flex-col'>
                    <div className='flex items-start justify-start'>
                    <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full border-2 border-[#E9FFE3]'>
                        <img src={c2} className='w-[30px] h-[30px] object-cover rounded-full' alt="Agriculture" />
                    </div>
                    </div>
                    <div className='text-[#000000] text-[14px] gilroyBold font-bold  ml-[10px]'>Agriculture</div>

                   </div>
                   </div>
                </div>
                  </SwiperSlide>
                  <SwiperSlide className='w-100px'>
                  <div className='w-[110px] relative h-[120px]  rounded-tr-[50px] rounded-[20px] '>
                  <div className='bg-[#E3E6FF] z-0 absolute w-[100%] h-[100%] rounded-tr-[60px] rounded-[20px]  '></div>
                   <div className='z-10 absolute w-[100%] h-[100%] rounded-tr-[50px] rounded-[20px] p-5'>
                   <div className='flex gap-5 flex-col'>
                    <div className='flex items-start justify-start'>
                    <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full border-2 border-[#E3E6FF]'>
                        <img src={c3} className='w-[30px] h-[30px] object-cover rounded-full' alt="EduTech" />
                    </div>
                    </div>
                    <div className='text-[#000000] text-[14px] gilroyBold font-bold  ml-[10px]'>EduTech</div>

                   </div>
                   </div>
                </div>
                  </SwiperSlide>
                  <SwiperSlide className='w-100px '>
                  <div className='w-[110px] relative h-[120px]  rounded-tr-[50px] rounded-[20px] '>
                  <div className='bg-[#FFD9F1] z-0 absolute w-[100%] h-[100%] rounded-tr-[60px] rounded-[20px]  '></div>
                   <div className='z-10 absolute w-[100%] h-[100%] rounded-tr-[50px] rounded-[20px] p-5'>
                   <div className='flex gap-5 flex-col'>
                    <div className='flex items-start justify-start'>
                    <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full border-2 border-[#FFD9F1]'>
                        <img src={c4} className='w-[30px] h-[30px] object-cover rounded-full' alt="Industry" />
                    </div>
                    </div>
                    <div className='text-[#000000] text-[14px] gilroyBold font-bold  ml-[10px]'>Industry</div>

                   </div>
                   </div>
                </div>
                  </SwiperSlide>
                 
                </Swiper>
                
              </div> */}
          {/* Banner */}
              {/* <div className='mt-5 '>
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                modules={[Navigation]}
                style={{padding:"0 20px 0 20px"}}
                >
                  <SwiperSlide className='w-[100%] ' >
                  <div className='w-[100%] rounded-[20px]'>
                   <img src={Banner1} className='w-[100%]' alt='Intersection 2@2x'/>
                   </div>
                  </SwiperSlide>
                  <SwiperSlide className='w-[100%] ' >
                  <div className='w-[100%]'>
                   <img src={Banner2} className='w-[100%]' alt='Intersection 2@2x'/>
                   </div>
                  </SwiperSlide>
                 
                </Swiper>
                
              </div> */}
          {/* Stall list */}
              <div className='mt-3 mx-5 '>
                 <div className='flex sticky bg-white z-10 top-0 py-3'>
                 <div className="flex-1 text-left text-[20px] font-bold mt-3 poppins ml-2" style={{letterSpacing:"1px"}}> LIST OF STALLS </div>
                  <Link to="/bookmark" className='felx-1 text-right px-4    py-4  rounded-[100px] text-[12px] bg-[#9EE86F] gilroyBold text-[#000000]'>View Bookmarks</Link>
                 </div>
                 <div className='mt-1 divide-y-2 border-t border-[#EAEAEA]'></div>
                 <div className='my-3 max-h-[100vh] pb-[60px] overflow-y-scroll'>
                 
                 {
                  filterStalls?.length > 0 && filterStalls.map(item=>
                  <div className='grid grid-cols-1 '>
                     {/* <div onClick={()=>setIsAlert(true)} className='p-4 mt-3 relative grid grid-cols-6 gap-[10px] shadow-md shadow-[#00000008] rounded-[16px]' > */}
                     <div className='p-4 mt-3 relative grid grid-cols-6 gap-[10px] shadow-md shadow-[#00000008] rounded-[16px]' >
                      
                      {/* {visitorEventdata?.StallID && isIDPresent(item._id , visitorEventdata?.StallID) ? <>
                        <Link to={`/stall/${item._id}`} className='absolute bg-transparent top-0 bottom-0 left-0 right-0 rounded-[16px] opacity-5'></Link> 
                      <div className='absolute left-0 top-5 w-[4px] h-[50px] bg-[#0F2604]'></div> 
                      </>
                         :
                      null} */}
                       <Link to={`/stall/${item._id}`} className='absolute bg-transparent top-0 bottom-0 left-0 right-0 rounded-[16px] opacity-5'></Link> 
                      {/* <div className='absolute left-0 top-5 w-[4px] h-[50px] bg-[#0F2604]'></div>  */}
                        <div className="col-span-1 m-auto " >
                          <div className='w-[35px] h-[35px] rounded-full'>
                          <img src={item.coverimage} className='w-[35px] h-[35px] rounded-full' />
                          </div>
                        </div>
                        <div className="col-span-4 ">
                          <div className="flex flex-col">
                            <div className="gilroyBold text-[16px] text-left">{item.name}</div>
                            {/* <div className="gilroyLight text-[14px] text-left">{item.description}</div> */}
                          </div>
                        </div>
                        <div className="col-span-1 m-auto gilroyBold">{item.stallNo}</div>
                        {/* <div className="col-span-1 m-auto">
                        <div className='w-[35px] h-[35px] rounded-full'>
                          <img src={c1} className='w-[35px] h-[35px] rounded-full ' />
                          </div>
                        </div> */}
                     </div>
                     {/* <div onClick={()=>setIsAlert(true)} className='p-4 mt-3 relative grid grid-cols-6 gap-[10px] shadow-md shadow-[#00000008] rounded-[16px]' >
                     {false ? <Link to="/stallprofile" className='absolute bg-transparent top-0 bottom-0 left-0 right-0 rounded-[16px] opacity-5'></Link> : null }
                         
                        <div className="col-span-1 m-auto">
                          <div className='w-[35px] h-[35px] rounded-full'>
                          <img src={slogo2} className='w-[35px] h-[35px] rounded-full' />
                          </div>
                        </div>
                        <div className="col-span-3 ">
                          <div className="flex flex-col">
                            <div className="gilroyBold text-left text-[16px]"> SN Exports</div>
                            <div className="gilroyLight text-left text-[14px] ">Coir Products</div>
                          </div>
                        </div>
                        <div className="col-span-1 m-auto gilroyBold">22</div>
                        <div className="col-span-1 m-auto">
                        <div className='w-[35px] h-[35px] rounded-full'>
                          <img src={c2} className='w-[35px] h-[35px] rounded-full ' />
                          </div>
                        </div>
                     </div>
                     <div onClick={()=>setIsAlert(true)} className='p-4 mt-3 relative grid grid-cols-6 gap-[10px] shadow-md shadow-[#00000008] rounded-[16px]' >
                     {false ? <Link to="/stallprofile" className='absolute bg-transparent top-0 bottom-0 left-0 right-0 rounded-[16px] opacity-5'></Link> : null }
                         
                        <div className="col-span-1 m-auto">
                          <div className='w-[35px] h-[35px] rounded-full'>
                          <img src={slogo3} className='w-[35px] h-[35px] rounded-full' />
                          </div>
                        </div>
                        <div className="col-span-3 ">
                          <div className="flex flex-col">
                            <div className="gilroyBold text-[16px] text-left">Class plus</div>
                            <div className="gilroyLight text-[14px] text-left">Edutech</div>
                          </div>
                        </div>
                        <div className="col-span-1 m-auto gilroyBold">23</div>
                        <div className="col-span-1 m-auto">
                        <div className='w-[35px] h-[35px] rounded-full'>
                          <img src={c3} className='w-[35px] h-[35px] rounded-full ' />
                          </div>
                        </div>
                     </div>
                     <div onClick={()=>setIsAlert(true)} className='p-4 mt-3 relative grid grid-cols-6 gap-[10px] shadow-md shadow-[#00000008] rounded-[16px]' >
                     {false ? <Link to="/stallprofile" className='absolute bg-transparent top-0 bottom-0 left-0 right-0 rounded-[16px] opacity-5'></Link> : null }
                        <div className="col-span-1 m-auto">
                          <div className='w-[35px] h-[35px] rounded-full'>
                          <img src={slogo4} className='w-[35px] h-[35px] rounded-full' />
                          </div>
                        </div>
                        <div className="col-span-3 ">
                          <div className="flex flex-col">
                            <div className="gilroyBold text-left text-[16px]"> ELGI Equipments</div>
                            <div className="gilroyLight text-left text-[14px] ">Industrial </div>
                          </div>
                        </div>
                        <div className="col-span-1 m-auto gilroyBold">24</div>
                        <div className="col-span-1 m-auto">
                        <div className='w-[35px] h-[35px] rounded-full'>
                          <img src={c4} className='w-[35px] h-[35px] rounded-full ' />
                          </div>
                        </div>
                     </div> */}
                     
                     
                   </div>
                  )}
                  </div>
              </div>
          {/* Footer */}
             <Footer/>

          <div className={` max-w-[600px]  lg:max-w-[400px]  md:flex`}>
          <div className={`fixed  top-0 left-0 bottom-0 right-0 bg-[#000000] opacity-[37%]    z-50 ${isAlert ? "w-full  h-full" : "w-0"}`} onClick={()=>setIsAlert(false)} ></div>
          <div className={`fixed  p-5 bottom-0  right-0 left-0 z-50 lg:z-50 rounded-[50px]  bg-white m-auto   transition-all duration-500   ease-in-out ${isAlert ? " top-[0vh] h-[300px] w-[300px] " : " top-[110vh] h-[0px]  w-[300px] "}`}>
               <div className={`${isAlert ? "block delay-150" : "hidden"}`}>
                <div className='flex items-center justify-center w-[100%]'><img src={SQC} alt=" scanning qr code" /></div>
               <div className='flex items-center justify-center  mt-10 gilroyBold text-[#000000] text-[16px] text-center' style={{fontWeight:600}}>“You're in the networking session, so go explore the stalls to unlock the profile”.</div>
               </div>
           </div>
       </div>
              
         </Fragment>
         {/* } */}
            </div>  

      </div>
    </Fragment>
  )
}

export default Index