import React from 'react'
import Footer from '../../MainComponents/Footer/Footer'
import { Link } from 'react-router-dom'
import { USER_NAME } from '../../APIS/APIs'

const Error404 = () => {
  return (

    <div className="border max-w-[600px] lg:max-w-[400px] m-auto realtive ">
      <Link to={ USER_NAME ? `/profile/${USER_NAME}` : "/"}>
      <Footer/>
      </Link>
    <div className='flex flex-col gap-1 items-center justify-center h-[90vh] font-bold text-[53px]'>
      <div>Error404</div>
      <div className='text-[30px] font-thin'>Page Not Found</div>
    </div>
    </div>
  )
}

export default Error404