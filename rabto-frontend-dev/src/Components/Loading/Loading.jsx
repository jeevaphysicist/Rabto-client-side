import React, { Fragment } from 'react';
import ReactLoading from 'react-loading';
import MiniLogo from "../../Assets/Visitors/mini_logo.png";

const Loading = () => {
  return (
   <Fragment>
    <div className="border max-w-[600px] lg:max-w-[400px] m-auto realtive ">
      <div className='absolute  top-0 bottom-0 left-0 right-0 bg-white opacity-70 z-40'></div>

      <div className='absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-50 '>
       <div className='z-20 flex items-center justify-center'>
           <div className='felx flex-col'>
            <div><img src={MiniLogo} alt="Logo" className='animate-pulse' /></div>
             <ReactLoading type="cylon" color="black"  />
           </div>
       </div>
      </div>
      </div>
   </Fragment>
  )
}

export default Loading