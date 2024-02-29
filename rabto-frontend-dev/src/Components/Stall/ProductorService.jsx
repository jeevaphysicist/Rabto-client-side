import React, { Fragment, useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import StallLogo from "../../Assets/Visitors/stallogo.png";
import cover from "../../Assets/Visitors/cover.png";
import MiniLogo from "../../Assets/Visitors/mini_logo.png";
import Footer from '../../MainComponents/Footer/Footer';
import { getServiceorproductforEventHandler } from '../../APIS/APIs';
import { useParams } from "react-router-dom";

const ProductorService = () => {
  const [serviceorproduct,setServiceOrProduct] = useState('');
    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(()=>{
       GetServicesOrProductsByID()  ;    
    },[])

  const GetServicesOrProductsByID = async ()=>{
      getServiceorproductforEventHandler(id).then(result=>{
        //  console.log("result",result);
         setServiceOrProduct(result.data);
      })
    }

    const goBack = () => {
      navigate(-1); 
    };
    
  return (
    <Fragment>
      <div className="border max-w-[400px] lg:max-w-[400px] m-auto realtive ">

        <div className='mx-5 min-h-screen pb-10'>
            <div className='flex p-4'>        
               <div className="flex-1 text-left"><FaArrowLeft className='text-[20px]' onClick={()=>{goBack()}} /></div>
            </div>
            {/* <div className='flex items-center justify-center mt-3'>
            <div className='w-[50px] h-[50px] rounded-full ' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
              <img src={StallLogo} className='w-[50px] h-[50px]  rounded-full' />
            </div>
            <div className='ml-4 flex items-center gilroyBold text-[28px]  text-[#162449]'>Archident oralcare </div>

            </div> */}
            <div className='ml-4 mt-10 flex items-center  gilroyBold text-[28px]  text-[#162449]'>{serviceorproduct?.title}</div>
            <div className='w-[100%] rounded-[50px] pb-20' style={{boxShadow: "0px 7px 11.399999618530273px 1px #1624494D"}}>
             <img src={serviceorproduct?.coverimage} className='w-[100%] rounded-[20px] mt-4 p-5 m-auto' alt="" />
              <ul className='flex flex-col gap-5 mx-[10px]'>
                <li>{serviceorproduct?.description}</li>
                {/* <li>2. Proper alignment of your teeth and jaws may improve not only the appearance of your teeth but also the health of your teeth and gums and the way you bite, chew and speak.</li> */}
              </ul>
            </div>

        </div>
        {/* Footer */}
          <Footer/>  
              </div>
    </Fragment>
  )
}

export default ProductorService