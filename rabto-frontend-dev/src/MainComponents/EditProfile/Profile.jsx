import React, { Fragment, useEffect, useRef, useState } from 'react';
import ProfileGIF from "../../Assets/Visitors/Development purpose.gif";
import Profileimg from "../../Assets/Visitors/profile.png";
import { FaBehance, FaBuilding, FaDribbble, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { TbWorld } from 'react-icons/tb';
import { IoMdArrowRoundBack, IoMdCall } from 'react-icons/io';
import { BsShieldFillCheck } from 'react-icons/bs';
import { IoMail, IoMenu } from 'react-icons/io5';
import { FaPen } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Dropzone from 'react-dropzone';
import {Modal} from 'react-bootstrap';
import ReactLoading from 'react-loading';
import { IoPerson } from "react-icons/io5";
import { MdAddCall, MdDescription, MdOutlineCall, MdOutlineModeEditOutline } from "react-icons/md";
import { RiAccountCircleFill, RiWhatsappFill, RiWhatsappLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { getStorage, ref, uploadBytes ,getDownloadURL , uploadBytesResumable , } from "firebase/storage";
import {app , db} from '../../Config/Firebase';
import { UploadFile } from '../upload';
import { useParams } from 'react-router-dom';
import { GetuserProfile , updateUserProfileHandler, userid } from '../../APIS/APIs';
import SaveContact from './SaveContact';


const Profile = ({userData , USER_NAME , handleData}) => {

  const [isAtTop, setIsAtTop] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [Photo,setPhoto] = useState("");
  const [banner,setBanner] = useState("");

  const [error,setError] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isBtnLoading,setIsBtnLoading] = useState(false);

  const [displayName,setDisplayName] = useState('');
  const [userName,setuserName] = useState('');
  const [descripiton,setDescription] = useState('');
  const [instagram,setInstagram] = useState('');
  const [facebook,setFacebook] = useState('');
  const [dribbble,setDribbble] = useState('');
  const [behance,setBehance] = useState('');
  const [linkedin,setLinkedin] = useState('');
  const [website,setWebsite] = useState('');
  const [phoneNo,setPhoneNo] = useState('');
  const [whatsapp,setWhatsapp] = useState('');
  const [companyName,setCompanyName] = useState('');
  const [email,setEmail] = useState('');


  const componentRef = useRef();

  let  { profileUserName } = useParams;

  
//user Photo Edit Modal
const handleModalClose = () => {
    setShowModal2(false);
    setShowModal1(false);
    setShowModal3(false);
    
  }; 

  useEffect(()=>{
    getUserProfile();
  },[profileUserName])

const getUserProfile = async()=>{
      GetuserProfile(profileUserName).then(response=>{
      // console.log("response",response);         
      })
}
useEffect(()=>{
  EditDataSetHandler();
},[userData])
const EditDataSetHandler = ()=>{
    setEmail(userData?.email)
    setBanner(userData?.banner);
    setPhoto(userData?.profilePhoto);
    setDisplayName(userData?.displayName);
    setDescription(userData?.About)
    setuserName(userData?.userName)
    setInstagram(userData?.socialMedia?.instagram)
    setFacebook(userData?.socialMedia?.facebook)
    setDribbble(userData?.socialMedia?.dribbble)
    setBehance(userData?.socialMedia?.behance)
    setLinkedin(userData?.socialMedia?.linkedin)
    setWebsite(userData?.socialMedia?.website)
    setWhatsapp(userData?.whatsapp)
    setPhoneNo(userData?.mobileNo)
    setCompanyName(userData?.companyName)
}

  useEffect(() => {
    const handleScroll = () => {
      const component = componentRef.current;
      const rect = component.getBoundingClientRect();
      setIsAtTop(rect.top <= 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleProfilePictureUpload = (e)=>{
        // console.log("photo",e.target.files[0]);
        let file = e.target.files[0] ;
        if (file) {         
          // var imageUrl = URL.createObjectURL(file);           
          // setPhoto(imageUrl);
          UploadFile(file)
          .then((downloadURL) => {
            // console.log("Download URL:", downloadURL);
            setPhoto(downloadURL)
           })
          .catch((error) => {
            // console.error("Error:", error);
             });     
          
      }
  }
  const handleProfileBannerUpload = (e)=>{
    // console.log("photo",e.target.files[0]);
        let file = e.target.files[0] ;
        if (file) {         
          // var imageUrl = URL.createObjectURL(file);           
          // setBanner(imageUrl);  
          UploadFile(file)
          .then((downloadURL) => {
            // console.log("Download URL:", downloadURL);
            setBanner(downloadURL)
           })
          .catch((error) => {
            // console.error("Error:", error);
             });   
      }
  }
  // console.log("banner",banner)
  // console.log("profile photo",Photo);

  
  const ProfileUpdateHandler = ()=>{
    setIsBtnLoading(true);
    let data = {
      displayName,
      profilePhoto:Photo,
      mobileNo:phoneNo,
      companyName,
      userName,
      banner,
      email,
      whatsapp:whatsapp,
      About:descripiton,
      socialMedia:{
                 instagram:instagram,
                 facebook:facebook,
                 dribbble:dribbble,
                 behance:behance,
                 website:website,
                 linkedin:linkedin
                },
     }
    // console.log("data",data);
    updateUserProfileHandler("POST",data).then(response=>{
      // console.log("response",response);
        if(response.isSuccess){
           handleModalClose();
           handleData();
        }
    })
    
  }

  

  const callPhoneNumber = (phoneNumber) => {
    if(phoneNumber)
     window.location.href = `tel:${phoneNumber}`; 
  };

  return (
    <Fragment>
    <div>
    <div className='w-[100%] relative h-[210px] ' >
        <img src={userData?.banner} alt="Profile GIF" className='h-[210px]' />
        <button className='absolute top-10 right-5 text-[30px] active:text-[35px] text-[#9EE86F]' onClick={()=>{EditDataSetHandler() ;setShowModal1(true)}}>
          <MdOutlineModeEditOutline className='text-[gray] p-1 rounded-[7px]'/>
        </button>
    </div>
    <div className='relative -top-[50px] '>
    {/* <IoMenu className='  text-white fixed top-5 left-2 font-bold text-[40px]' onClick={handleAside} /> */}
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
    </div>
    { showModal2 ?
    <Fragment>
         <div className='absolute top-0 bottom-0 left-0 right-0  z-10 bg-black opacity-60'></div>
        <div className="absolute left-0 right-0 top-10 bottom-10 z-10">
            <div className=' flex items-center justify-center m-auto py-40  w-[100%]'>
                <div className='w-[90%] h-[50vh] relative   bg-black rounded-[20px]' >
               <div className=" realtive h-[50px] w-[100%]">
                    <IoCloseSharp className="text-[30px] text-white font-bold active:text-[35px] absolute right-10 top-5" onClick={handleModalClose} />
               </div>
               <div className='flex items-center mt-5 justify-center  flex-col'>
                 <input type="file" id="uplod-profile-image" className='hidden' onChange={handleProfilePictureUpload} />
                <label htmlFor='uplod-profile-image' className=' relative    w-[200px] h-[200px] rounded-full ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
                <img src={Photo} className='w-[200px] h-[200px]  rounded-full' />
                </label>
                <div className='mt-5 font-light text-white'>500 <span className='font-semibold'>X</span> 500</div>
                <button className={`${isBtnLoading ? " cursor-wait " : "cursor-pointer" } text-[white] bg-[green] mt-5 px-5 rounded-[20px] py-1 flex items-center text-[30px] active:text-[35px]`} onClick={ProfileUpdateHandler}>
             
                 {isBtnLoading ? <ReactLoading type="bubbles" color="white" width={30} height={30} /> : "Save" }
               </button>
               </div>
                    
                </div>
           
            
            </div>
           
         </div>
         </Fragment>
: 
null
}

{ showModal1 ?
    <Fragment>
         <div className='absolute top-0 bottom-0 left-0 right-0  z-10 bg-black opacity-60'></div>
        <div className="absolute left-0 right-0 top-10 bottom-10 z-10">
            <div className=' flex items-center justify-center m-auto  w-[100%]'>
              <div className='w-[90%] h-[50vh] overflow-y-scroll bg-black rounded-[20px]' >
               <div className=" realtive  h-[50px] w-[100%]">
                    <IoCloseSharp className="text-[30px] font-bold active:text-[35px] absolute right-10 top-5 text-[white]" onClick={handleModalClose} />
               </div>

               <div className='flex items-center justify-center h-[60vh] flex-col'>
               <input type="file" id="uplod-profile-image" className='hidden' onChange={handleProfileBannerUpload} />
                <label htmlFor='uplod-profile-image' className=' relative    w-[100px] h-[100px]  ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
                 <img src={banner} alt="Profile GIF" className='w-[100px] h-[100px]' />
                 
                 </label>
                 <button className={`${isBtnLoading ? " cursor-wait " : "cursor-pointer" } text-[white] bg-[green] mt-5 px-5 rounded-[20px] py-1 flex items-center text-[30px] active:text-[35px]`} onClick={ProfileUpdateHandler} >
             
                 {isBtnLoading ? <ReactLoading type="bubbles" color="white" width={30} height={30} /> : "Save" }
               </button>
               </div>       
              </div>
            </div>
         </div>
         </Fragment>
: 
null
}

{ showModal3 ?
    <Fragment>
         <div className='absoute top-0 bottom-0 left-0 right-0  z-10 bg-black opacity-60'></div>
        <div className="absolute left-0 right-0 top-0 bottom-0 z-10 bg-white ">
            <div className=' flex items-center justify-center m-auto  w-[100%] '>
                <div className='w-[100%] h-[98vh] overflow-y-scroll  bg-white ' >
               <div className="sticky z-10 top-0">
               <div className=" flex  w-[100%] py-5 px-5 bg-white ">
                <div className='flex-1 text-left'>
                    <IoMdArrowRoundBack className="text-[25px] font-bold active:text-[35px] " onClick={handleModalClose} />
                </div>
                <div >
                    <button className='text-[#52D22E] cursor-pointer font-bold' onClick={ProfileUpdateHandler}>Save</button>
                </div>
               </div>
               </div>
               <div className='flex items-center justify-center gap-10  flex-col '>
                      <div className='w-[100%]  px-5' >
                      
                      <div className='flex flex-col gap-5 w-[100%] rounded-[10px] p-5 border'>
                      <div className=' text-[30px] vvdsfifties font-bold ' style={{fontWeight:700}}>
                           User Details
                      </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><RiAccountCircleFill className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Display Name<sup className='text-red-500'>*</sup></span> <span className={`text-[10px] font-medium text-end   ${false? "text-red-500":""} `}>( 0 / 100 )</span></div>

                            </div>
                            <div className="w-[100%]">
                              <input  value={displayName} type="text" placeholder='Jhon doe' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setDisplayName(e.target.value)}} />
                            </div>
                          </div>
                        
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><RiAccountCircleFill className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>User Name<sup className='text-red-500'>*</sup></span> <span className={`text-[10px] font-medium text-end flex-1  ${false? "text-red-500":""} `}>( 0 / 100 )</span></div>

                            </div>
                            <div className="w-[100%] relative">
                              <input value={userName} type="text" placeholder=' |   Jhondoe' className='w-[100%] pl-10 h-[50px] border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setuserName(e.target.value)}} />
                              <div className='absolute top-2.5 left-5 text-[20px] text-gray-400'> &#64; </div> 
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><FaBuilding className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Company Name<sup className='text-red-500'>*</sup></span> <span className={`text-[10px] font-medium text-end   ${false? "text-red-500":""} `}>( 0 / 100 )</span></div>

                            </div>
                            <div className="w-[100%]">
                              <input  value={companyName} type="text" placeholder='Jhon doe' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setCompanyName(e.target.value)}} />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><IoMail className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Email<sup className='text-red-500'>*</sup></span> <span className={`text-[10px] font-medium text-end   ${false? "text-red-500":""} `}>( 0 / 100 )</span></div>

                            </div>
                            <div className="w-[100%]">
                              <input readOnly  value={email} type="text" placeholder='Jhon doe' className='w-[100%] h-[50px] bg-gray-300 border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setEmail(e.target.value)}} />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><MdDescription className='text-[28px] text-[#162449]' /></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left'>Description</span> <span className={`text-[10px] font-medium text-end flex-1  ${false? "text-red-500":""} `}>( 0 / 1000 )</span></div>
                            </div>
                            <div className="w-[100%]">
                              <textarea value={descripiton} type="text" rows={5} placeholder='Hi , I am Jhon doe , Welcome to My E-profile' className='w-[100%]   border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setDescription(e.target.value)}} />
                            </div>
                          </div>
                      </div>
                      </div>
                      <div className='w-[100%]  px-5' >
                     
                      <div className='flex flex-col gap-5 w-[100%] rounded-[10px] p-5 border'>
                      <div className='text-bold text-[30px] '>
                           Social Media Links
           
           
           
                      </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#52D22E]">
                              <div><FaInstagram className='text-[28px] text-[#162449]'/> </div>
                              <div className='flex items-center w-[100%] text-[#162449]'><span className='flex-1 text-left text-[20px]'>Intagram</span> </div>

                            </div>
                            <div className="w-[100%]">
                              <input value={instagram} type="text" placeholder='https://instagram.com' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setInstagram(e.target.value)}} />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#52D22E]">
                              <div><FaFacebookF className='text-[28px] text-[#162449]'/> </div>
                              <div className='flex items-center w-[100%] text-[#162449] text-[20px]'><span className='flex-1 text-left'>Facebook</span> </div>

                            </div>
                            <div className="w-[100%]">
                              <input value={facebook} type="text" placeholder='https://facebook.com' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setFacebook(e.target.value)}} />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#52D22E]">
                              <div><FaDribbble className='text-[28px] text-[#162449]'/> </div>
                              <div className='flex items-center w-[100%] text-[#162449] text-[20px]'><span className='flex-1 text-left'>Dribbble</span></div>

                            </div>
                            <div className="w-[100%]">
                              <input value={dribbble} type="text" placeholder='https://dribbble.com' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setDribbble(e.target.value)}} />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#52D22E]">
                              <div><FaBehance className='text-[28px] text-[#162449]'/> </div>
                              <div className='flex items-center w-[100%] text-[#162449] text-[20px]'><span className='flex-1 text-left'>Behance</span> </div>

                            </div>
                            <div className="w-[100%]">
                              <input value={behance} type="text" placeholder='https://behance.com' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setBehance(e.target.value)}} />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><FaLinkedinIn className='text-[28px] text-[#162449]'/> </div>
                              <div className='flex items-center w-[100%] text-[20px]'><span className='flex-1 text-left'>Linkedin</span> </div>

                            </div>
                            <div className="w-[100%]">
                              <input value={linkedin} type="text" placeholder='https://linkedin.com' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setLinkedin(e.target.value)}} />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><TbWorld className='text-[28px] text-[#162449]'/> </div>
                              <div className='flex items-center w-[100%] text-[20px]'><span className='flex-1 text-left'>Website</span> </div>

                            </div>
                            <div className="w-[100%]">
                              <input value={website} type="text" placeholder='www.google.com' className='w-[100%] border-[#162449] h-[50px] border px-5 rounded-[10px]' onChange={(e)=>{setWebsite(e.target.value)}} />
                            </div>
                          </div>
                          
                      </div>
                      </div>
                      <div className='w-[100%]  px-5' >
                      
                      <div className='flex flex-col gap-5 w-[100%] rounded-[10px] p-5 border'>
                      <div className='text-bold text-[30px] '>
                           Contact Details
                      </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><MdOutlineCall className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Phone No<sup className='text-red-500'>*</sup></span> </div>

                            </div>
                            <div className="w-[100%]">
                              <input value={phoneNo} type="text" placeholder='1234567890' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' maxLength={10} onChange={(e)=>{setPhoneNo(e.target.value)}} />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><RiWhatsappLine className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>WhatsApp No</span> </div>

                            </div>
                            <div className="w-[100%] ">
                              <input value={whatsapp} type="text" placeholder='1234567890 ' className='w-[100%]  h-[50px] border px-5 border-[#162449] rounded-[10px]' maxLength={10}  onChange={(e)=>{setWhatsapp(e.target.value)}} />
                            </div>
                          </div>
                          
                      </div>
                      </div>
               </div>
              
                             
                </div>
           
            
            </div>
           
         </div>
         </Fragment>
: 
null
}
  
    </Fragment>
  )
}

export default Profile