import React, { Fragment } from 'react';
import { GiCheckMark } from "react-icons/gi";
import { IoIosWarning } from "react-icons/io";
import { IoClose } from "react-icons/io5";


const SuccessFailure = ({isSuccess , message , handlesucessFail }) => {
  return (
    <Fragment>
      <div className='max-w-[768px] md:max-w-[400px]'>
          <div className={`${isSuccess ? "bg-[#19AF66]"  : " bg-[#F35746]"}  fixed top-[30px] right-[20px] z-50 rounded-[6px] w-[300px] p-[10px] h-[auto]`}>
            <div className='flex gap-5 items-center text-white'>
                <div className=' '>{isSuccess ? <GiCheckMark className='text-[20px] text-white' /> : <IoIosWarning className='text-[20px] text-[white]' />}</div>
                <div className='flex-grow text-[12px] text-white'> {message} </div>
                <div className='text-white'><IoClose className='text-[20px] cursor-pointer' onClick={handlesucessFail} /></div>
            </div>
          </div>
      </div>
    </Fragment>
  )
}

export default SuccessFailure