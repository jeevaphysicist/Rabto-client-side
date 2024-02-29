import React, { Fragment, useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom';
import Minilogo from "../../Assets/Visitors/mini_logo.png";
import JubiliantTamilnadu from "../../Assets/users/JT.png";
import { IoMdArrowDropdown } from "react-icons/io";
import Footer from '../Footer/Footer';
import { Event_ID, GetDashboardVisitorsForEvents, GetuserStallHandler, LeadCreateHandler, getUserDetailsForleadsHandler, userid } from '../../APIS/APIs';
import ExportToExcel from './ExportToExcel';
import ExportTOFullExcel from './ExportTOFullExcel';
import Loading from '../../Components/Loading/Loading';

const Tabs = [
  {Name:"Stall Leads",match:"MYSTALL"},
  {Name:"All Leads",match:"ALLLEADS"},
  // {Name:"Events",match:"EVENTS"}
]

const EventInsights = () => {
  const [isleadOpen,setIsLeadOpen] = useState({
     status:false,
     id:""
  });
  const [stallProfile,setStallProfile] = useState("");
  const [visitorDetails,setVisitorDeatails] = useState([]);
  const [bookMark,setBookMark] = useState(0);
  const [lead,setLead] = useState("");
  const [visitorid,setVisitorID] = useState("");
  const [activeTab,setActiveTab] = useState("MYSTALL");
  const [isLoading,setIsLoading] = useState(false);


  const leadHandler = (action, id ) => {
    if (action === true) {
        setIsLeadOpen({ status: !isleadOpen.status, id: id });
    } else if (action === false) {
        setIsLeadOpen({ status: !isleadOpen.status, id: id });
        
        
    }
};

const handleTab = (tabValue)=>{
  setActiveTab(tabValue)
}

const UpdateLeadHandler = (id , leads)=>{
  let data= { 
    visitorid:id,
    stallid:stallProfile._id,
    eventid:Event_ID,
    lead:leads 
   }
  //  console.log('data',data);
LeadCreateHandler("POST",data).then((response)=>{
  //  console.log("response",response);
})
}
useEffect(()=>{
  getStallHandler();
},[])

const getStallHandler = ()=>{
  GetuserStallHandler(userid).then(response=>{
        // console.log("reponse event",response)
        setStallProfile(response.data); 

    })
   }
// console.log("stall profile",stallProfile);
useEffect(()=>{
  if(activeTab === "MYSTALL")
  GetVisitorDetailsHandler()
  if(activeTab === "ALLLEADS")
  GetApplicationUserLeads()

},[stallProfile , activeTab])

const GetVisitorDetailsHandler = ()=>{
  setIsLoading(true);

  if( Event_ID && stallProfile?._id){
    let data = {
      stallid:stallProfile._id ,
      eventid :Event_ID
    }
    GetDashboardVisitorsForEvents("POST",data).then(response=>{
      //  console.log("response",response);
       setVisitorDeatails(response.data);
       setBookMark(response.BookmarkCount);
       setIsLoading(false);

    })
  
      // console.log("eventid",Event_ID , "Stall ID",stallProfile._id);
  }
  else{
    setIsLoading(false);
  }
} 

// console.log("tabs",activeTab);

const GetApplicationUserLeads = ()=>{
  setIsLoading(true);
  getUserDetailsForleadsHandler().then(response=>{
      //  console.log("response",response);
       setVisitorDeatails(response.data);
       setIsLoading(false);       
  })
}

  return (
    <Fragment>
      {
        isLoading ?
         <Loading/>
         :
         null
      }
      
      <div className="border max-w-[600px] lg:max-w-[400px] m-auto ">
           <div className=' min-h-[93vh]'>
            <div className='sticky top-0 left-0 z-10 right-0 bg-white'>
            <div className='mx-5 flex py-4'>        
               <div className="flex-1 text-left"><Link to="/userdashboard"><FaArrowLeft className='text-[20px]' /></Link></div>
            </div>
            </div>
            {
          stallProfile == "" || stallProfile == null ? 
         <div className='flex justify-center items-center text-[40px] font-semibold'> No Leads Found </div> 
          :   <>
         <div className='mx-5 mt-10'>

             <div className='text-[#000000] gilroyBold text-[18px] font-semibold mb-5'>Event insights</div>
             <div className='w-[100%] rounded-[20px] py-4 px-2' style={{ boxShadow: '0px 4px 6.599999904632568px 0px #00000040'}}>
               <div className="flex items-center justify-start gap-5">
                   <img src={JubiliantTamilnadu} alt="JB" className='w-[50px] h-[50px] rounded-[7px]' />
                   <div className='font-bold text-[16px] text-[#000000] gilroyBold uppercase'>Jubilant Tamilnadu</div>                             
               </div>
               <div className="bg-[#9EE86F] rounded-[10px] flex mt-10 item-center p-4">
                   <div className="flex-1 text-left gilroyLight font-bold">Total BookMarks</div>
                   <div className="flex-1 text-right gilroyLight font-bold">{bookMark}</div>
               </div>
             </div>
            </div>
            <div className='mx-5 mt-10'>
            <div className="flex items-center">
                    <div className="flex-1 text-left">
                    <div className='gilroyMedium font-bold text-[16px] '>Visitors Details</div>
                    </div>
                    <div className="gilroyMedium font-bold text-[#9EE86F] flex-1 text-right">
                     {/* {activeTab === "MYSTALL" ?  <ExportToExcel data={visitorDetails}/> : null } */}
                     {activeTab === "MYSTALL" ?  <ExportTOFullExcel data={visitorDetails}/> : null }
                     {activeTab === "ALLLEADS" ?  <ExportTOFullExcel data={visitorDetails}/> : null }
                    </div>
            </div>
            <div className="flex  mt-10  items-center justify-center gap-10">
             {
              Tabs?.map(tab=>            
            <div className='  text-[#000000] relative flex cursor-pointer items-center justify-center py-2 gilroybold  text-[15px]' onClick={()=>handleTab(tab.match)}> 
              <span className={tab.match === activeTab ? "text-[#130F26] font-bold": "text-[#8A8A8A]"}>{tab.Name}</span>
             {tab.match === activeTab ?<div className='absolute h-[4px] bottom-0 w-[100%] border-[1px] bg-[green] '></div> : null }
             </div>
              )
              }
            </div>
            {
              // activeTab === "MYSTALL"
              false
             ?
            <div className="grid grid-cols-1 mt-3 gap-5">
               
               {
                visitorDetails?.length > 0 && visitorDetails.map((item,index)=>
                  <div className="col-span-1">
            
                  <div className="w-[100%] p-4 rounded-[20px] grid grid-cols-4 gap-5 " style={{ boxShadow: '0px 4px 6.599999904632568px 0px #00000040'}}>
                     <div className="col-span-3 ">
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-2 text-start text-[#797979] text-[12px]">Name:</div>
                        <div className="col-span-2 text-start text-[14px] font-bold text-[#000000]">{item.visitorName}</div>
                      </div>
                      {/* <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-2 text-start text-[#797979] text-[12px]">Company Name:</div>
                        <div className="col-span-2 text-start text-[12px] font-semibold text-[#000000] ">{item.visitorCompanyName}</div>
                      </div> */}
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-2 text-start text-[#797979] text-[12px]">Mobile Number:</div>
                        <div className="col-span-2 text-start text-[12px]  font-semibold text-[#000000]">{item.visitorMobileNumber}</div>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-2 text-start text-[#797979] text-[12px]">Email id:</div>
                        <div className="col-span-2 text-start text-[12px] font-semibold text-[#000000]">{item.visitorEmailID}</div>
                      </div>
                     </div>
                     <div className="col-span-1  flex items-center relative">
                       <div className='flex text-[8px] px-1 py-1 rounded-[5px] items-center justify-center gap-3 bg-[#EFEFEF]' onClick={()=>{leadHandler(true , index)}}>LeadType <IoMdArrowDropdown/> </div>
                       {
                        isleadOpen.status && isleadOpen.id == index  ?                       
                        <div className='w-[150px] rounded-[5px] absolute top-[0px] -right-[20px] bg-white h-[100px]' style={{ boxShadow: '0px 4px 6.599999904632568px 0px #00000040'}}>
                           <div className="grid grid-cols-1 mx-5 pt-1 gap-2">
                            <div className="grid grid-cols-3 gap-1" >
                               <div className="col-span-1"><input type="radio" name="lead" onChange={()=>{setLead("GOOD");setVisitorID(item.VisitorsID);UpdateLeadHandler(item.VisitorsID,"GOOD");leadHandler(false,"",);}} /></div>                           
                               <div className="col-span-2 text-[#52D22E75] opacity-47">GOOD</div>                           
                            </div>
                            <div className="grid grid-cols-3   gap-1">
                               <div className="col-span-1"><input type="radio" name="lead" onChange={()=>{setLead("MID");setVisitorID(item.VisitorsID);UpdateLeadHandler(item.VisitorsID,"MID");leadHandler(false,"");}} /></div>                           
                               <div className="col-span-2 text-[#EF9E00]">MID</div>                           
                            </div>
                            <div className="grid grid-cols-3  gap-1">
                               <div className="col-span-1"><input type="radio" name="lead" onChange={()=>{setLead("STRONG");setVisitorID(item.VisitorsID);UpdateLeadHandler(item.VisitorsID,"STRONG");leadHandler(false,"");}} /></div>                           
                               <div className="col-span-2 text-[#FC000069] opacity-41">STRONG</div>                           
                            </div>
                            
                            
                                           
                            
                           </div>
                        </div>
                        :
                        null
                        }
                       
                     </div>
                  </div>
                </div>)
               } 

              
                

            </div>
            :
            null
            }

            {
              activeTab === "ALLLEADS" || activeTab === "MYSTALL" ?
              <div className="grid grid-cols-1 mt-3 gap-5">
               
               {
                visitorDetails?.length > 0 && visitorDetails.map((item,index)=>
                  <div className="col-span-1">
            
                  <div className="w-[100%] p-4 rounded-[20px] grid grid-cols-4 gap-5 " style={{ boxShadow: '0px 4px 6.599999904632568px 0px #00000040'}}>
                     <div className="col-span-3 ">
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-2 text-start text-[#797979] text-[12px]">Name:</div>
                        <div className="col-span-2 text-start text-[14px] font-bold text-[#000000]">{item.displayName}</div>
                      </div>
                      {/* <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-2 text-start text-[#797979] text-[12px]">Company Name:</div>
                        <div className="col-span-2 text-start text-[12px] font-semibold text-[#000000] ">{item.companyName}</div>
                      </div> */}
                      {
                      item?.mobileNo ?
                      
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-2 text-start text-[#797979] text-[12px]">Mobile Number:</div>
                        <div className="col-span-2 text-start text-[12px]  font-semibold text-[#000000]">{item.mobileNo}</div>
                      </div>
                      :
                      null
                      }
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-2 text-start text-[#797979] text-[12px]">Email id:</div>
                        <div className="col-span-2 text-start text-[12px] font-semibold text-[#000000]">{item.email}</div>
                      </div>
                     </div>
                     {/* <div className="col-span-1  flex items-center relative">
                       <div className='flex text-[8px] px-1 py-1 rounded-[5px] items-center justify-center gap-3 bg-[#EFEFEF]' onClick={()=>{leadHandler(true , index)}}>LeadType <IoMdArrowDropdown/> </div>
                       {
                        isleadOpen.status && isleadOpen.id == index  ?                       
                        <div className='w-[150px] rounded-[5px] absolute top-[0px] -right-[20px] bg-white h-[100px]' style={{ boxShadow: '0px 4px 6.599999904632568px 0px #00000040'}}>
                           <div className="grid grid-cols-1 mx-5 pt-1 gap-2">
                            <div className="grid grid-cols-3 gap-1" >
                               <div className="col-span-1"><input type="radio" name="lead" onChange={()=>{setLead("GOOD");setVisitorID(item.VisitorsID);UpdateLeadHandler(item.VisitorsID,"GOOD");leadHandler(false,"",);}} /></div>                           
                               <div className="col-span-2 text-[#52D22E75] opacity-47">GOOD</div>                           
                            </div>
                            <div className="grid grid-cols-3   gap-1">
                               <div className="col-span-1"><input type="radio" name="lead" onChange={()=>{setLead("MID");setVisitorID(item.VisitorsID);UpdateLeadHandler(item.VisitorsID,"MID");leadHandler(false,"");}} /></div>                           
                               <div className="col-span-2 text-[#EF9E00]">MID</div>                           
                            </div>
                            <div className="grid grid-cols-3  gap-1">
                               <div className="col-span-1"><input type="radio" name="lead" onChange={()=>{setLead("STRONG");setVisitorID(item.VisitorsID);UpdateLeadHandler(item.VisitorsID,"STRONG");leadHandler(false,"");}} /></div>                           
                               <div className="col-span-2 text-[#FC000069] opacity-41">STRONG</div>                           
                            </div>
                            
                            
                                           
                            
                           </div>
                        </div>
                        :
                        null
                        }
                       
                     </div> */}
                  </div>
                </div>)
               } 

              
                

            </div>
            :
            null
            }

            </div>
            </>
           }
             
            </div>
            {/* Footer  */}
           <Footer/>
           </div>
    </Fragment>
  )
}

export default EventInsights