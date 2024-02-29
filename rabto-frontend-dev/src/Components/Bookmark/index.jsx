import React, { Fragment, useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import c1 from "../../Assets/Visitors/c1.png";
import c2 from "../../Assets/Visitors/c2.png";
import c3 from "../../Assets/Visitors/c3.png";
import c4 from "../../Assets/Visitors/c4.png";
import Footer from '../../MainComponents/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Event_ID, GetVisitorDetailsForEventsHandler, getStallforEventHandler, userid } from '../../APIS/APIs';

const Index = () => {
  const [isSearch,setIsSearch] = useState(false);
  const [query,setQuery] = useState('');
  const [isScanOpen,setIsScanOpen] = useState(false);
  const [isAlert,setIsAlert] = useState(false);
  const [facingMode, setFacingMode] = useState('rear'); 
  const [stalls,setStalls] = useState([]);
  const [visitorEventdata,setVisitorEventData] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
   getstallforevents();
   GetVisitorDetailsHander()
  },[])

  const getstallforevents = ()=>{
   getStallforEventHandler()
   .then(res=>{
     // console.log("response",res.data);
     setStalls(res.data);
   })
  }

  const GetVisitorDetailsHander = ()=>{
   let data = {
     visitorid:userid,
     eventid:Event_ID
   }
   GetVisitorDetailsForEventsHandler("POST",data).then(response=>{
     setVisitorEventData(response.data);
    //  console.log("response",response);
   })
  }

  let filteredArray = [];

if(stalls?.length > 0 && visitorEventdata?.Bookmark )
filteredArray = stalls?.length > 0 && visitorEventdata?.Bookmark.length > 0 &&  stalls?.filter(item => visitorEventdata?.Bookmark.includes(item._id));
// console.log("filterarray",filteredArray);


  return (
    <Fragment>
        <div className='bg-white md:border max-w-[600px] lg:max-w-[400px] m-auto'>
          <div className="m-10 min-h-[80vh]">
          <div className='flex items-center justify-start mt-10'>
             <Link to="/dashboard" className='gilroyMedium flex items-center text-[12px]' > <IoIosArrowBack /> Back To Home</Link>
          </div>
          <div className='poppins flex mt-10 text-[23px] text-[#000000]'>BookMarks </div>
          <div className='mt-3  flex items-center justify-start flex-col gap-2  w-[100%]'>
            {
              filteredArray?.length > 0  && filteredArray.map(item=>
              <Link to={`/stall/${item._id}`} className='flex items-center w-[100%] flex-col'>
             <div className="grid mx-5 grid-cols-7 gap-1 w-[100%]  p-2">
              <div className='text-start flex items-center col-span-6 text-[#162449] text-[14px] gilroyBold' style={{fontWeight:700}}>{item.name}</div>
              <div className='text-start col-span-1 flex items-center text-[#000000] text-[14px] gilroyMedium' style={{fontWeight:400}}>{item.stallNo}</div>
              {/* <div className='text-start col-span-1 flex items-center'><img src={c1} alt="category image" className='w-[30px] h-[30px]' /></div> */}
             </div>

             </Link>)
            }
            
         </div>
          </div>
          <Footer/>
         </div>
    </Fragment>
  )
}

export default Index