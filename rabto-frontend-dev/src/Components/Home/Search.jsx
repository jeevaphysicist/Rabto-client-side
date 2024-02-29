import React, { Fragment, useState } from 'react';
import banner from "../../Assets/Visitors/banner1.png";
import c1 from "../../Assets/Visitors/c1.png";
import slogo1 from "../../Assets/Visitors/slogo1.png";


const Search = () => {
  
  return (
    <Fragment>
        <div className='absolute top-[22vh] bottom-0 left-0 right-0 bg-white z-20'>
           {false ?
           <div className="mx-5">
           <div className="text-[20px] font-bold  vvdsfifties pt-2 ml-2" style={{letterSpacing:"1px"}}>SERVICES</div>
            <div className='grid grid-cols-4 gap-3 mt-3 max-h-[80vh] pb-10 overflow-y-scroll'>
                {
                    [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,].map(item=>
               <div className="col-span-2 m-auto">
                <div className="w-[150px] h-auto pb-1 rounded-[20px] shadow-lg">
                    <div>
                        <img src={banner} className='rounded-t-[20px] object-cover w-[100%] h-[110px]' alt="" />
                       <div className='text-[#162449] font-bold gilroyBold text-[12px] ml-3 m-2'>Braces </div>
                    </div>
                </div>
               </div>
               )
            }
            </div>
           </div>
           :
           null
           }
           {
            false?           
           <div className="mx-5">
           <div className="text-[20px] font-bold  vvdsfifties pt-2 ml-2" style={{letterSpacing:"1px"}}>PRODUCTS</div>
            <div className='grid grid-cols-4 mt-3'>
               <div className="col-span-2">
                <div className="w-[150px] h-auto pb-1 rounded-[20px] shadow-lg">
                    <div>
                        <img src={banner} className='rounded-t-[20px] object-cover w-[100%] h-[110px]' alt="" />
                       <div className='text-[#162449] font-bold gilroyBold text-[12px] ml-3 m-2'>Braces </div>
                    </div>
                </div>
               </div>
            </div>
           </div>
           :
           null
           }
           {
            true ?
           
           <div className="mx-5">
           <div className="text-[20px] font-bold  vvdsfifties pt-2 ml-2" style={{letterSpacing:"1px"}}>LIST OF STALL</div>
             
                 <div className='my-3 max-h-[100vh] pb-[60px] overflow-y-scroll'>
                 
                 {
                  [0,1].map(item=>
                  <div className='grid grid-cols-1'>
                     <div className='p-4 mt-3 grid grid-cols-6 gap-[10px] shadow-md rounded-[16px]' >
                        <div className="col-span-1 m-auto">
                          <div className='w-[35px] h-[35px] rounded-full'>
                          <img src={slogo1} className='w-[35px] h-[35px] rounded-full' />
                          </div>
                        </div>
                        <div className="col-span-3 ">
                          <div className="flex flex-col">
                            <div className="gilroyBold text-[16px] text-left">Archident oralcare</div>
                            <div className="gilroyLight text-[14px] text-left">Dentist</div>
                          </div>
                        </div>
                        <div className="col-span-1 m-auto gilroyBold">21</div>
                        <div className="col-span-1 m-auto">
                        <div className='w-[35px] h-[35px] rounded-full'>
                          <img src={c1} className='w-[35px] h-[35px] rounded-full' />
                          </div>
                        </div>
                     </div>
                   
                     
                     
                   </div>
                  )}
                  </div>
              
           </div>
           :
           null
           }
        </div>
    </Fragment>
  )
}

export default Search