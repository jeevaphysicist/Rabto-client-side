import React, { Fragment } from 'react'
import { IoIosArrowBack } from 'react-icons/io';

const index = () => {
  return (
    <Fragment>
       {/* <div>
    <div className='w-[100%] relative ' >
        <img src={userData?.banner} alt="Profile GIF" />
        <button className='absolute top-10 right-5 text-[30px] active:text-[35px] text-[#9EE86F]' onClick={()=>{EditDataSetHandler() ;setShowModal1(true)}}>
          <MdOutlineModeEditOutline className='text-[gray] p-1 rounded-[7px]'/>
        </button>
    </div>
    <div className='relative -top-[50px] '>
      <div ref={componentRef}
       className={`${isAtTop ? "rounded-none" : "rounded-t-[40px]"} bg-white  pb-10 relative `}
       >
        <div className={`${isAtTop ? "rounded-none" : "rounded-t-[40px]" } bg-[#F4F4F4] `}>
         <div className=' relative m-auto  -top-[60px] w-[100px] h-[100px] rounded-full ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
              <img src={userData?.profilePhoto} className='w-[100px] h-[100px]  rounded-full' />
        <button className='absolute -top-1 -right-1 text-[30px] active:text-[35px] text-white' onClick={()=>{EditDataSetHandler();setShowModal2(true)}}>
            <MdOutlineModeEditOutline className='border border-[gray] bg-[#F4F4F4] text-[gray]  p-1 rounded-[7px]'/>
        </button>
            
        </div>
        <div className='relative -top-[40px] '>
        <button className='absolute top-0 right-5 text-[30px] active:text-[35px] text-white' onClick={()=>{EditDataSetHandler(); setShowModal3(true);}}>
          <MdOutlineModeEditOutline className='text-[gray] p-1 rounded-[7px]'/>
        </button>
          <div className="flex items-center font-bold text-[24px] gilroyBold justify-center text-[#000000]">{userData?.displayName} &nbsp;<BsShieldFillCheck className='text-[#2F80ED]' /></div>
          <div className="flex items-center font-bold text-[16px] gilroyBold justify-center text-center text-[#3E4152] px-4">{userData?.About}</div>
           <div className='flex items-center justify-center gap-5 mt-6'>
           {userData?.socialMedia?.instagram ?<a href={`${userData?.socialMedia?.instagram}`} target='_blank'><FaInstagram className='text-[28px] active:text-[30px] text-[#162449]'/> </a> : null }
           {userData?.socialMedia?.facebook ? <a href={`${userData?.socialMedia?.facebook}`} target='_blank'><FaFacebookF className='text-[28px] active:text-[30px] text-[#162449]'/></a> : null }
           {userData?.socialMedia?.dribbble ? <a href={`${userData?.socialMedia?.dribbble}`} target='_blank'><FaDribbble className='text-[28px] active:text-[30px] text-[#162449]'/></a> : null }
           {userData?.socialMedia?.behance ? <a href={`${userData?.socialMedia?.behance}`} target='_blank'><FaBehance className='text-[28px] active:text-[30px] text-[#162449]'/></a> : null }
           {userData?.socialMedia?.linkedin ? <a href={`${userData?.socialMedia?.linkedin}`} target='_blank'><FaLinkedinIn className='text-[28px] active:text-[30px] text-[#162449]'/></a> : null }
           {userData?.socialMedia?.website ?<a href={`${userData?.socialMedia?.website}`} target='_blank'><TbWorld className='text-[28px] active:text-[30px] text-[#162449]'/></a> : null }
           </div>
        </div>
        </div>
        <div className='grid grid-cols-2 gap-5 mt-5'>
           <div className='col-span-1 text-end'><button className='inline-flex  items-center justify-center border-[2px] border-[#162449] font-bold px-10 py-2 rounded-[15px] text-[13px] active:text-[12px]  ' style={{boxShadow: "1px 5px 5px 0px #1624494D"}}><IoMdCall onClick={()=>callPhoneNumber(userData?.mobileNo)} />&nbsp;&nbsp;Call</button></div>
           <div className='col-span-1 text-start'>
            {
               userData?.whatsapp?
            
           <a  href={`https://wa.me/${userData?.whatsapp}`}
           target="_blank"
           rel="noopener noreferrer"
           >
         <button className='inline-flex items-center justify-center bg-[#9EE86F] px-10 py-2 rounded-[15px] text-[13px]  text-white active:text-[12px]' style={{boxShadow: "1px 5px 5px 0px #1624494D"}}><FaWhatsapp/>&nbsp;&nbsp;Whatsapp</button>
         </a>
         :
         <button className='inline-flex items-center justify-center bg-[#9EE86F] px-10 py-2 rounded-[15px] text-[13px]  text-white active:text-[12px]' style={{boxShadow: "1px 5px 5px 0px #1624494D"}}><FaWhatsapp/>&nbsp;&nbsp;Whatsapp</button>
            }          
        </div> 
        </div>
      </div>
      

    </div>
    </div> */}
    </Fragment>
  )
}

export default index