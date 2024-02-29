import React, { Fragment, useEffect, useState } from 'react';
import { FaArrowLeftLong, FaPen, FaRegImage, FaRegTrashCan } from "react-icons/fa6";
import { FaArrowLeft, FaFilePdf, FaPlusSquare, FaUserEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import StallLogo from "../../Assets/Visitors/stallogo.png";
import banner from "../../Assets/Visitors/banner1.png";
import  Minilogo from "../../Assets/Visitors/mini_logo.png";
import  gif from "../../Assets/Visitors/Development purpose.gif";
import { BsImageFill } from 'react-icons/bs';
import { MdDescription, MdOutlineCall, MdOutlineFileUpload, MdTitle } from 'react-icons/md';
import { LuType } from 'react-icons/lu';
import { IoMdArrowDropdown, IoMdArrowRoundBack } from 'react-icons/io';
import { RiAccountCircleFill } from 'react-icons/ri';
import { TbCategory, TbWorld } from 'react-icons/tb';
import { UploadFile } from '../upload';
import c1 from "../../Assets/Visitors/c1.png";
import c2 from "../../Assets/Visitors/c2.png";
import c3 from "../../Assets/Visitors/c3.png";
import c4 from "../../Assets/Visitors/c4.png";
import { CreateStallHandler, DeleteStallHandler, GetuserStallHandler, UpdateStallHandler, userid 
        ,GetuserServiceOrProductForStallHandler , AddaServiceOrProductTOStallHandler ,
         RemoveaServiceOrProductTOStallHandler , getStallServiesORProductsHandler } from '../../APIS/APIs';


const Profile = ({ USER_NAME }) => {
    const [showModal1 , setShowModal1]  = useState(false);
    const [showModal2 , setShowModal2]  = useState(false);
    const [isEdit , setIsEdit]  = useState(false);
    const [displayName,setDisplayName] = useState('');
    const [userName,setuserName] = useState('');
    const [descripiton,setDescription] = useState('');
    const [phoneNo,setPhoneNo] = useState('');
    const [website,setWebsite] = useState('');
    const [photo,setPhoto] = useState("");
    const [ebrochure,setEBrochure] = useState("");
    const [category,setCategory] = useState("");
    const [coverImage,setCoverImage] = useState("");
    const [stallProfile,setStallProfile] = useState("");
    const [allserviceproduct,setallserviceproduct] = useState([]);
    const [stallserviceproduct,setstallserviceproduct] = useState([]);
    const [Createproduct,setCreateProduct] = useState("");


  const handlePrint = () => {
    window.print();
  };
// console.log("cover image",coverImage);

  const handleModalClose = ()=>{
    setShowModal1(false);
    setShowModal2(false);
  }

  const HandleCoverImage = (e)=>{
    let file = e.target.files[0];
    if(file){
      let imageurl = URL.createObjectURL(file);
         setCoverImage(imageurl);
         UploadFile(file)
            .then((downloadURL) => {
            // Access the download URL here
              // console.log("Download URL:", downloadURL);
              setCoverImage(downloadURL)
             })
            .catch((error) => {
             // Handle any errors that occurred during the upload or obtaining the download URL
              // console.error("Error:", error);
               });


    }
  }

  const HandleProfilePhoto = (e)=>{
    let file = e.target.files[0];
    if(file){
      let imageurl = URL.createObjectURL(file);
         setPhoto(imageurl);
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


  const HandleEbrochure = (e)=>{
    let file = e.target.files[0];
    if(file){
         UploadFile(file)
            .then((downloadURL) => {
              // console.log("Download URL:", downloadURL);
              setEBrochure(downloadURL)
             })
            .catch((error) => {
              // console.error("Error:", error);
               });


    }
  }


  useEffect(()=>{
    getStallHandler();  
    GetAllProductOrServices();
   },[])

   useEffect(()=>{
    GetStallProductOrServicesHandler();     
   },[stallProfile])
 
 const getStallHandler = ()=>{
  GetuserStallHandler().then(response=>{
        // console.log("reponse event",response)
        setStallProfile(response.data);
 
    })
   }

  const GetAllProductOrServices = async ()=>{
    GetuserServiceOrProductForStallHandler().then(res=>{
      // console.log("response all products",res);
      setallserviceproduct(res.profileServices);
    })
  }

  // console.log("profileServices",allserviceproduct)

  const GetStallProductOrServicesHandler = async ()=>{
    if(stallProfile){
      let data= {
               ids :stallProfile.ServiceOrProductID
                }
                getStallServiesORProductsHandler("POST",data).then(res=>{
                  setstallserviceproduct(res.profileServices);
                  // console.log(" stall products response",res)
              })
    }
  }

  const AddStallProductOrServicesHandler = async (id)=>{
    if(id){
      let data= {
               stallId :stallProfile._id,
               serviceOrProductIdToAdd:id
                }
                AddaServiceOrProductTOStallHandler("POST",data).then(res=>console.log(" add stall products response",res))
    }
  }

  const RemoveStallProductOrServicesHandler = async (id)=>{
    if(stallProfile){
      let data= {
               stallId :stallProfile._id,
               serviceOrProductIdToRemove:id
                }
                RemoveaServiceOrProductTOStallHandler("POST",data).then(res=>console.log(" stall products response",res))
    }
  }

  

   const UpdateCreateHandler = async (action)=>{
    let data = {
       UserID:userid,
       name:displayName,
       description:descripiton,
       coverimage:photo,
       rabtoProfieLink:website ,
       category:category ,
       mobileNo:phoneNo , 
       ebrochure :ebrochure,
    }
    if(action === "CREATE"){
    CreateStallHandler("POST",data).then(response=>{
        // console.log("response",response);
        if(response.isSuccess){ 
        getStallHandler();
        handleModalClose()
      }
    })
    }
    else if(action === "UPDATE"){
        //  console.log("update handler!!")
         data.stallid = stallProfile._id ;
    UpdateStallHandler("POST",data).then(response=>{
            //  console.log("response",response);
             if(response.isSuccess){ 
              getStallHandler();
              handleModalClose();
             AfterUpdateHandler();

            }
 
         })
    }
 
   }
 
   const DeleteHandler = (item)=>{
    DeleteStallHandler("DELETE",{eventid:item._id}).then(response=>{
      //  console.log("response",response);
       if(response.isSuccess){ 
        getStallHandler();
        handleModalClose();

      }
 
   })
   }
   const AfterUpdateHandler =()=>{
    setIsEdit(false);
    setShowModal1(false);
    setDisplayName("");
    setDescription("");    
    setCategory("");
    setPhoto("");
    setEBrochure("");
    setPhoneNo("");
    setWebsite("");
   }
 
   const handleEdit = (data)=>{
    // console.log("data",data);
    setIsEdit(true);
    setShowModal1(true);
    setDisplayName(data.name);
    setDescription(data.description);    
    setCategory(data.category);
    setPhoto(data.coverimage);
    setEBrochure(data.ebrochure);
    setPhoneNo(data.mobileNo);
    setWebsite(data.rabtoProfieLink);
  
   }

  
// console.log("ebrochre",ebrochure)
// console.log("stall profile",stallProfile)

  


  return (
    <Fragment>
        <div className='mx-5 min-h-screen pb-5'>
            <div className='flex p-4'>        
               <div className="flex-1 text-left"><Link to={`/profile/${USER_NAME}`}><FaArrowLeft className='text-[20px]' /></Link></div>
               {/* <div className="flex-1 text-[12px] text-right text-[#3F3131] gilroyBold" ><span onClick={handlePrint} className='cursor-pointer'>E-brochure</span></div> */}
            </div>
            {
              !stallProfile  ?
              <Fragment>
                 <div className='flex mt-3 items-center gilroyBold text-[20px] justify-center text-[#3E4152] text-center'>Let's Create Your Profile</div>
                 <div className='mt-5 flex items-center justify-center gap-2'>
                 <button className='px-4 py-2 bg-[#000000] rounded-[6px] active:text-[13px] text-white' onClick={()=>setShowModal1(true)}>Create Stall Profile</button>
               
                  </div>
              </Fragment>
            :
            <Fragment>
            <div className='flex items-center justify-center relative'>
            <div className='w-[100px] h-[100px] rounded-full relative ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
              <img src={stallProfile?.coverimage} className='w-[100px] h-[100px]  rounded-full' />
              <button className='absolute top-0 right-0 text-[30px] active:text-[35px] text-white' onClick={()=>handleEdit(stallProfile)}>
              <FaPen className='border-black border bg-slate-400 p-1 rounded-[7px]'/>
              </button>
            </div>

            </div>
            <div className='flex mt-5 items-center gilroyBold text-[28px] justify-center text-[#162449]'>{stallProfile?.name} </div>
            <div className='flex mt-3 items-center gilroyBold text-[16px] justify-center text-[#3E4152] text-center'>{stallProfile?.description}</div>
             <div className='mt-5 flex items-center justify-center gap-2'>
               <button className='px-4 py-2 bg-[#000000] rounded-[6px] text-white'>Add Contact</button>
               <button className='px-4 py-2 bg-[#000000] rounded-[6px] text-white'>Profile</button>
               {/* <button className='px-4 py-2 bg-[#9EE86F] rounded-[6px] text-[#000000]'>BookMark</button> */}
             </div>
             <div className='relative'>
             <button className='absolute top-0 right-0 text-[30px] active:text-[35px] text-white' onClick={()=>setShowModal2(true)}>
              <FaPlusSquare className='border-black border bg-slate-400 p-1 rounded-[7px]'/>
              </button>
            
             <div className="text-[20px] font-bold  gilroyBold mt-10 pt-2 ml-2 text-[#162449]" style={{letterSpacing:"1px"}}>SERVICE / PRODUCT</div>
              
            <div className='grid grid-cols-4 gap-3 mt-3  pb-10 '>

                {
                  stallserviceproduct.length > 0 &&  stallserviceproduct.map(item=>
               <div className="col-span-2 m-auto relative">
             <button className='absolute top-0 right-0 text-[30px] active:text-[35px] text-white' onClick={()=>setShowModal2(true)}>
              <FaPen className='border-black border bg-slate-400 p-1 rounded-[7px]'/>
              </button>
              <button className='absolute top-0 left-0 text-[30px] active:text-[35px] text-red-500' onClick={()=>RemoveStallProductOrServicesHandler(item._id)} >
              <FaRegTrashCan className='border-black border bg-slate-400 p-1 rounded-[7px]' />
              </button>
                <div className="w-[150px] h-auto pb-1 rounded-[20px] shadow-lg">
                    <div>
                        <img src={item.coverimage} className='rounded-t-[20px] object-cover w-[100%] h-[110px]' alt="" />
                       <div className='text-[#162449] font-bold gilroyBold text-[12px] ml-3 m-2'>{item.title} </div>
                    </div>
                </div>
               </div>
               )
            }
            </div>
            </div>
            </Fragment>
           } 
        </div>
       
        

              { showModal2 ?
    <Fragment>
         <div className='absolute top-0 bottom-0 left-0 right-0  z-10 bg-black opacity-60'></div>
        <div className="absolute left-0 right-0 top-0 bottom-0 z-10 bg-white ">
            <div className=' flex items-center justify-center m-auto  w-[100%] '>
                <div className='w-[100%] h-[90vh] overflow-y-scroll  bg-white ' >
               <div className="sticky z-10 top-0">
               <div className=" flex  w-[100%] py-5 px-5 bg-white ">
                <div className='flex-1 text-left'>
                    <IoMdArrowRoundBack className="text-[25px] font-bold active:text-[35px] " onClick={handleModalClose} />
                </div>
                <div >
                  {
                    isEdit ?                  
                    <button className='text-[#52D22E] cursor-pointer font-bold' >Save</button>
                    :
                    <button className='text-[#52D22E] cursor-pointer font-bold' disabled={!Createproduct} onClick={()=>AddStallProductOrServicesHandler(Createproduct)}>Add</button>
                  }
                    </div>

               </div>
               </div>
               <div className='px-8 flex flex-col gap-5'>
               <div className='font-bold text-[18px] '> {isEdit ? "Edit" :  "Create" } a Profile </div>
               <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                 <select value={Createproduct} onChange={(e)=>setCreateProduct(e.target.value)}>
                  <option>--select Product or servies</option>
                  {allserviceproduct?.length > 0 &&
                   allserviceproduct.map(item=><option value={item._id}>{item.title}</option>) }
                  </select>             
               </div>
                          
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
        <div className="absolute left-0 right-0 top-0 bottom-0 z-10 bg-white ">
            <div className=' flex items-center justify-center m-auto  w-[100%] '>
                <div className='w-[100%] h-[98vh] overflow-y-scroll  bg-white ' >
               <div className="sticky z-10 top-0">
               <div className=" flex  w-[100%] py-5 px-5 bg-white ">
                <div className='flex-1 text-left'>
                    <IoMdArrowRoundBack className="text-[25px] font-bold active:text-[35px] " onClick={handleModalClose} />
                </div>
                <div >
                {
                    isEdit ?                  
                    <button className='text-[#52D22E] cursor-pointer font-bold' onClick={()=>UpdateCreateHandler("UPDATE")}>Save</button>
                    :
                    <button className='text-[#52D22E] cursor-pointer font-bold' onClick={()=>UpdateCreateHandler("CREATE")}>Add</button>
                  }
                </div>
               </div>
               </div>
               <div className='flex items-center justify-center gap-10  flex-col '>
                      <div className='w-[100%]  px-5' >
                      
                      <div className='flex flex-col gap-5 w-[100%] rounded-[10px] p-5 border'>
                      <div className='text-bold text-[30px] '>
                           User Details
                      </div>
                      <div className='flex flex-col gap-2  w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><FaRegImage className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Cover Image <sup className='text-red-500'>*</sup></span> </div>

                            </div>
                            <div className="w-[100%] flex items-center gap-5 rounded-[10px] border-[#162449] border p-4 ">
                              <input id="coverimage" type="file" className='hidden' onChange={HandleProfilePhoto} />
                              <label htmlFor='coverimage' className='p-5 relative flex items-center justify-center w-[100%]'>
                                {photo ? 
                                <div className='relative w-[200px] h-[200px] rounded-full'>
                                   <img src={photo} alt='Cover Image...' className='relative w-[200px] h-[200px] rounded-full'/>
                                </div> 
                                 :  
                                 <div className='flex flex-col items-center justify-center gap-10'> 
                                 <BsImageFill className='text-[150px] '/>
                                 <div className='text-center'> 500 X 500 </div>
                                  </div>
                                 }
                              </label>
                            </div>
                            
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><RiAccountCircleFill className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Display Name<sup className='text-red-500'>*</sup></span> <span className={`text-[10px] font-medium text-end   ${false? "text-red-500":""} `}>( 0 / 100 )</span></div>

                            </div>
                            <div className="w-[100%]">
                              <input  value={displayName} onChange={(e)=>setDisplayName(e.target.value)} type="text" placeholder='Jhon doe' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><MdDescription className='text-[28px] text-[#162449]' /></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Description <sup className='text-red-500'>*</sup></span> <span className={`text-[10px] font-medium text-end flex-1  ${false? "text-red-500":""} `}>( 0 / 1000 )</span></div>
                            </div>
                            <div className="w-[100%]">
                              <textarea value={descripiton}  onChange={(e)=>setDescription(e.target.value)}type="text" rows={5} placeholder='Hi , I am Jhon doe , Welcome to My E-profile' className='w-[100%]   border px-5 border-[#162449] rounded-[10px]' />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><TbCategory className='text-[28px] text-[#162449]' /></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Category <sup className='text-red-500'>*</sup> </span></div>
                            </div>
                            <div className="w-[100%] relative">
                            {/* <IoMdArrowDropdown className="absolute top-0 right-0 text-[30px] text-black" /> */}

                              <select value={category}  onChange={(e)=>setCategory(e.target.value)}  className='w-[100%] appearance-none border px-5 border-[#162449] rounded-[10px] h-[50px] ' >
                              <option value="">-- select a stall category --</option>                              
                              <option value="health" className='flex'> <img src={c1} alt="img.." className='w-[50px] h-[50px]' /> Health </option>
                              <option value="agriculture">Agriculture</option>
                              <option value="edutech">EduTech</option>
                              <option value="industry">Industry</option>
                              </select>
                            </div>
                          </div>
                          <div className='flex flex-col gap-2  w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><FaFilePdf className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>E-Brochure <sup className='text-red-500'>*</sup> </span> </div>

                            </div>
                            <div className="w-[100%] flex items-center gap-5 rounded-[10px] border-[#162449] border p-4 ">
                              <input id='ebrochure' type="file" className='hidden' onChange={HandleEbrochure} />
                              <label htmlFor='ebrochure' className='p-5 relative flex items-center justify-center w-[100%]'>
                                {ebrochure ? 
                                <div className='relative w-[200px] h-[200px] flex items-center justify-center rounded-full'>
                                  <div className='text-center'> E-Brochure Uploaded Successfully </div>
                                </div> 
                                 : 
                                 <div className='flex flex-col items-center justify-center gap-10'> 
                                 <MdOutlineFileUpload className='text-[150px] '/>
                                  {/* <div className='text-center'> 500 X 500 </div> */}
                                  </div>
                                 }
                              </label>
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
                              <input value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} type="text" placeholder='1234567890' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><TbWorld className='text-[28px] text-[#162449]'/> </div>
                              <div className='flex items-center w-[100%] text-[20px]'><span className='flex-1 text-left'>Rabto Profile URL <sup className='text-red-500'>*</sup> </span> </div>

                            </div>
                            <div className="w-[100%]">
                              <input value={website} onChange={(e)=>setWebsite(e.target.value)} type="text" placeholder='https://rabto.com/jhondoe' className='w-[100%] border-[#162449] h-[50px] border px-5 rounded-[10px]' />
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