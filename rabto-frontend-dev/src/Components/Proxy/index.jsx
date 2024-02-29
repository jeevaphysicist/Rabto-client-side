import React, { Fragment, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import Loading from '../Loading/Loading';
import { useParams ,  useNavigate } from "react-router-dom";
import {handleFoodForUser , handleGiftForUser , handleHallForUser} from "../../APIS/APIs";
import Tea from "../../Assets/tea.png"; 
import thumb from "../../Assets/thumb.png"; 


const Index = () => {
    const [isPopup,setIsPopup] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [isAlert,setIsAlert] = useState(false);
    const [message,setMessage] = useState('');

    let { userID } = useParams();

    let navigate = useNavigate();

    const HandlePopup = ()=>{
           setIsPopup(!isPopup);
    }

    const HandleAlert = ()=>{
      setIsAlert(!isAlert);
}

    // console.log("userID",userID);

const FoodHandler = (data)=>{
        // console.log("data",data);
        setIsLoading(true);
        handleFoodForUser(userID,data)
        .then(response=>{
            // console.log("response",response);
                setMessage(response.message);
                setIsLoading(false);
                HandleAlert();              
             
        })
       
    }

    const HallHandler = (data)=>{
        // console.log("data",data);
        setIsLoading(true);
        handleHallForUser(userID,data)
        .then(response=>{
            // console.log("response",response);
            setMessage(response.message);
           
                setIsLoading(false);
                HandlePopup();               
             
        })
       
    }

    const GiftHandler = (data)=>{
        // console.log("data",data);
        setIsLoading(true);
        handleGiftForUser(userID,data)
        .then(response=>{
            // console.log("response",response);
               setMessage(response.message);                 
               setIsLoading(false);
               HandlePopup();
        })
    }

const StallOwnerGiftGiven = ()=>{
      HandleAlert();
}


const StallOwnerAddVisit = ()=>{
      HandleAlert();
}



  return (
   <Fragment>
         {/* {
            isPopup ?          
          <div>
         <div className='fixed top-0 left-0 h-[100vh] z-10 bg-[black] opacity-50  right-0 bottom-0' ></div>
      
          <div className='fixed top-0 z-[20] left-0 h-[100vh]   right-0 bottom-0'>
            <div className='flex items-center justify-center h-[100vh]'>
            <div className='w-[280px] border m-auto h-auto bg-white rounded-[20px]'>
       
              <div className='flex items-center justify-end mx-5 my-5'> <IoCloseSharp className='text-[25px]' onClick={()=>HandlePopup()} /> </div>
              <div className='my-3 flex mx-3 items-center justify-center'>
                  { message }
              </div>
              <div className='flex items-center justify-center my-10'>
                <button className='bg-[green] active:text-[18px] text-[20px] text-white p-2 rounded-[5px]' onClick={()=>HandlePopup()}>Okay</button>
              </div>
            </div>   
            </div>          
          </div>
          </div>
          :
          null
          } */}
          {
            isLoading ?
            <Loading/>
            :
            null
          }

           <div className='max-w-[600px]  md:max-w-[400px] bg-white m-auto md:border border-0 relative '>
            <div className='flex items-center justify-center text-[25px] my-5 font-bold'>
              Event Log
            </div>
            <div className='absolute -top-1.5 right-2'>
               <button className="bg-[#9EE86F] animate-pulse h-[50px] w-[50px] rounded-full"></button>
            </div>

            { false ? 
              <Fragment>
                <div className='flex flex-col gap-5 mt-10 px-5 text-[21px]'>
                <div className=' text-[#162449] active:bg-[green] flex item-center justify-center p-4 rounded-[10px] font-bold' style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} onClick={()=>StallOwnerGiftGiven()}>Gift</div>
                <div className=' text-[#162449] active:bg-[green] flex item-center justify-center p-4 rounded-[10px] font-bold' style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} onClick={()=>StallOwnerAddVisit()}>Visit</div>
              </div>
              </Fragment>
              :
            <Fragment>
           {/* <div className='px-5 mt-3 front-bold text-[25px]'>FOOD</div> */}
              <div className='flex flex-col gap-5 mt-5 px-5 text-[21px]'>
                   <div className=' text-[#162449] active:bg-[green] flex item-center justify-center p-4 rounded-[10px] font-bold' style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} onClick={()=>FoodHandler("Breakfast")}>BreakFast</div>
                   <div className=' text-[#162449] active:bg-[green] flex item-center justify-center p-4 rounded-[10px] font-bold' style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} onClick={()=>FoodHandler("Lunch")}>Lunch</div>
                   <div className=' text-[#162449] active:bg-[green] flex item-center justify-center p-4 rounded-[10px] font-bold' style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} onClick={()=>FoodHandler("Dinner")}>Dinner</div>
              </div>
              <div className='px-5 mt-10 front-bold text-[21px]'>
                {/* <div>Hall</div> */}
                <div className='grid grid-cols-2 gap-5  '>
                     <div className=' text-[#162449] active:bg-[green] flex item-center justify-center p-4 rounded-[10px]  font-bold' style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} onClick={()=>HallHandler("A")}>Hall A</div>
                     <div className=' text-[#162449] active:bg-[green] flex item-center justify-center p-4 rounded-[10px] font-bold' style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} onClick={()=>HallHandler("B")}>Hall B</div>
                     <div className=' text-[#162449] active:bg-[green] flex item-center justify-center p-4 rounded-[10px] font-bold' style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} onClick={()=>HallHandler("C")}>Hall C</div>
                     <div className=' text-[#162449] active:bg-[green] flex item-center justify-center p-4 rounded-[10px] font-bold' style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} onClick={()=>HallHandler("D")}>Hall D</div>
                </div>
              </div>
              <div className='px-5 mt-10 text-[21px]'>
                {/* <div className='front-bold text-[25px]'>Gift</div> */}
                <div className=' text-[#162449] active:bg-[green] flex item-center justify-center p-4 rounded-[10px] font-bold' style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} onClick={()=>GiftHandler(true)}>GIFT</div>
              </div>
              </Fragment>
            }

           </div>
           <div className={` max-w-[600px]  lg:max-w-[400px]  md:flex`}>
          <div className={`fixed  top-0 left-0 bottom-0 right-0 bg-[#000000] opacity-[37%]    z-50 ${isAlert ? "w-full  h-full" : "w-0"}`} onClick={()=>setIsAlert(false)} ></div>
          <div className={`fixed  p-5 bottom-0  right-0 left-0 z-50 lg:z-50 rounded-[20px]  bg-white m-auto   transition-all duration-500   ease-in-out ${isAlert ? " top-[0vh] h-[170px] w-[300px] " : " top-[110vh] h-[0px]  w-[300px] "}`}>
               <div className={`${isAlert ? "block delay-150" : "hidden"} relative`}>
                <div className='flex items-center justify-center w-[100%] absolute -top-[120px]'><img src={Tea} alt=" scanning qr code" className='w-[150px]' /></div>
               <div className='flex items-center justify-center  mt-5 pt-5 gilroyBold text-[#000000] text-[16px] text-center' style={{fontWeight:600}}>{message}</div>
               <div className='flex items-center justify-center  mt-5 gilroyBold text-[#162449] text-[16px] text-center' style={{fontWeight:600}}>
               <button className='bg-[#9EE86F] active:text-[15px] text-[18px] text-[#0F2604] py-1 px-6 rounded-[20px]' onClick={()=>HandleAlert()}>Okay</button>
               </div>
               </div>
           </div>
       </div>
       <div className={` max-w-[600px]  lg:max-w-[400px]  md:flex`}>
          <div className={`fixed  top-0 left-0 bottom-0 right-0 bg-[#000000] opacity-[37%]    z-50 ${isPopup ? "w-full  h-full" : "w-0"}`} onClick={()=>setIsPopup(false)} ></div>
          <div className={`fixed  p-5 bottom-0  right-0 left-0 z-50 lg:z-50 rounded-[20px]  bg-white m-auto   transition-all duration-500   ease-in-out ${isPopup ? " top-[0vh] h-[170px] w-[300px] " : " top-[110vh] h-[0px]  w-[300px] "}`}>
               <div className={`${isPopup ? "block delay-150" : "hidden"} relative`}>
                <div className='flex items-center justify-center w-[100%] absolute -top-[120px]'><img src={thumb} alt=" scanning qr code" className='w-[150px]' /></div>
               <div className='flex items-center justify-center  mt-5 pt-5 gilroyBold text-[#000000] text-[16px] text-center' style={{fontWeight:600}}>{message}</div>
               <div className='flex items-center justify-center  mt-5 gilroyBold text-[#162449] text-[16px] text-center' style={{fontWeight:600}}>
               <button className='bg-[#9EE86F] active:text-[15px] text-[18px] text-[#0F2604] py-1 px-6 rounded-[20px]' onClick={()=>HandlePopup()}>Okay</button>
               </div>
               </div>
           </div>
       </div>

     
   </Fragment>
  )
}

export default Index