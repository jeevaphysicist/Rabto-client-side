import React, { Fragment, useEffect, useState } from 'react';
import { Link , useParams } from 'react-router-dom';
import Minilogo from "../../Assets/Visitors/mini_logo.png";
import { FaArrowLeft } from 'react-icons/fa6';
import Profile from './Profilenew';
import Links from './Links';
import Events from './Events';
import { USER_NAME , userid , GetuserProfile  } from "../../APIS/APIs"
import Footer from '../Footer/Footer';

const Tabs = [
  {Name:"Profile",match:"PROFILE"},
  {Name:"Services/Product",match:"LINKS"},
  // {Name:"Events",match:"EVENTS"}
]

const Index = () => {
  const [activeTab,setActiveTab] = useState("PROFILE");

  const [userData,setUserData] = useState('');

  useEffect(()=>{
    if(USER_NAME){
      GetauserProfile();
    }
  },[USER_NAME])

  let { tab } = useParams();

  useEffect(()=>{
     handleTab(tab)
  },[tab])

  const GetauserProfile = async ()=>{
    GetuserProfile(USER_NAME).then(response=>{
        // console.log("response",response);
        if(response.isSuccess){
           setUserData(response.data);
        }
             
        })
  }
  
  const handleTab = (tabValue)=>{
     setActiveTab(tabValue)
  }
  // console.log("user data",userData);

  return (
   <Fragment>
           <Fragment>
        <div className=' min-h-[93vh] mb-20 max-w-[768px] md:max-w-[400px] m-auto relative md:border'>
            <div className='sticky top-0 left-0 z-10 right-0 bg-white'>
            <div className='mx-5 flex p-4'>        
               <div className="flex-1 text-left"><Link to={`/profile/${USER_NAME}`}><FaArrowLeft className='text-[20px]' /></Link></div>
            </div>
            {
              activeTab === "PROFILE" ?
            <div className=' mx-5 text-[#000000] flex items-center justify-center mb-5 p-4 vvdsfifties font-bold text-[20px]'> 
              Edit  Profile
             </div>
             :
             null}

            {          
            activeTab === "LINKS" ?
            <div className=' mx-5 text-[#000000] flex items-center justify-center mb-5 p-4 vvdsfifties font-bold text-[20px]'> 
              Add Services / Products
             </div>
             :
             null}
             {/* {          
              activeTab === "EVENTS" ?
            <div className=' mx-5 text-[#000000] flex items-center justify-center mb-5 p-4 vvdsfifties font-bold text-[20px]'> 
              Add Events
             </div>
             :
             null} */}

             {/* <div className=' divide-y-2 border-[1px] border-[#C8C8C8] '></div> */}
             <div className='sticky top-40  z-10'>
            <div className="flex   items-center justify-center gap-10">
             {
              Tabs?.map(tab=>            
            <div className='  text-[#000000] relative flex cursor-pointer items-center justify-center py-2 gilroybold  text-[15px]' onClick={()=>handleTab(tab.match)}> 
              <span className={tab.match === activeTab ? "text-[#130F26] font-bold": "text-[#8A8A8A]"}>{tab.Name}</span>
             {tab.match === activeTab ?<div className='absolute h-[4px] bottom-0 w-[100%] border-[1px] bg-[green] '></div> : null }
             </div>
              )
              }
            </div>
            </div>
           
            {/* <div className=' divide-y-2 border-[1px] border-[#C8C8C8] '></div> */}
            </div>

             {
              activeTab === "PROFILE" ?
              <Profile userData={userData} USER_NAME={USER_NAME} handleData={GetauserProfile} />
              :
              null
             }
             {
              activeTab === "LINKS" ?
              <Links userData={userData} USER_NAME={USER_NAME} />
              :
              null
             }
             {
              activeTab === "EVENTS" ?
              <Events userData={userData} USER_NAME={USER_NAME} />
              :
              null
             }
           

          
        

      
        </div>
{/* Footer  */}
<Footer/>
   </Fragment>
   </Fragment>
  )
}

export default Index