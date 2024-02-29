import React, { Fragment } from 'react';
import Minilogo from "../../Assets/rabtologo.png";
import mini from "../../Assets/1.png";
import logo from "../../Assets/2.png";
import quotes from "../../Assets/3.png";


const Footer = () => {
  return (
    <Fragment>
           <div className='h-[60px] my-auto    bottom-0 left-0 right-0 bg-white'>
              <div className='flex flex-col items-center justify-center  '>
                    <div className="flex  items-center relative  justify-center px-5 ">
                      <img src={Minilogo} alt='Minilogo' className='w-[33px]' />
                      <span className='text-[33px] vvdsfifties text-[#0F2604]'>RABTO</span>         
                      <div className='absolute bottom-0 left-[52px] text-[#0F2604] text-[6px] text-center'>A Product of theDot Tech</div>
                    </div>
                </div>
              </div>
    </Fragment>
  )
}

export default Footer