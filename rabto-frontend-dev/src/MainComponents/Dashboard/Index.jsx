import React, { Fragment, useState } from 'react';
import Minilogo from "../../Assets/Visitors/mini_logo.png";
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import {USER_NAME} from "../../APIS/APIs"
import JubiliantTamilnadu from "../../Assets/users/JT.png";
import { Swiper , SwiperSlide} from "swiper/react";
import { Navigation  } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"
import Footer from '../Footer/Footer';
import { RiMenu4Fill } from 'react-icons/ri';
import Aside from '../Profile/Aside';

const Index = () => {
    const [isAsideOpen, setIsAsideOpen] = useState(false);

    const handleAside = ()=>{
        setIsAsideOpen(!isAsideOpen);
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

             {/* Events */}
        <div className='mt-10 mx-5'>
           <div className='text-[#000000] gilroyBold text-[18px] font-semibold mb-5'>Events</div>
           <Swiper
                slidesPerView={1.8}
                spaceBetween={10}
                // navigation={true}
                modules={[Navigation]}
                style={{padding:"10px 10px 20px 0px"}}
                >
                  <SwiperSlide className=' ' >
                   <div className='w-[170px] pb-5 rounded-[20px] shadow-md shadow-[#1624494D]'>
                    <img src={JubiliantTamilnadu} className='p-1 w-[100%] rounded-t-[20px]' alt="Jubiliant Tamilnadu  " />
                     <div className='flex items-center justify-center text-[14px] gilroyMedium font-medium'>JUBILANT TAMILNADU</div>
                     <Link to="/eventinsights" className='mt-5'>
                        <button className="flex items-center text-[16px] m-auto gilroyMedium font-medium justify-center p-2 rounded-[13px] bg-[#9EE86F]">View Insights</button>
                     </Link>
                   </div>
                  </SwiperSlide> 
                  {/* <SwiperSlide className=' ' >
                   <div className='w-[170px] pb-5 rounded-[20px] shadow-md shadow-[#1624494D]'>
                    <img src={JubiliantTamilnadu} className='p-1 w-[100%] rounded-t-[20px]' alt="Jubiliant Tamilnadu  " />
                     <div className='flex items-center justify-center text-[14px] gilroyMedium font-medium'>JUBILANT TAMILNADU</div>
                     <div className='mt-5'>
                        <button className="flex items-center text-[16px] m-auto gilroyMedium font-medium justify-center p-2 rounded-[13px] bg-[#9EE86F]">View Insights</button>
                     </div>
                   </div>
                  </SwiperSlide> 
                  <SwiperSlide className=' ' >
                   <div className='w-[170px] pb-5 rounded-[20px] shadow-md shadow-[#1624494D]'>
                    <img src={JubiliantTamilnadu} className='p-1 w-[100%] rounded-t-[20px]' alt="Jubiliant Tamilnadu  " />
                     <div className='flex items-center justify-center text-[14px] gilroyMedium font-medium'>JUBILANT TAMILNADU</div>
                     <div className='mt-5'>
                        <button className="flex items-center text-[16px] m-auto gilroyMedium font-medium justify-center p-2 rounded-[13px] bg-[#9EE86F]">View Insights</button>
                     </div>
                   </div>
                  </SwiperSlide> 
                  <SwiperSlide className=' ' >
                   <div className='w-[170px] pb-5 rounded-[20px] shadow-md shadow-[#1624494D]'>
                    <img src={JubiliantTamilnadu} className='p-1 w-[100%] rounded-t-[20px]' alt="Jubiliant Tamilnadu  " />
                     <div className='flex items-center justify-center text-[14px] gilroyMedium font-medium'>JUBILANT TAMILNADU</div>
                     <div className='mt-5'>
                        <button className="flex items-center text-[16px] m-auto gilroyMedium font-medium justify-center p-2 rounded-[13px] bg-[#9EE86F]">View Insights</button>
                     </div>
                   </div>
                  </SwiperSlide>  */}
                 
                  
            </Swiper>
          

        </div>

            <div className='px-5 mb-10'>
            <div className='w-[100%] gilroyLight rounded-[25px]  p-4' 
            style={{ boxShadow: '0px 4px 6.599999904632568px 0px #00000040'}}
            >
                <div className="flex items-center">
                    <div className="flex-1 text-left">
                    <div className='gilroyLight text-[16px] '>Recent Events</div>
                    </div>
                    <div className="gilroyMedium font-bold text-[#9EE86F] flex-1 text-right">
                        See All
                    </div>
                </div>
                <div className="flex items-center just-center mt-10 flex-col gap-5">
                    <div className='border border-[#9EE86F] py-2 px-4 w-[100%] rounded-[30px]'>
                        <div className='flex items-center justify-center gap-5'>
                             <div>1</div>
                             <div><img src={JubiliantTamilnadu} className='w-[20px] rounded-[2px] h-[20px]' alt="Jubiliant Tamilnadu" /></div>
                             <div className='font-bold text-[#000000]'>Jubilant Tamilnadu</div>                             
                        </div>
                    </div>

                    {/* <div className='border border-[#9EE86F] py-2 px-4 w-[100%] rounded-[30px]'>
                        <div className='flex items-center justify-center gap-5'>
                             <div>1</div>
                             <div><img src={JubiliantTamilnadu} className='w-[20px] rounded-[2px] h-[20px]' alt="Jubiliant Tamilnadu" /></div>
                             <div className='font-bold text-[#000000]'>Jubilant Tamilnadu</div>                             
                        </div>
                    </div>
                    <div className='border border-[#9EE86F] py-2 px-4 w-[100%] rounded-[30px]'>
                        <div className='flex items-center justify-center gap-5'>
                             <div>1</div>
                             <div><img src={JubiliantTamilnadu} className='w-[20px] rounded-[2px] h-[20px]' alt="Jubiliant Tamilnadu" /></div>
                             <div className='font-bold text-[#000000]'>Jubilant Tamilnadu</div>                             
                        </div>
                    </div>
                    <div className='border border-[#9EE86F] py-2 px-4 w-[100%] rounded-[30px]'>
                        <div className='flex items-center justify-center gap-5'>
                             <div>1</div>
                             <div><img src={JubiliantTamilnadu} className='w-[20px] rounded-[2px] h-[20px]' alt="Jubiliant Tamilnadu" /></div>
                             <div className='font-bold text-[#000000]'>Jubilant Tamilnadu</div>                             
                        </div>
                    </div>
                    <div className='border border-[#9EE86F] py-2 px-4 w-[100%] rounded-[30px]'>
                        <div className='flex items-center justify-center gap-5'>
                             <div>1</div>
                             <div><img src={JubiliantTamilnadu} className='w-[20px] rounded-[2px] h-[20px]' alt="Jubiliant Tamilnadu" /></div>
                             <div className='font-bold text-[#000000]'>Jubilant Tamilnadu</div>                             
                        </div>
                    </div>
                    <div className='border border-[#9EE86F] py-2 px-4 w-[100%] rounded-[30px]'>
                        <div className='flex items-center justify-center gap-5'>
                             <div>1</div>
                             <div><img src={JubiliantTamilnadu} className='w-[20px] rounded-[2px] h-[20px]' alt="Jubiliant Tamilnadu" /></div>
                             <div className='font-bold text-[#000000]'>Jubilant Tamilnadu</div>                             
                        </div>
                    </div>
                    <div className='border border-[#9EE86F] py-2 px-4 w-[100%] rounded-[30px]'>
                        <div className='flex items-center justify-center gap-5'>
                             <div>1</div>
                             <div><img src={JubiliantTamilnadu} className='w-[20px] rounded-[2px] h-[20px]' alt="Jubiliant Tamilnadu" /></div>
                             <div className='font-bold text-[#000000]'>Jubilant Tamilnadu</div>                             
                        </div>
                    </div> */}
                    {/* <div className='border border-[#9EE86F] py-2 px-4 w-[100%] rounded-[30px]'>
                        <div className='flex items-center justify-center gap-5'>
                             <div>1</div>
                             <div><img src={JubiliantTamilnadu} className='w-[20px] rounded-[2px] h-[20px]' alt="Jubiliant Tamilnadu" /></div>
                             <div className='font-bold text-[#000000]'>Jubilant Tamilnadu</div>                             
                        </div>
                    </div>
                    <div className='border border-[#9EE86F] py-2 px-4 w-[100%] rounded-[30px]'>
                        <div className='flex items-center justify-center gap-5'>
                             <div>1</div>
                             <div><img src={JubiliantTamilnadu} className='w-[20px] rounded-[2px] h-[20px]' alt="Jubiliant Tamilnadu" /></div>
                             <div className='font-bold text-[#000000]'>Jubilant Tamilnadu</div>                             
                        </div>
                    </div>
                    <div className='border border-[#9EE86F] py-2 px-4 w-[100%] rounded-[30px]'>
                        <div className='flex items-center justify-center gap-5'>
                             <div>1</div>
                             <div><img src={JubiliantTamilnadu} className='w-[20px] rounded-[2px] h-[20px]' alt="Jubiliant Tamilnadu" /></div>
                             <div className='font-bold text-[#000000]'>Jubilant Tamilnadu</div>                             
                        </div>
                    </div> */}
                </div>
               
            </div>
            </div>
        

      
        </div>
{/* Footer  */}
       <Footer/>
       </div>
   </Fragment>
  )
}

export default Index