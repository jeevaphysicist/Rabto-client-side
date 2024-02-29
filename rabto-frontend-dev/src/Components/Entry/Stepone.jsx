import React, { Fragment, useState } from 'react';
import TieABrand from "../../Assets/Visitors/tieabrand.png";
import Minilogo from "../../Assets/Visitors/mini_logo.png";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import GoogleLogins from './GoogleLogins';
import Loading from '../Loading/Loading';

const Stepone = ({handleStep}) => {
    const [isLoading,setIsLoading]= useState(false);
    
const IsLoadingHandler = (data)=>{
    // console.log("action",data);
     setIsLoading(data);
}
    return (
        <Fragment>
            {
                isLoading ?

                <Loading/>
                :
                null
            }
            <div className='bg-white h-[100vh]'>
                <div className='flex items-center justify-center mt-5'>
                    <div className="flex items-center justify-center relative gap-2">
                      <img src={Minilogo} alt='Minilogo' className='w-[43px]' />
                      <span className='text-[51px] vvdsfifties text-[#0F2604]'>RABTO</span>         
                      <div className='absolute bottom-0 left-[0px] text-[#0F2604] w-[200px] text-[9px] text-center'>A Product of theDot Tech</div>
                      
                    </div>
                </div>
                <div className='w-[100%] '>
                    <img src={TieABrand} className='w-[100%]' alt="Tie a Brand" />
                </div>
                <div className='flex items-center justify-center flex-col mt-[20px] px-10'>
                {/* <span className='text-[51px] vvdsfifties m-auto text-[#1D1D1D] leading-10 text-center'>  ONE LINK FOR ALL YOUR PROFILES </span>          */}
                <span className='text-[51px] vvdsfifties m-auto text-[#0F2604] leading-10 text-center'>  YOUR  </span>         
                <span className='text-[51px] vvdsfifties m-auto text-[#0F2604] leading-10 text-center'>  ULTIMATE  </span>         
                <span className='text-[51px] vvdsfifties m-auto text-[#0F2604] leading-10 text-center'>  EXPO GUIDE. </span>         
                </div>
               
              <div className='my-20'>
              {/* <GoogleOAuthProvider clientId="478273431301-8ok0pcugo7mbmkfp6conrclugn786n8e.apps.googleusercontent.com"> */}
              <GoogleLogins handleStep={IsLoadingHandler}/>
              {/* </GoogleOAuthProvider> */}
             </div>
           
            </div>
            {/* <div className=' left-0 right-0 bottom-[20px] '>
             <div className=' flex items-center justify-center'>
                 <div className='flex items-center justify-center w-[72px] h-[2px] bg-[#1F1F1F] rounded-8'>

                 </div>
             </div>
             </div> */}
        </Fragment>
    );
};

export default Stepone;
