import React, { Fragment } from 'react'
import Profile from './Profile'
import {USER_NAME} from "../../APIS/APIs"
import Footer from '../Footer/Footer'

const Index = () => {
  return (
    <Fragment>
      <div className='border relative max-w-[600px] lg:max-w-[400px] m-auto'>
      <div className=' min-h-[90vh]  relative m-auto'>
          <Profile USER_NAME ={USER_NAME} />
      </div>
      <Footer/>
      </div>
    </Fragment>
  )
}

export default Index