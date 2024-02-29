import React, { Fragment, useEffect, useRef, useState } from 'react';
import ProfileGIF from "../../Assets/Visitors/Development purpose.gif";
import Profileimg from "../../Assets/Visitors/profile.png";
import { FaBehance, FaBuilding, FaDribbble, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { TbWorld } from 'react-icons/tb';
import { IoMdArrowRoundBack, IoMdCall } from 'react-icons/io';
import { BsShieldFillCheck } from 'react-icons/bs';
import { IoMail, IoMenu, IoPersonCircleOutline } from 'react-icons/io5';
import { FaPen, FaRegImage } from "react-icons/fa";
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
import { handleProfileCropped } from '../uploadimg';
import { useParams } from 'react-router-dom';
import { GetuserProfile , updateUserProfileHandler, userid } from '../../APIS/APIs';
import SaveContact from './SaveContact';
import Footer from '../Footer/Footer';
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GoMail } from "react-icons/go";
import { FiEdit } from 'react-icons/fi';
import  Cropper  from "react-easy-crop";
import MiniLogo from "../../Assets/Visitors/mini_logo.png";
import Popup from '../Popup/Popup';
import SuccessFailure from '../SuccessFailure/SuccessFailure';
import Loading from '../../Components/Loading/Loading';
import getCroppedImg from "./getCroppedImg"; 
import CropSection from './CropSection';





const Profilenew = ({userData , USER_NAME , handleData}) => {

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
  const [uploading,setUploading] = useState(false);
  const [uploading2,setUploading2] = useState(false);
  const [isEditPopup,setIsEditPopup] = useState(false);

  const [isSuccessFail,setIsSuccessFail] = useState(false);
  const [isSuccess,setIsSuccess] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [croppingModal1Open,setCroppingModel1Open] = useState(false);
  const [croppingModal2Open,setCroppingModel2Open] = useState(false);
  const [message,setMessage] = useState("");


  const componentRef = useRef();

  let  { profileUserName } = useParams;

  
//user Photo Edit Modal
const handleModalClose = () => {
    setShowModal2(false);
    setShowModal1(false);
    setShowModal3(false);
    
  }; 
  
  const handlebannerDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedPhoto(URL.createObjectURL(file));
    setCroppingModel1Open(true);
    setShowModal2(false);
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

  

  const handleProfilePictureUpload = (e)=>{
        // console.log("photo profile image",e.target.files[0]);
        let file = e.target.files[0] ;
        if (file) {         
          var imageUrl = URL.createObjectURL(file);           
          setPhoto(imageUrl);
          setIsBtnLoading(true);
          setCroppingModel1Open(true);
          setShowModal3(false);
          // setUploading(true);
          // UploadFile(file)
          // .then((downloadURL) => {
          //   // console.log("Download URL:", downloadURL);
          //   setPhoto(downloadURL)
          //   setIsBtnLoading(false);
          //   setUploading(false);

          //  })
          // .catch((error) => {
          //   // console.error("Error:", error);
          //    });     
          
      }
  }

  const handleProfileBannerUpload = (e)=>{
    // console.log("first")
    console.log("photo banner handler",e.target.files[0]);
        let file = e.target.files[0] ;
        if (file) {         
              var imageUrl = URL.createObjectURL(file);           
              setBanner(imageUrl); 
              setIsBtnLoading(true);
              setCroppingModel2Open(true);
              setShowModal3(false);   
      }
  }

  // console.log("banner",banner)
  // console.log("profile photo",Photo);
  
  const ProfileUpdateHandler = ()=>{
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
      socialMedias:{
                 instagram:instagram,
                 facebook:facebook,
                 dribbble:dribbble,
                 behance:behance,
                 website:website,
                 linkedin:linkedin
                },
     }
    //  console.log("data",data)
     setIsLoading(true);
    updateUserProfileHandler("POST",data).then(response=>{
      setIsLoading(false);            
        // console.log("response",response);
        if(response.isSuccess){
           handleModalClose();
           handleData();
           setIsSuccessFail(true);
           setIsSuccess(true);
           setMessage(response.message);
           setTimeout(()=>{
            setIsSuccessFail(false);              
           },3000)
       }             
       else{
        setIsSuccessFail(true);
        setIsSuccess(false);
        setMessage(response.message)
        setTimeout(()=>{
          setIsSuccessFail(false);              
        },3000)
       }  
    })  
  }

const callPhoneNumber = (phoneNumber) => {
    if(phoneNumber)
     window.location.href = `tel:${phoneNumber}`; 
    };

const handleCreatemodel = (action)=>{
           if(action === true){
            ProfileUpdateHandler();
           }
           setIsEditPopup(false);
    }

const handleSuccessFail = ()=>{
    setIsSuccessFail(!isSuccessFail);
   }

const LinkAdjustmentsHandler = (link)=>{
  if (!link.startsWith('https://')) {
     return 'https://' + link;
   }
   return link;
  }



const handleProfileCroppedImgSet = (image)=>{
      //  console.log("image",image);
      setUploading(true);

      setCroppingModel1Open(false);
      setShowModal3(true);
       
       UploadFile(image)
       .then((downloadURL) => {
        console.log("Download URL: ", downloadURL);
           setPhoto(downloadURL);
           setIsBtnLoading(false);
           setUploading(false);
        })
       .catch((error) => {
         console.error("Error:", error);
         setUploading(false);
        }); 
}

const handleBannerCroppedImgSet = (image)=>{
  setCroppingModel2Open(false);
      setShowModal3(true);
      setUploading2(true);
  UploadFile(image)
  .then((downloadURL) => {
  //  console.log("Download URL: ", downloadURL);
      setBanner(downloadURL);
      setIsBtnLoading(false);
      setUploading2(false);
   })
  .catch((error) => {
    console.error("Error:", error);
    setUploading2(false);
   });
}

const handleprofilecancel = ()=>{
       setShowModal3(true);
       setCroppingModel1Open(false);
       setPhoto(userData.profilePhoto);
      }

const handlebannercancel = ()=>{
        setShowModal3(true);
        setCroppingModel2Open(false);
        setBanner(userData.banner)
       }

return (
    <Fragment>
      {
        croppingModal1Open ? 
        <CropSection imageSetHandler={handleProfileCroppedImgSet} image={Photo} cancelhandler={handleprofilecancel} aspect={1}/>
          :
        null
      }
      {
        croppingModal2Open ? 
      <CropSection imageSetHandler={handleBannerCroppedImgSet} image={banner} cancelhandler={handlebannercancel} aspect={2}/>
          :
        null
      }
       <div className='bg-white shadow-md w-[100%] md:max-w-[400px] fixed  z-20 py-5 h-[70px] rounded-b-[20px] border-1'>
        <div className='w-[100%]'>
        <button className=' top-5 right-5 text-[15px] m-auto items-center text-[#162604] font-medium w-[130px] py-1 active:text-[18px] bg-[#9EE86F] flex justify-center gap-1 rounded-[20px]' onClick={()=>{EditDataSetHandler() ;setShowModal3(true)}}>
          <MdOutlineModeEditOutline className='text-[#162604]  rounded-[7px] '/> <span>Edit</span>
        </button>
        </div>
      </div>
    <div className='min-h-[50vh] max-w-[768px] md:max-w-[400px] relative '>
    <div className='w-[100%] md:max-w-[400px] relative' >
      <div className='w-[100%] h-[220px]'>
        <img src={userData?.banner} loading="lazy" alt="Profile GIF" className='h-[220px] w-[100%] object-cover ' />
    {/* <button className='absolute top-[120px] left-[80%] text-[20px] items-center font-medium px-2 active:text-[35px] text-[#9EE86F] flex gap-1 rounded-full' onClick={()=>{EditDataSetHandler() ;setShowModal1(true)}}>
         <FiEdit className='' />
         </button> */}
       
        </div>
    </div>
    
    <div className='relative -top-[20px]  w-[100%]  px-3 mx-auto z-20   '>
        <div className={`${isAtTop ? "rounded-none" : "rounded-[10px]" } px-3 bg-[#FFFF] mx-auto transition-all duration-300 `} style={{
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
         }}>
         <div className=' relative m-auto  -top-[45px] w-[100px] h-[100px] rounded-full bg-white ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
              <img loading="lazy" src={userData?.profilePhoto} className='w-[100px] h-[100px]  rounded-full bg-white' />
              {/* <button className='absolute top-0 p-2 right-0 h-[35px] w-[35px] items-center font-medium px-2 active:text-[35px] border-[#9EE86F] flex gap-1 rounded-full' onClick={()=>{EditDataSetHandler() ;setShowModal2(true)}}>
                     <FiEdit className='text-[#9EE86F] text-[30px]' />
                  </button>
             */}
        </div>
        <div className='relative -top-[40px] m-auto '>
          <div className="flex items-center font-bold text-[24px] gilroyBold justify-center text-[#000000] relative">{userData?.displayName?.substring(0,15)}{userData?.displayName?.length > 15 ? "...":null} </div>
          <div className="flex items-center font-bold text-[16px] gilroyMedium justify-center text-center text-[#3E4152] px-4">{userData?.About?.substring(0,80)}{userData?.About?.length > 80 ? "...":null}</div>          
           <div className='flex items-center justify-center gap-5 mt-6'>
           {userData?.whatsapp ? <a  href={`https://wa.me/${userData?.whatsapp}`}
           target="_blank"
           rel="noopener noreferrer"
           ><FaWhatsapp className='text-[28px] text-[#162449]'/> </a> :null}
           {userData?.socialMedia?.instagram && userData?.socialMedia?.instagram.trim()  ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.instagram)}`} target='_blank'><FaInstagram className='text-[28px] text-[#162449]'/> </a> :null}
           {userData?.socialMedia?.facebook && userData?.socialMedia?.facebook.trim()  ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.facebook)}`} target='_blank'><FaFacebookF className='text-[28px] text-[#162449]'/></a>:null}
          
           {/* {userData?.socialMedia?.dribbble && userData?.socialMedia?.dribbble.trim() ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.dribbble)}`} target='_blank'><FaDribbble className='text-[28px] text-[#162449]'/></a>:null} */}
           {/* {userData?.socialMedia?.behance &&  userData?.socialMedia?.behance.trim() ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.behance)}`} target='_blank'><FaBehance className='text-[28px] text-[#162449]'/></a> :null} */}
           
           {userData?.socialMedia?.linkedin  && userData?.socialMedia?.linkedin.trim()  ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.linkedin)}`} target='_blank'><FaLinkedinIn className='text-[28px] text-[#162449]'/></a>:null}
           {userData?.socialMedia?.website && userData?.socialMedia?.website.trim()  ? <a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.website)}`} target='_blank'><TbWorld className='text-[28px] text-[#162449]'/></a>:null }
           </div>
        </div>
        </div>

        {/* <div className='flex mt-10 items-center justify-center gap-5 '>
           <div className=' text-end'><button className='inline-flex w-[150px]  items-center text-[#9EE86F] justify-center border-[2px] h-[48px] bg-[#0F2604] font-bold px-10 py-2 rounded-[50px] text-[14px] active:text-[12px] gap-3 '  onClick={()=>callPhoneNumber(userData?.mobileNo)}><IoMdCall/> Call</button></div>
           <div className=' text-start'>
           <SaveContact name={userData?.displayName} phoneNo={userData?.mobileNo} />
        </div>
        </div> */}

      
     {/* <Footer/>      */}

    </div>
    <div>
    </div>
    </div>

    
    { showModal2 ?
    <Fragment>
         <div className='absolute top-0 bottom-0 left-0 right-0  z-40 bg-black opacity-60'></div>
        <div className="absolute left-0 right-0 top-10 bottom-10 z-50">
            <div className=' flex items-center justify-center m-auto py-40  w-[100%]'>
                <div className='w-[90%] h-[50vh] relative   bg-black rounded-[20px]' >
               <div className=" realtive h-[50px] w-[100%]">
                    <IoCloseSharp className="text-[30px] text-white font-bold active:text-[35px] absolute right-10 top-5" onClick={handleModalClose} />
               </div>
               <div className='flex items-center mt-5 justify-center  flex-col'>
                 <input type="file" id="uplod-profile-image" className='hidden' onChange={handleProfilePictureUpload} />
                <label htmlFor='uplod-profile-image' className=' relative    w-[200px] h-[200px] rounded-full ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
                <img src={Photo} className='w-[200px] h-[200px]  rounded-full' />
                {uploading ?
                           <div className='absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-50 '>
                           <div className='z-20 flex items-center justify-center'>
                               <div className='felx flex-col'>
                                <div><img src={MiniLogo} alt="Logo" className='animate-pulse' /></div>
                                 <ReactLoading type="cylon" color="black"  />
                               </div>
                           </div>
                          </div>
                       :
                       null
                       }
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
        <div className="absolute left-0 right-0 top-10 bottom-10 z-50">
            <div className=' flex items-center justify-center m-auto  w-[100%]'>
              <div className='w-[90%] h-[50vh] overflow-y-scroll bg-black rounded-[20px]' >
               <div className=" realtive  h-[50px] w-[100%]">
                    <IoCloseSharp className="text-[30px] font-bold active:text-[35px] absolute right-10 top-5 text-[white]" onClick={handleModalClose} />
               </div>
               <div className='flex items-center justify-center h-[40vh] flex-col'>
               <input type="file" id="uplod-profile-image" className='hidden' onChange={handleProfileBannerUpload} />
                <label htmlFor='uplod-profile-image' className=' relative    w-[100%]  ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
                 <img src={banner} alt="Profile GIF" className='w-[100%] h-[200px] ' />
                 {uploading ?
                           <div className='absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-50 '>
                           <div className='z-20 flex items-center justify-center'>
                               <div className='felx flex-col'>
                                <div><img src={MiniLogo} alt="Logo" className='animate-pulse' /></div>
                                 <ReactLoading type="cylon" color="black"  />
                               </div>
                           </div>
                          </div>
                       :
                       null
                       }
                 
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
         <div className='fixed max-w-[768px] md:max-w-[400px] m-auto top-0 bottom-0 left-0 right-0 z-40 bg-white opacity-100'></div>
      {
        isLoading ?
                <div className='z-50'>
                  <Loading/>
                </div>
                :
        <>
        <div className="fixed max-w-[768px] md:max-w-[400px] m-auto left-0 right-0 top-0 bottom-0 z-50 bg-[#CBCBCB] ">
            <div className=' flex items-center justify-center m-auto  w-[100%] '>
                <div className='w-[100%] h-[98vh] overflow-y-scroll  bg-[#CBCBCB] ' >
               <div className="sticky z-10 top-0">
               <div className=" grid grid-cols-3  w-[100%] h-[90px] pt-10 px-5 bg-white rounded-b-[20px] ">
                <div className=' text-left'>
                    <IoMdArrowRoundBack className="text-[25px] font-bold active:text-[35px] " onClick={handleModalClose} />
                </div>
                <div className="text-[#130F26] text-center text-[20px]  vvdsfifties font-bold">User Details</div>
                <div className='text-end'>
                    <button disabled={ uploading || uploading2 } className={`${uploading || uploading2 ? "text-[red]" : "text-[#52D22E]"} cursor-pointer font-bold`} onClick={()=>{setIsEditPopup(true)}}>Save</button>
                </div>
               </div>
               </div>
               <div className='flex items-center justify-center gap-10 m-5 mt-[46px] pb-5 bg-white rounded-[20px] flex-col '>
                      <div className='w-[100%]  px-5 rounded-[20px]' >
                      
                      <div className='flex flex-col gap-10 w-[100%] rounded-[20px]'>
                      <div className=" flex  w-[100%] py-5 px-5 bg-white ">
                
                {/* <div className='flex-1 text-right' >
                    <button className='text-[#52D22E] cursor-pointer font-bold' onClick={ProfileUpdateHandler}>Save</button>
                </div> */}
               </div>

               <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-2  bg-white pl-2 text-[12px] text-[#5F5F5F]'>Display Name <sup className='text-[#D50B0B]'>*</sup></div>
                <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><IoPersonCircleOutline /></div>
                <input type="text" value={displayName} placeholder='Display Name' maxLength={20} className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setDisplayName(e.target.value)} />
               </div>
               {/* <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-3 text-[#5A5A5A] bg-white pl-2'>User Name <sup className='text-[#D50B0B]'>*</sup></div>
                <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><IoPersonCircleOutline /></div>
                <input type="text" value={userName} placeholder='User Name' className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setuserName(e.target.value)} />

               </div> */}
               <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-2 text-[12px] text-[#5F5F5F] bg-white pl-2'>Company name </div>
                <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><HiOutlineBuildingOffice2 /></div>
                <input type="text" value={companyName} placeholder='Company Name' className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setCompanyName(e.target.value)} />

               </div>
               <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-2 text-[12px] text-[#5F5F5F] bg-white pl-2'>Email ID <sup className='text-[#D50B0B]'>*</sup></div>
                <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><GoMail /></div>
                <div className='absolute right-2 top-4 text-[#222222] text-[13px] gilroyBold'>@gmail.com</div>
                <input type="text" value={email} placeholder='email@gmail.com' className='w-[100%] pl-10 pr-20 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setEmail(e.target.value)} />

               </div>
               <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-2 text-[12px] text-[#5F5F5F]  bg-white pl-2'> Descripiton </div>
                <textarea rows={10} maxLength={88} value={descripiton} placeholder='Give a Description about you' className=' py-5 h-[150px] w-[100%] px-10  border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setDescription(e.target.value)} ></textarea>

               </div>
               <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-2 text-[12px] text-[#5F5F5F]  bg-white pl-2'> Banner </div>
                {/* <div className='absolute right-3 -top-4 text-[#757575]  text-[10px]' style={{fontWeight:500}}>( { descripiton.length } / 1000 )</div> */}
                <div  className=' py-5 w-[100%] px-10 h-[80px] border border-[#CBCBCB] rounded-[10px]'  >

               <div className='flex items-center justify-center  flex-col'>
               <input type="file" id="uplod-banner-image" className='hidden' onChange={handleProfileBannerUpload}  />
                <label htmlFor='uplod-banner-image' className=' relative    w-[80px]  ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
                 <img src={banner} alt="Profile GIF" className='w-[200px] h-[40px] m-auto '  />
                 {uploading2 ?
                           <div className='absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-50 '>
                           <div className='z-20 flex items-center justify-center'>
                               <div className='felx flex-col'>
                                {/* <div><img src={MiniLogo} alt="Logo" className='animate-pulse' /></div> */}
                                 <ReactLoading type="cylon" color="black"  />
                               </div>
                           </div>
                          </div>
                       :
                       null
                       }
                 
                 </label>
                 {/* <button className={`${isBtnLoading ? " cursor-wait " : "cursor-pointer" } text-[white] bg-[green] mt-5 px-5 rounded-[20px] py-1 flex items-center text-[30px] active:text-[35px]`} onClick={ProfileUpdateHandler} >
             
                 {isBtnLoading ? <ReactLoading type="bubbles" color="white" width={30} height={30} /> : "Save" }
               </button> */}
               </div>
               </div>
               </div>

               <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-2 text-[12px] text-[#5F5F5F]  bg-white pl-2'> Profile Photo </div>
                {/* <div className='absolute right-3 -top-4 text-[#757575]  text-[10px]' style={{fontWeight:500}}>( { descripiton.length } / 1000 )</div> */}
                <div  className=' py-5 w-[100%] px-10 h-[80px] border border-[#CBCBCB] rounded-[10px]'  >

               <div className='flex items-center  justify-center  flex-col'>
                 <input type="file" id="uplod-profile-image" className='hidden' onChange={handleProfilePictureUpload} />
                <label htmlFor='uplod-profile-image' className=' relative    w-[30px] h-[30px] rounded-full ' >
                <img src={Photo} className='w-[30px] h-[30px]  rounded-full' />
                <div></div>
                {uploading ?
                           <div className='absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-50 '>
                           <div className='z-20 flex items-center justify-center'>
                               <div className='felx flex-col'>
                                {/* <div><img src={MiniLogo} alt="Logo" className='animate-pulse h-[20px] w-[20px]' /></div> */}
                                 <ReactLoading type="cylon" color="black"   />
                               </div>
                           </div>
                          </div>
                       :
                       null
                       }
                </label>
                {/* <div className='mt-5 font-light text-white'>500 <span className='font-semibold'>X</span> 500</div> */}
                {/* <button className={`${isBtnLoading ? " cursor-wait " : "cursor-pointer" } text-[white] bg-[green] mt-5 px-5 rounded-[20px] py-1 flex items-center text-[30px] active:text-[35px]`} onClick={ProfileUpdateHandler}>
             
                 {isBtnLoading ? <ReactLoading type="bubbles" color="white" width={30} height={30} /> : "Save" }
               </button> */}
               </div>
               </div>
               </div>

                      </div>
                      </div>
                      <div className='w-[100%]  px-5' >
                     
                      <div className='flex flex-col gap-10 w-[100%] rounded-[10px]  '>
                      <div className='text-bold text-[14px] gilroyBold '>
                           Social Media Links   
                      </div>
                        
                      <div className=' relative Roboto-Font'>
                         <div className='absolute left-3 -top-2 text-[12px] text-[#5F5F5F] bg-white pl-2'>Instagram </div>
                          <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><FaInstagram /></div>
                          <input type="text" value={instagram} placeholder='https://instagram.com/YOURID' className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setInstagram(e.target.value)} />
                       </div>
                       <div className=' relative Roboto-Font'>
                         <div className='absolute left-3 -top-2 text-[12px] text-[#5F5F5F] bg-white pl-2'>Facebook </div>
                          <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><FaFacebookF /></div>
                          <input type="text" value={facebook} placeholder='https://facebook.com/YOURID' className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setFacebook(e.target.value)} />
                       </div>
                       <div className=' relative Roboto-Font'>
                         <div className='absolute left-3 -top-2 text-[12px] text-[#5F5F5F] bg-white pl-2'>LinkedIn </div>
                          <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><FaLinkedinIn /></div>
                          <input type="text" value={linkedin} placeholder='https://linkedin.com/YOURID' className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setLinkedin(e.target.value)} />
                       </div>
                       <div className=' relative Roboto-Font'>
                         <div className='absolute left-3 -top-2 text-[12px] text-[#5F5F5F] bg-white pl-2'>Website </div>
                          <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><TbWorld /></div>
                          <input type="text" value={website} placeholder='https://yourwebsite.com' className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setWebsite(e.target.value)} />
                       </div>
                       

                          
                      </div>
                      </div>
                      <div className='w-[100%]  px-5' >
                      
                      <div className='flex flex-col gap-10 w-[100%] rounded-[10px] '>
                      <div className='text-bold text-[14px] gilroyBold '>
                           Contact Details  
                      </div>
                      <div className=' relative Roboto-Font'>
                       <div className='absolute left-3 -top-2 text-[12px] text-[#5F5F5F] bg-white pl-2'>Phone No </div>
                       <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><MdOutlineCall /></div>
                       <input type="text" value={phoneNo} placeholder='9898989898' className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setPhoneNo(e.target.value)} />
                      </div>
                      <div className=' relative Roboto-Font'>
                       <div className='absolute left-3 -top-2 text-[12px] text-[#5F5F5F] bg-white pl-2'>Whatsapp No </div>
                       <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><RiWhatsappLine /></div>
                       <input type="text" value={whatsapp} placeholder='9898989898' className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setWhatsapp(e.target.value)} />
                      </div>
                         
                          
                      </div>
                      </div>
               </div>
              
                             
                </div>
           
            
            </div>
           
         </div>
         </>
}
         {  isSuccessFail ?
          <SuccessFailure message={message} isSuccess={isSuccess} handlesucessFail={handleSuccessFail}/>
           :
           null
         }
         </Fragment>
: 
null
}

{
  isEditPopup ? 
  <Popup handleModel={handleCreatemodel} isEdit={true} />
  :
  null
}
 
</Fragment>
  )
}

export default Profilenew