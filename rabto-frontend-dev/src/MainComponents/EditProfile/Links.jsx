import React, { Fragment, useEffect, useState } from 'react';
import { Swiper , SwiperSlide} from "swiper/react";
import { Navigation  } from "swiper/modules";
import Rudra from "../../Assets/Visitors/rudra.png";
import csc from "../../Assets/Visitors/csc.png";
import codingdeaf from "../../Assets/Visitors/codingdeaf.png";
import anna from "../../Assets/Visitors/anna.png";
import Minilogo from "../../Assets/Visitors/mini_logo.png";
import rudra from "../../Assets/users/rudra.png";
import rkbakery from "../../Assets/users/rkbakery.png";
import dental from "../../Assets/users/dental.png";
import bo from "../../Assets/users/bo.png";
import { FaLink, FaPen, FaPlus, FaRegImage, FaRegTrashCan, FaSquarePlus } from "react-icons/fa6";
import { LuImagePlus, LuType } from "react-icons/lu";
import ReactLoading from 'react-loading';
import MiniLogo from "../../Assets/Visitors/mini_logo.png";



import "swiper/css";
import "swiper/css/navigation"
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RiAccountCircleFill } from 'react-icons/ri';
import { MdDescription, MdOutlineModeEdit, MdOutlineModeEditOutline, MdTitle } from 'react-icons/md';
import { BsImageFill } from 'react-icons/bs';
import { UploadFile } from '../upload';
import { IoTrash } from 'react-icons/io5';
import { CreateServiceOrProductHandler ,DeleteServiceOrProductHandler,GetuserProductHandler,GetuserServiceHandler , UpdateServiceOrProductHandler, userid } from '../../APIS/APIs';
import { FiTrash2 } from 'react-icons/fi';
import Popup from '../Popup/Popup';
import SuccessFailure from '../SuccessFailure/SuccessFailure';
import Loading from '../../Components/Loading/Loading';
import CropSection from './CropSection';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

const Links = ({ USER_NAME ,userData }) => {
  const [showModal1, setShowModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [coverImage,setCoverImage] = useState('');
  const [isServiceOrProduct,setIsServiceOrProduct] = useState("SERVICE");
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [link,setLink] = useState("");
  const [services,setServices] = useState([]);
  const [products,setProducts] = useState([]);
  const [serviceid,setServiceID] = useState('');
  const [uploading,setUploading] = useState(false);
  const [isEditPopup,setIsEditPopup] = useState(false);
  const [isCreatePopup,setIsCreatePopup] = useState(false);
  const [isDeletePopup,setIsDeletePopup] = useState(false);
  const [editdata,setEditData] = useState('');

  const [isSuccessFail,setIsSuccessFail] = useState(false);
  const [isSuccess,setIsSuccess] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [message,setMessage] = useState("");
  const [selectDeleteItem,setSelectDeleteItem] = useState("");
  const [croppingModal1Open,setCroppingModel1Open] = useState(false);

  const handleModalClose = ()=>{
    setShowModal1(false);
    AfterUpdateHandler();
  }

  const HandleCoverImage = (e)=>{
    let file = e.target.files[0];
    if(file){
      let imageurl = URL.createObjectURL(file);
         setCoverImage(imageurl);
         setCroppingModel1Open(true);
        //  setUploading(true);
        //  UploadFile(file)
        //     .then((downloadURL) => {
        //       // console.log("Download URL:", downloadURL);
        //       setCoverImage(downloadURL);
        //       setUploading(false);
        //      })
        //     .catch((error) => {
        //       // console.error("Error:", error);
        //        });

    }
  }

  useEffect(()=>{
   serviceHandler();
   productHandler();
  },[userData])

const serviceHandler = ()=>{
   GetuserServiceHandler(USER_NAME).then(response=>{
      //  console.log("reponse service",response)
       setServices(response.data);

   })
  }

  const productHandler = ()=>{
   GetuserProductHandler(USER_NAME).then(response=>{
      //  console.log("reponse Product",response)
       setProducts(response.data);
   })
  }

  const UpdateCreateHandler = async (action)=>{
   let data = {
      UserID:userid,
      title:title,
      description:description,
      type:isServiceOrProduct,
      coverimage:coverImage,
      link:link,
      userName:USER_NAME
   }
   setIsLoading(true)
   if(action === "CREATE"){
   CreateServiceOrProductHandler("POST",data).then(response=>{
      //  console.log("response",response);
       setIsLoading(false);

       if(response.isSuccess){
         serviceHandler();
          productHandler();
          handleModalClose(); 
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
       setMessage(response.message);
       setTimeout(()=>{
        setIsSuccessFail(false);              
      },3000)

       
      }  
   })
   }
   else if(action === "UPDATE"){
        // console.log("update handler!!")
         data.UserID = userid ;
         data.servicesid = serviceid;
        UpdateServiceOrProductHandler("POST",data).then(response=>{
            // console.log("response",response);
            setIsLoading(false);

            if(response.isSuccess){
               serviceHandler();
                productHandler();
                handleModalClose();
               AfterUpdateHandler();
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
            setMessage(response.message);
            setTimeout(()=>{
             setIsSuccessFail(false);              
           },3000)
     
            
           }  



        })
   }

  }

  const DeleteHandler = (item)=>{
   DeleteServiceOrProductHandler("DELETE",{serviceid:item._id}).then(response=>{
      // console.log("response",response);
      if(response.isSuccess){
         serviceHandler();
          productHandler();
          handleModalClose();
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
       setMessage(response.message);
       setTimeout(()=>{
        setIsSuccessFail(false);              
      },3000)

       
      } 
  })
  }
  const AfterUpdateHandler =()=>{
   setIsEdit(false);
   setShowModal1(false);
   setCoverImage("");
   setTitle("");
   setDescription("");
   setIsServiceOrProduct("");
   setLink("");
   setServiceID("");
   setEditData("");
  }

  const handleEdit = (data)=>{
  //  console.log("data",data);
   setIsEdit(true);
   setShowModal1(true);
   setCoverImage(data.coverimage);
   setTitle(data.title);
   setDescription(data.description);
   setIsServiceOrProduct(data.type);
   setLink(data.link);
   setServiceID(data._id)
   setEditData(data);
  }

  const handleEditmodel = (action)=>{
    if(action === true){
      UpdateCreateHandler("UPDATE")
    }
    setIsEditPopup(false);
}
const handleCreatemodel = (action)=>{
  if(action === true){
    UpdateCreateHandler("CREATE")
  }
   setIsCreatePopup(false);
}

const handleDeletemodel = (action)=>{
  if(action === true){
    DeleteHandler(selectDeleteItem);
  }
   setIsDeletePopup(false);
}




const handleSuccessFail = ()=>{
setIsSuccessFail(!isSuccessFail);
}

const handleCoverCroppedImgSet = (image)=>{
  //  console.log("image",image);
  setUploading(true);

  setCroppingModel1Open(false);
  setShowModal1(true);
   
   UploadFile(image)
   .then((downloadURL) => {
    console.log("Download URL: ", downloadURL);
       setCoverImage(downloadURL);
       setUploading(false);
    })
   .catch((error) => {
     console.error("Error:", error);
    }); 
}


const handlecancel = ()=>{
  setShowModal1(true);
  setCroppingModel1Open(false);
  if(isEdit){
  console.log("editdata.coverImage",editdata)
  setCoverImage(editdata.coverimage);
  }
  else
  setCoverImage("");
 }


  return (
   
   <Fragment>
        {
                isLoading ?

                <Loading/>
                :
                null
            }

{
        croppingModal1Open ? 
      <CropSection imageSetHandler={handleCoverCroppedImgSet} image={coverImage} cancelhandler={handlecancel} aspect={2}/>
          :
        null
      }
      {/* <div className='p-4 w-[100%] text-center'>Note : <q>You Can Create Upto 5 category</q></div> */}
      {/* <div className='px-4 w-[100%] flex items-center font-bold text-[20px]'> <div className='flex-1 left'>Create a category</div> <div className='text-[12px] text-end'>( 0 / 50 )</div> </div> */}
       {/* <div className='flex items-center p-4 w-[100%] gap-3 '>
            <input type="text" className='border-[2px] border-green-600 w-[100%] h-[50px] rounded-[10px]' />
             <button className='border-[2px] border-green-600 px-2 py-2 rounded-[10px] active:text-[13px] text-[green]'>Add</button>
         </div> */}
         {/* <div className=' p-4 w-[100%]  '>
            <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1 overflow-hidden">
                  <div className='flex gap-5 items-center justify-center'><IoTrash  /> <FaPen  /></div>
                 <div> {`category1category1category1category1category1`.slice(0, 15)}{16 < 15 ? <span>...</span> : null}</div>
                </div>
                <div className="col-span-1 overflow-hidden">{`category1category1category1category1category1`.slice(0, 15)}{16 < 15 ? <span>...</span> : null}</div>
                <div className="col-span-1 overflow-hidden">{`category1category1category1category1category1`.slice(0, 15)}{16 < 15 ? <span>...</span> : null}</div>
                <div className="col-span-1 overflow-hidden">{`category1category1category1category1category1`.slice(0, 15)}{16 < 15 ? <span>...</span> : null}</div>
                <div className="col-span-1 overflow-hidden">{`category1`.slice(0, 15)}{16 < 15 ? <span>...</span> : null}</div>
            </div>
         </div> */}
      <div className='flex items-center p-4 mt-10'>
        <div className='flex-1 text-[20px] text-left font-bold'>Services / Products </div>
        <div className=' text-right   font-bold'> <button className='bg-[#9EE86F] flex gap-2 text-[16px] active:text-[18px] items-center justify-center rounded-[52px] px-5 py-1 text-[#0F2604] ' onClick={()=>setShowModal1(true)}><FaPlus  className='text-[#1C1B1F]' /> Add</button> </div>
         </div>

         {
                        services?.length > 0  ?
                        <Fragment>
                               <div className="flex items-center ml-5 mt-3 mb-3 text-[25px] gilroyMedium justify-start  text-[#162449]" style={{fontWeight:700}}>Services</div>

                        <ScrollMenu>
                            {services.map((item, index) => (
                                 <div className='ml-5 my-5'>
                                 <div  className=' shadow-md relative shadow-[#1624494D]  pl-2 pt-3 pr-2 border rounded-[20px] h-[290px] w-[230p' >
                                  <div className="flex bg-[#162449] items-center justify-center rounded-[15px] w-[150px] h-[100px]">
                                    <img src={item.coverimage} alt="product image" className='w-[150px] h-[100px] rounded-[15px] object-cover' />
                                  </div>
                                     
                                    <div className="text-[#162449] mt-2 text-[18px] font-bold gilroyBold py-3 flex items-center justify-start">{item?.title?.substring(0,15)}{item?.item?.length > 15 ? "..." : null}</div>
                                    <div className='absolute bottom-0 left-0 right-0 w-[100%] px-2   '>
                                   
               
                                     <div className="flex gap-3 item-center justify-center flex-col w-[100%] mb-5">
                                        <div className='w-[100%] '>
                                           <button className="flex items-center gilroyBold text-[14px] w-[95%] h-[30px] m-auto justify-center gap-2 border border-[#9EE86F] rounded-[20px]" onClick={()=>{handleEdit(item)}}> <MdOutlineModeEdit /> Edit   </button>
                                        </div>
                                        <div className='w-[100%] '>
                                           <button className="flex items-center gilroyBold text-[14px] w-[150px] h-[30px] m-auto justify-center gap-2 text-[#FFFFFF] bg-[#EB714C] rounded-[20px]" onClick={()=>{setSelectDeleteItem(item);setIsDeletePopup(true)}}> <FiTrash2 /> Delete   </button>
                                        </div>
                                     </div>      
                                           
                                     </div>
                                  </div>
                                  </div>
                            ))}
                        </ScrollMenu>
                        </Fragment>
                        :
                        null
                        }

                 {
                      products?.length > 0  ? 
                       <Fragment>
                       <div className="flex items-center ml-5 mt-3 mb-3 text-[25px] gilroyMedium justify-start  text-[#162449]" style={{fontWeight:700}}>Products </div>

                        <ScrollMenu>
                            {products.map((item, index) => (
                                 <div className='ml-5 my-5'>
                                 <div  className=' shadow-md relative shadow-[#1624494D]  pl-2 pt-3 pr-2 border rounded-[20px] h-[290px] w-[230p' >
                                  <div className="flex bg-[#162449] items-center justify-center rounded-[15px] w-[150px] h-[100px]">
                                    <img src={item.coverimage} alt="product image" className='w-[150px] h-[100px] rounded-[15px] object-cover' />
                                  </div>
                                     
                                    <div className="text-[#162449] mt-2 text-[18px] font-bold gilroyBold py-3 flex items-center justify-start">{item?.title?.substring(0,15)}{item?.item?.length > 15 ? "..." : null}</div>
                                    <div className='absolute bottom-0 left-0 right-0 w-[100%] px-2   '>
                                   
               
                                     <div className="flex gap-3 item-center justify-center flex-col w-[100%] mb-5">
                                        <div className='w-[100%] '>
                                           <button className="flex items-center gilroyBold text-[14px] w-[95%] h-[30px] m-auto justify-center gap-2 border border-[#9EE86F] rounded-[20px]" onClick={()=>{handleEdit(item)}}> <MdOutlineModeEdit /> Edit   </button>
                                        </div>
                                        <div className='w-[100%] '>
                                           <button className="flex items-center gilroyBold text-[14px] w-[150px] h-[30px] m-auto justify-center gap-2 text-[#FFFFFF] bg-[#EB714C] rounded-[20px]" onClick={()=>{setSelectDeleteItem(item);setIsDeletePopup(true)}}> <FiTrash2 /> Delete   </button>
                                        </div>
                                     </div>      
                                           
                                     </div>
                                  </div>
                                  </div>
                            ))}
                        </ScrollMenu>
                        </Fragment>
                        :
                        null
                       }
        
        
     
      
        { showModal1 ?
    <Fragment>
         <div className='absolute top-0 bottom-0  left-0 right-0  z-10 bg-black opacity-60'></div>
        <div className="fixed max-w-[600px] lg:max-w-[400px] m-auto left-0 right-0 top-0 bottom-0 min-h-[100vh] z-10 bg-[#CBCBCB] ">
            <div className=' flex flex-col items-center justify-center m-auto  w-[100%] '>
                <div className='w-[100%] h-[100vh] overflow-y-scroll  bg-[#CBCBCB]' >
                <div className="sticky z-10 top-0  ">
               <div className=" grid grid-cols-3 h-[120px]  w-[100%] pt-[60px]  px-5 bg-white rounded-b-[20px] ">
                <div className=' text-left'>
                    <IoMdArrowRoundBack className="text-[25px] font-bold active:text-[35px] " onClick={handleModalClose} />
                </div>
                <div className="text-[#130F26] text-center text-[20px]  vvdsfifties font-bold">Services/Products</div>
                <div className='text-end'>
                {
                     isEdit ?
                    <button disabled={ uploading } className={`${uploading  ? "text-[red]" : "text-[#52D22E]"} cursor-pointer font-bold`}  onClick={()=>{setIsEditPopup(true)}}>Save</button>
                     :
                    <button disabled={ uploading  } className={`${uploading  ? "text-[red]" : "text-[#52D22E]"} cursor-pointer font-bold`} onClick={()=>{setIsCreatePopup(true)}}>Add</button>
                  }
                </div>
               </div>
               </div>
               
               <div className='mx-5 flex py-10 mb-10 flex-col gap-10 rounded-[20px] p-5 bg-white mt-[30px]'>
               <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-3 text-[#5A5A5A] bg-white pl-2'>Title <sup className='text-[#D50B0B]'>*</sup></div>
                <div className='absolute right-3 -top-4 text-[#757575]  text-[10px]' style={{fontWeight:500}}>( { title.length } / 50 ) </div>

                <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><MdTitle /></div>
                <input type="text" value={title} placeholder='title' className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setTitle(e.target.value)} />
               </div> 
               <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-3 text-[#5A5A5A]  bg-white pl-2'> Descripiton <sup className='text-[#D50B0B]'>*</sup></div>
                <div className='absolute right-3 -top-4 text-[#757575]  text-[10px]' style={{fontWeight:500}}>( { description.length } / 100 ) </div>
                <textarea rows={10} value={description} placeholder='Give a Description ' className=' py-5 w-[100%] px-10  border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setDescription(e.target.value)} ></textarea>

               </div>    
               <div className='flex flex-col gap-2  w-[100%]  text-[16px] Roboto-Font'>
                            <div className="flex items-center gap-5 text-[#5A5A5A] ">
                              <div className='flex items-center w-[100%] ml-5 Roboto-Font'><span className='flex-1 text-left '>Type<sup className='text-[#D50B0B]'>*</sup></span> </div>
                            </div>
                            <div className="w-[100%] flex items-center gap-5 rounded-[10px]  px-4 py-2 ml-3 ">
                              <div className='flex items-center gap-2 '>
                              <input id="service" checked={isServiceOrProduct === "SERVICE"}  type="radio" name="type"  className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setIsServiceOrProduct("SERVICE")}} />
                              <label htmlFor='service'>Service</label>
                              </div>
                              <div className='flex items-center gap-2'>
                              <input id="product" checked={isServiceOrProduct === "PRODUCT"}  type="radio" name="type"  className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setIsServiceOrProduct('PRODUCT')}} />
                              <label htmlFor='product'>Product</label>
                              </div>
                            </div>
                            
                          </div>
               <label className=' relative Roboto-Font w-[100%] flex items-center justify-center   h-[200px] border border-[#CBCBCB] rounded-[10px]'>
                <div className='absolute left-3 -top-3 text-[#5A5A5A] bg-white pl-2'>Cover Image <sup className='text-[#D50B0B]'>*</sup></div>
                <input type="file"  placeholder='title' className='w-[100%] hidden pl-10 h-[200px] border border-[#CBCBCB] rounded-[10px]' onChange={HandleCoverImage} />
                {
                 coverImage ? 
                        <div className='relative w-[180px] h-[160px] flex items-center justify-center'>
                            <img src={coverImage} alt='Cover Image...' className='w-[150px] m-auto h-auto'/>
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
                        </div> 
                        :  
                        <div className='flex text-[24px] items-center justify-center'><LuImagePlus /></div>
                }
               </label>
                         
                          {/* <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><MdTitle className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Title<sup className='text-red-500'>*</sup></span> <span className={`text-[10px] font-medium text-end   ${false? "text-red-500":""} `}>( 0 / 100 )</span></div>

                            </div>
                            <div className="w-[100%]">
                              <input value={title}  onChange={(e)=>{setTitle(e.target.value)}}  type="text" placeholder='give a title ' className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' />
                            </div>
                          </div> */}
                          {/* <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><MdDescription className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Description<sup className='text-red-500'>*</sup></span> <span className={`text-[10px] font-medium text-end   ${false? "text-red-500":""} `}>( 0 / 5000 )</span></div>

                            </div>
                            <div className="w-[100%]">
                              <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={10}   type="text" placeholder='give a descritpion about your product or service' className='w-[100%] border px-5 border-[#162449] rounded-[10px]' />
                            </div>
                          </div>
                          <div className='flex flex-col gap-2 w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><FaLink className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Link</span> </div>

                            </div>
                            <div className="w-[100%]">
                              <input value={link} onChange={(e)=>setLink(e.target.value)}    type="text" placeholder='https://google.com' className='w-[100%] border px-5 border-[#162449] h-[50px] rounded-[10px]' />
                            </div>
                          </div> */}
                          {/* <div className='flex flex-col gap-2  w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><LuType className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Type<sup className='text-red-500'>*</sup></span> </div>

                            </div>
                            <div className="w-[100%] flex items-center gap-5 rounded-[10px] border-[#162449] border p-4 ">
                              <div className='flex items-center gap-2 '>
                              <input id="service" checked={isServiceOrProduct === "SERVICE"}  type="radio" name="type"  className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setIsServiceOrProduct("SERVICE")}} />
                              <label htmlFor='service'>Service</label>
                              </div>
                              <div className='flex items-center gap-2'>
                              <input id="product" checked={isServiceOrProduct === "PRODUCT"}  type="radio" name="type"  className='w-[100%] h-[50px] border px-5 border-[#162449] rounded-[10px]' onChange={(e)=>{setIsServiceOrProduct('PRODUCT')}} />
                              <label htmlFor='product'>Product</label>
                              </div>
                            </div>
                            
                          </div> */}
                          {/* <div className='flex flex-col gap-2  w-[100%] font-semibold text-[16px]'>
                            <div className="flex items-center gap-5 text-[#162449]">
                              <div><FaRegImage className='text-[28px] text-[#162449]'/></div>
                              <div className='flex items-center w-[100%]'><span className='flex-1 text-left text-[20px]'>Cover Image <sup className='text-red-500'>*</sup></span> </div>

                            </div>
                            <div className="w-[100%] flex items-center gap-5 rounded-[10px] border-[#162449] border p-4 ">
                              <input id="coverimage" type="file" className='hidden' onChange={HandleCoverImage} />
                              <label htmlFor='coverimage' className='p-5 relative flex items-center justify-center w-[100%]'>
                                {coverImage ? 
                                <div className='relative'>
                                   <img src={coverImage} alt='Cover Image...'/>
                                </div> 
                                 :  
                                 <BsImageFill className='text-[150px] '/>

                                 }
                              </label>
                            </div>
                            
                          </div> */}
               </div>
               <div className='h-[60px] my-auto    bottom-0 left-0 right-0 '>
              <div className='flex flex-col items-center justify-center  '>
                    <div className="flex  items-center relative  justify-center px-5 ">
                      <img src={Minilogo} alt='Minilogo' className='w-[33px]' />
                      <span className='text-[33px] vvdsfifties text-[#0F2604]'>RABTO</span>         
                      <div className='absolute bottom-0 left-[52px] text-[#0F2604] text-[6px] text-center'>A Product of theDot Tech</div>
                     
                      </div>
                </div>
              </div>
                             
                </div>
              
            
            </div>
          
         </div>

         {  isSuccessFail ?
          <SuccessFailure message={message} isSuccess={isSuccess} handlesucessFail={handleSuccessFail}/>
           :
           null
         }
         </Fragment>
: 
null
}

{  isSuccessFail ?
          <SuccessFailure message={message} isSuccess={isSuccess} handlesucessFail={handleSuccessFail}/>
           :
           null
         }
         
{
  isCreatePopup ? 
  <Popup handleModel={handleCreatemodel} isCreate={true} />
  :
  null
}
{
  isEditPopup ? 
  <Popup handleModel={handleEditmodel} isEdit={true} />
  :
  null
}

{
  isDeletePopup ? 
  <Popup handleModel={handleDeletemodel} isDelete={true} />
  :
  null
}
      
   </Fragment>
  )
}

export default Links