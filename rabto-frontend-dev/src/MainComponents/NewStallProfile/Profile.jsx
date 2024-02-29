import React, { Fragment, useEffect, useState, useSyncExternalStore } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import Footer from '../Footer/Footer';
import categoryimg from "../../Assets/Visitors/c4.png";
import sp from "../../Assets/Visitors/sp.png";
import { Swiper , SwiperSlide} from "swiper/react";
import { Navigation  } from "swiper/modules";
import sp1 from "../../Assets/Visitors/sp1.png";
import { BookMarkAStallHandler, Event_ID , GetStallBYIDHandler, GetuserProfile, GetuserStallHandler, ScannedUserStallCreate, ScannedVisitorStallCreate, USER_NAME, getStallServiesORProductsHandler, userid  } from "../../APIS/APIs";
import { Link, useParams  } from 'react-router-dom';

import "swiper/css";
import "swiper/css/navigation";
import AddContact from './AddContact';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

const Profile = () => {

let { stallid } = useParams();
const [stallProfile,setStallProfile] = useState("");
const [stallserviceproduct,setstallserviceproduct] = useState([]);
const [currentuser,setCurrentUser] = useState('');
const [executed, setExecuted] = useState(false);



useEffect(()=>{
  GetStallProductOrServicesHandler();
  // SetVisitorStalluserDetailsHandler();
 },[stallProfile])

 useEffect(()=>{  
  getStallHandler();
  if(stallProfile);
  // SetVisitorStalluserDetailsHandler();
 },[])

 useEffect(()=>{
  getUserProfile();
},[USER_NAME])

const getUserProfile = async()=>{
    GetuserProfile(USER_NAME).then(response=>{
    // console.log("current user response",response);  
    setCurrentUser(response.data);       
    })
}
const getStallHandler = ()=>{
  GetStallBYIDHandler(stallid).then(response=>{
        // console.log("reponse stall data",response)
        setStallProfile(response.data);
 
    })
   }

const GetStallProductOrServicesHandler = async ()=>{
  if(stallProfile){
    let data= {
             ids :stallProfile.ServiceOrProductID
              }
              getStallServiesORProductsHandler("POST",data).then(res=>{
                setstallserviceproduct(res.profileServices);
                // console.log(" stall products response",res)
            })
  }
}
// useEffect(()=>{
//   SetVisitorStalluserDetailsHandler()
// },[currentuser])



// ----------------------- Removed Temparily  start----------------

// useEffect(() => {
  
//   if (stallid && userid && Event_ID && !executed) {
//       // console.log("stall id", stallid, userid, Event_ID);
//       let data = {
//           visitorid: userid,
//           eventid: Event_ID,
//           stallid: stallid,
//           name: currentuser.displayName,
//           companyname: currentuser.companyName,
//           mobilenumber: currentuser.mobileNo,
//           emailid: currentuser.email
//       }
//       // console.log("data for checking", data);
//       ScannedVisitorStallCreate("POST", data).then(response => {
//           // console.log('response visitor stall created', response)
//       })
//       ScannedUserStallCreate("POST", data).then(response => {
//           // console.log('response user stall created', response)
//       })
//       setExecuted(true);
//   }
// }, []); 

// const BookMarkHandler = ()=>{  
//   if(stallid , Event_ID , userid){
//     let data={
//       visitorid:userid,
//       stallid:stallid,
//       eventid:Event_ID
//      };
//   // console.log("data",data);
//   BookMarkAStallHandler("POST",data).then(response=>{
//     //  console.log("repsonse",response);
//   })
// }
// }

// ----------------------- Removed Temparily  End----------------



  return (
    <Fragment>
      <div className='border max-w-[600px] lg:max-w-[400px] m-auto relative'>
      <div className='min-h-[90vh] relative pb-10'>
        <div className='relative h-[40px]'>
           <div className='absolute top-5 left-5'>
            <Link to="/" className='w-[30px] h-[30px] rounded-full flex items-center justify-center font-extrabold' style={{boxShadow: "0px 2px 7px 1px #1624494D"}}>
                <IoArrowBack className='text-[20px] active:text-[18px]'/>
            </Link>           
        </div>
        <div className='absolute top-5 right-5'>
            {/* <img src={categoryimg} alt="category image" className='w-[30px] h-[30px]'/>          */}
        </div>
        </div>
        <div className='flex items-center flex-col mx-10 justify-center gap-2'>
            <div className='w-[100px] h-[100px] rounded-full' style={{boxShadow: "0px 2px 7px 1px #1624494D"}}>
                <img src={stallProfile?.coverimage} alt="stall profile" className='w-[100px] h-[100px] rounded-full' />
            </div>
            <div className="flex items-center  text-[25px] gilroyBold justify-center text-center  text-[#162449]" style={{fontWeight:700}}>{stallProfile?.name}</div>
            <div className="flex items-center  text-[16px] gilroyMedium justify-center  text-[#162449]" style={{fontWeight:600}}>Stall no: {stallProfile?.stallNo}</div>
            <div className="flex items-center  text-[16px] gilroyMedium justify-center text-center text-[#3E4152]" style={{fontWeight:600}}>{stallProfile?.description}</div>
        </div>
        <div className='flex items-center flex-row mx-5 mt-4 justify-center gap-2'>
          <AddContact name={ stallProfile?.name } phoneNo={stallProfile?.mobileNo }  website={ stallProfile?.rabtoProfieLink } />
          <a href={stallProfile?.rabtoProfieLink} className='h-[45px] w-[112px] justify-center gilroyBold flex  text-[14px] active:text-[12px] rounded-[20px] items-center text-[#22421D] bg-[#8ED364]'>Profile</a>
          {/* <div className='h-[45px] w-[112px] justify-center gilroyBold flex  text-[14px] active:text-[12px] rounded-[20px] items-center bg-[#22421D] text-[#8ED364]' onClick={BookMarkHandler}>Bookmark</div> */}
        </div>

        
          




        <div className='mt-10' >
        <div className="flex items-center ml-5 mt-3 mb-3 text-[25px] gilroyMedium justify-start  text-[#162449]" style={{fontWeight:700}}>Products and Services</div>

        {
                      stallserviceproduct?.length > 0  ? 
                       <Fragment>
                        {/* <h3 className="NeuExBlack" style={{marginLeft: "15px", marginTop: "35px"}}>PRODUCT</h3> */}
                        <ScrollMenu>
                            {stallserviceproduct.map((item, index) => (
                                <a href={stallProfile.ebrochure} download>
                                <div  className='ml-5 shadow-md relative shadow-[#1624494D]  pl-3 pt-3 pr-4 border rounded-[20px] h-[290px] w-[230px]' >
                                 <div className="flex bg-[#162449] items-center justify-center rounded-[15px] w-[200px] h-[100px]">
                                   <img src={item.coverimage} alt="product image" className='w-[200px] h-[100px] rounded-[15px]' />
                                 </div>
                                    
                                   <div className="text-[#162449] mt-2 text-[18px] font-bold gilroyBold py-2 flex items-center justify-start">{item?.title?.substring(0,30)}{item?.title?.length > 30 ?  "..." : null}</div>
                                   <div className=' w-[100%]    '>
                                   {item?.description?.substring(0,60)}{item?.description?.length > 60 ?  "..." : null}
                                    </div>
                                 </div>
                                 </a>
                            ))}
                        </ScrollMenu>
                        </Fragment>
                        :
                        null
                       }

           
        </div>
      </div>
       <a href={stallProfile?.ebrochure} download className='flex items-center justify-center py-3 w-[100%]'>
        <button className='w-[200px] bg-[#9EE86F] rounded-[20px] py-3 gilroyBold text-[#0F2604] text-[13px] '>View E-brochure </button>
       </a>
       <Footer/>
      </div>
    </Fragment>
  )
}

export default Profile