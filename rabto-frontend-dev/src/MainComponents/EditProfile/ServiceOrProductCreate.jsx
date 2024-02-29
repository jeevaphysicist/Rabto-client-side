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

import "swiper/css";
import "swiper/css/navigation"
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RiAccountCircleFill } from 'react-icons/ri';
import { MdDescription, MdOutlineModeEdit, MdOutlineModeEditOutline, MdTitle } from 'react-icons/md';
import { BsImageFill } from 'react-icons/bs';
import { UploadFile } from '../upload';
import { IoTrash } from 'react-icons/io5';
import { CreateServiceOrProductHandler ,DeleteServiceOrProductHandler,GetuserProductHandler,GetuserServiceHandler , NewServiedeorProduct, UpdateServiceOrProductHandler, userid } from '../../APIS/APIs';
import { FiTrash2 } from 'react-icons/fi';
import { setUserId } from 'firebase/analytics';

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
  const [UsedID,setUserID] = useState('');
  const [UserName,setUserName] = useState('');

  const handleModalClose = ()=>{
    setShowModal1(false);
    AfterUpdateHandler();
  }

  const HandleCoverImage = (e)=>{
    let file = e.target.files[0];
    if(file){
      let imageurl = URL.createObjectURL(file);
         setCoverImage(imageurl);
         UploadFile(file)
            .then((downloadURL) => {
              // console.log("Download URL:", downloadURL);
              setCoverImage(downloadURL)
             })
            .catch((error) => {
              // console.error("Error:", error);
               });
    }
  }

  useEffect(()=>{
   serviceHandler();
   productHandler();
  },[userData])

const serviceHandler = ()=>{
   GetuserServiceHandler(userData?._id).then(response=>{
      //  console.log("reponse service",response)
       setServices(response.data);
   })
  }

  const productHandler = ()=>{
   GetuserProductHandler(userData?._id).then(response=>{
      //  console.log("reponse Product",response)
       setProducts(response.data);
   })
  }

  const UpdateCreateHandler = async (action)=>{
   let data = {
      UserID:UsedID,
      title:title,
      description:description,
      type:isServiceOrProduct,
      coverimage:coverImage,
      userName:USER_NAME
   }
    // console.log("data",data);
   if(action === "CREATE"){
    NewServiedeorProduct("POST",data).then(response=>{
      //  console.log("response",response);
       if(response.isSuccess){
        //  serviceHandler();
        //   productHandler();
          handleModalClose();
        //   AfterUpdateHandler();
       }
   })
   }
   else if(action === "UPDATE"){
        // console.log("update handler!!")
         data.UserID = userid ;
         data.servicesid = serviceid;
   UpdateServiceOrProductHandler("POST",data).then(response=>{
            // console.log("response",response);
            if(response.isSuccess){
               serviceHandler();
                productHandler();
                handleModalClose();
               AfterUpdateHandler();
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
   setServiceID("")
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
  }

  return (
   
   <Fragment>
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
      services?.length > 0 ?     
      <div className='mt-10 mx-5'>
           <div className='text-[#000000] gilroyBold text-[18px] font-semibold mb-5'>Services</div>
           <Swiper
                slidesPerView={1.5}
                spaceBetween={10}
                // navigation={true}
                modules={[Navigation]}
                style={{padding:"10px 10px 20px 0px"}}
                >
                  {
                     services.length > 0 && services.map(item=>
                  <SwiperSlide className=' ' >
                   <div >
                  <div  className=' shadow-md relative shadow-[#1624494D]  pl-4 pt-3 pr-4 border rounded-[20px] h-[350px] w-[230px]' >
                   <div className="flex bg-[#162449] items-center justify-center rounded-[15px] w-[200px] h-[100px]">
                     <img src={item.coverimage} alt="product image" className='w-[200px] h-[100px] rounded-[15px]' />
                   </div>
                      
                     <div className="text-[#162449] mt-2 text-[18px] font-bold gilroyBold py-3 flex items-center justify-start">{item.title}</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5   '>
                    

                      <div className="flex gap-5 item-center justify-center flex-col w-[100%] mb-5">
                         <div className='w-[100%] '>
                            <button className="flex items-center gilroyBold text-[14px] w-[150px] h-[30px] m-auto justify-center gap-2 border border-[#9EE86F] rounded-[20px]" onClick={()=>{handleEdit(item)}}> <MdOutlineModeEdit /> Edit   </button>
                         </div>
                         <div className='w-[100%] '>
                            <button className="flex items-center gilroyBold text-[14px] w-[150px] h-[30px] m-auto justify-center gap-2 text-[#FFFFFF] bg-[#EB714C] rounded-[20px]" onClick={()=>DeleteHandler(item)}> <FiTrash2 /> Delete   </button>
                         </div>
                      </div>      
                            
                      </div>
                   </div>
                   </div>
                  </SwiperSlide>
                        )
                  }
                

                  
                  {/* <SwiperSlide className='w-100px h-[350px] ' >
                  <div className=' shadow-lg shadow-[#1624494D] px-4 py-5 border rounded-[20px] w-[220px] h-[350px]' >
                     <div className='h-[100px] w-[100%]  rounded-[20px] mb-3 '>
                      <img src={csc} className='w-[100%] object-cover' alt="" />
                     </div>
                     <div className="text-[#162449] text-[18px] font-bold gilroyBold py-3">Coimbatore SocialClub</div>
                     <div className="text-[#3E4152] text-[13px] font-bold gilroyBold py-3">Dynamic website</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5'>
                      <div className='flex items-center justify-center py-3 w-[100%]'>
                         <button className='w-[100%]   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                      </div>
                      </div>
                   </div>
                  </SwiperSlide> 
                  <SwiperSlide className='w-100px h-[350px]' >
                  <div className=' shadow-lg shadow-[#1624494D] px-4 py-5 border rounded-[20px] w-[220px] h-[350px]' >
                     <div className='h-[100px] w-[100%]  rounded-[20px] mb-3 '>
                      <img src={anna} className='w-[100%] object-cover' alt="" />
                     </div>
                     <div className="text-[#162449] text-[18px] font-bold gilroyBold py-3">Annalakshmi</div>
                     <div className="text-[#3E4152] text-[13px] font-bold gilroyBold py-3">Dynamic site with reservation module</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5'>
                      <div className='flex items-center justify-center py-3 w-[100%]'>
                         <button className='w-[100%]   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                      </div>
                      </div>
                   </div>
                  </SwiperSlide> 
                  <SwiperSlide className='w-100px h-[350px] ' >
                  <div className=' shadow-lg shadow-[#1624494D] px-4 py-5 border rounded-[20px] w-[220px] h-[350px]' >
                     <div className='h-[100px] w-[100%]  rounded-[20px] mb-3 '>
                      <img src={codingdeaf} className='w-[100%] object-cover' alt="" />
                     </div>
                     <div className="text-[#162449] text-[18px] font-bold gilroyBold py-3">Code for Deaf</div>
                     <div className="text-[#3E4152] text-[13px] font-bold gilroyBold py-3">Dynamic website</div>
                     <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5'>
                      <div className='flex items-center justify-center py-3 w-[100%]'>
                         <button className='w-[100%]   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                      </div>
                      </div>
                   </div>
                  </SwiperSlide>  */}
                  
            </Swiper>
          

        </div>
        :
        null
      }
       {
         products?.length > 0  ? 
         <div className='mt-10 mx-5'>
         <div className='text-[#000000] gilroyBold text-[18px] font-semibold mb-5'>Products</div>
         <Swiper
              slidesPerView={1.5}
              spaceBetween={10}
              // navigation={true}
              modules={[Navigation]}
              style={{padding:"10px 10px 20px 0px"}}
              >
               {
                  products.length > 0 &&
                 products.map(item=>
                  <SwiperSlide className=' ' >
                  <div >
                 <div  className=' shadow-md relative shadow-[#1624494D]  pl-4 pt-3 pr-4 border rounded-[20px] h-[350px] w-[230px]' >
                  <div className="flex bg-[#162449] items-center justify-center rounded-[15px] w-[200px] h-[100px]">
                    <img src={item.coverimage} alt="product image" className='w-[200px] h-[100px] rounded-[15px]' />
                  </div>
                     
                    <div className="text-[#162449] mt-2 text-[18px] font-bold gilroyBold py-3 flex items-center justify-start">{item.title}</div>
                    <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5   '>
                   

                     <div className="flex gap-5 item-center justify-center flex-col w-[100%] mb-5">
                        <div className='w-[100%] '>
                           <button className="flex items-center gilroyBold text-[14px] w-[150px] h-[30px] m-auto justify-center gap-2 border border-[#9EE86F] rounded-[20px]" onClick={()=>{handleEdit(item)}}> <MdOutlineModeEdit /> Edit   </button>
                        </div>
                        <div className='w-[100%] '>
                           <button className="flex items-center gilroyBold text-[14px] w-[150px] h-[30px] m-auto justify-center gap-2 text-[#FFFFFF] bg-[#EB714C] rounded-[20px]" onClick={()=>DeleteHandler(item)}> <FiTrash2 /> Delete   </button>
                        </div>
                     </div>      
                           
                     </div>
                  </div>
                  </div>
                 </SwiperSlide> 
                 )
               }

                {/* <SwiperSlide className='w-100px h-[350px] ' >
                <div className=' shadow-lg shadow-[#1624494D] px-4 py-5 border rounded-[20px] w-[220px] h-[350px]' >
                   <div className='h-[100px] w-[100%]  rounded-[20px] mb-3 '>
                    <img src={csc} className='w-[100%] object-cover' alt="" />
                   </div>
                   <div className="text-[#162449] text-[18px] font-bold gilroyBold py-3">Coimbatore SocialClub</div>
                   <div className="text-[#3E4152] text-[13px] font-bold gilroyBold py-3">Dynamic website</div>
                   <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5'>
                    <div className='flex items-center justify-center py-3 w-[100%]'>
                       <button className='w-[100%]   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                    </div>
                    </div>
                 </div>
                </SwiperSlide> 
                <SwiperSlide className='w-100px h-[350px]' >
                <div className=' shadow-lg shadow-[#1624494D] px-4 py-5 border rounded-[20px] w-[220px] h-[350px]' >
                   <div className='h-[100px] w-[100%]  rounded-[20px] mb-3 '>
                    <img src={anna} className='w-[100%] object-cover' alt="" />
                   </div>
                   <div className="text-[#162449] text-[18px] font-bold gilroyBold py-3">Annalakshmi</div>
                   <div className="text-[#3E4152] text-[13px] font-bold gilroyBold py-3">Dynamic site with reservation module</div>
                   <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5'>
                    <div className='flex items-center justify-center py-3 w-[100%]'>
                       <button className='w-[100%]   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                    </div>
                    </div>
                 </div>
                </SwiperSlide> 
                <SwiperSlide className='w-100px h-[350px] ' >
                <div className=' shadow-lg shadow-[#1624494D] px-4 py-5 border rounded-[20px] w-[220px] h-[350px]' >
                   <div className='h-[100px] w-[100%]  rounded-[20px] mb-3 '>
                    <img src={codingdeaf} className='w-[100%] object-cover' alt="" />
                   </div>
                   <div className="text-[#162449] text-[18px] font-bold gilroyBold py-3">Code for Deaf</div>
                   <div className="text-[#3E4152] text-[13px] font-bold gilroyBold py-3">Dynamic website</div>
                   <div className='absolute bottom-0 left-0 right-0 w-[100%] px-5'>
                    <div className='flex items-center justify-center py-3 w-[100%]'>
                       <button className='w-[100%]   bg-[#F4F4F4] rounded-[20px] py-2 text-[#162449] text-[13px] '>Discover</button>
                    </div>
                    </div>
                 </div>
                </SwiperSlide>  */}
                
          </Swiper>
        

      </div>
       :
       null
       }
      
        { showModal1 ?
    <Fragment>
         <div className='absolute top-0 bottom-0  left-0 right-0  z-10 bg-black opacity-60'></div>
        <div className="fixed max-w-[600px] lg:max-w-[400px] m-auto left-0 right-0 top-0 bottom-0 min-h-[100vh] z-10 bg-[#CBCBCB] ">
            <div className=' flex flex-col items-center justify-center m-auto  w-[100%] '>
                <div className='w-[100%] h-[100vh] overflow-y-scroll  bg-[#CBCBCB]' >
                <div className="sticky z-10 top-0">
               <div className=" grid grid-cols-3  w-[100%] py-5 px-5 bg-white rounded-b-[20px] ">
                <div className=' text-left'>
                    <IoMdArrowRoundBack className="text-[25px] font-bold active:text-[35px] " onClick={handleModalClose} />
                </div>
                <div className="text-[#130F26] text-center text-[20px]  vvdsfifties font-bold">Services/Products</div>
                <div className='text-end'>
                {
                     isEdit ?
                    <button className='text-[#52D22E] cursor-pointer font-bold' onClick={()=>{UpdateCreateHandler("UPDATE")}}>Save</button>
                     :
                    <button className='text-[#52D22E] cursor-pointer font-bold' onClick={()=>{UpdateCreateHandler("CREATE")}}>Add</button>
                  }
                </div>
               </div>
               </div>
               
               <div className='mx-5 flex py-10 mb-10 flex-col gap-10 rounded-[20px] p-5 bg-white mt-[30px]'>
               <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-3 text-[#5A5A5A] bg-white pl-2'>Title <sup className='text-[#D50B0B]'>*</sup></div>
                <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><MdTitle /></div>
                <input type="text" value={title} placeholder='title' className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setTitle(e.target.value)} />
               </div>
               <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-3 text-[#5A5A5A] bg-white pl-2'>UserID <sup className='text-[#D50B0B]'>*</sup></div>
                <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><MdTitle /></div>
                <input type="text" value={UsedID} placeholder='UserID' className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setUserID(e.target.value)} />
               </div>
               <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-3 text-[#5A5A5A] bg-white pl-2'>UserNAME <sup className='text-[#D50B0B]'>*</sup></div>
                <div className='absolute left-3 top-4 text-[#757575] text-[20px]'><MdTitle /></div>
                <input type="text" value={UserName} placeholder='userName' className='w-[100%] pl-10 h-[50px] border border-[#CBCBCB] rounded-[10px]' onChange={(e)=>setUserName(e.target.value)} />
               </div> 
               <div className=' relative Roboto-Font'>
                <div className='absolute left-3 -top-3 text-[#5A5A5A]  bg-white pl-2'> Descripiton <sup className='text-[#D50B0B]'>*</sup></div>
                <div className='absolute right-3 -top-4 text-[#757575]  text-[10px]' style={{fontWeight:500}}>( 0 / 1000 ) </div>
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
                        <div className='relative'>
                            <img src={coverImage} alt='Cover Image...'/>
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
         </Fragment>
: 
null
}
      
   </Fragment>
  )
}

export default Links