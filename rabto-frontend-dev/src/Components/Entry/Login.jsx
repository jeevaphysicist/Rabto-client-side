import React, { Fragment, useEffect, useState } from 'react'
import Stepone from './Stepone'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Steptwo from './Steptwo';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AfterLoginRedirectURL, UserCreateHandler } from '../../APIS/APIs';

const Login = () => {
   const [step,setStep] = useState({
           step1:true ,
           step2:false,
           step1Status:"PENDING",
           step2Status:"PENDING"
   });
   const [visitorDetails,setVisitorDetails] = useState({
                 email:"",
                 userName:"",
                 companyName:"",
                 mobileNo:"",
                 displayName:"",
                 profilePhoto:"",
   });

   let navigate = useNavigate();
 
useEffect(()=>{
      if(step.step1Status === "COMPLETED" && step.step2Status === "COMPLETED" ){
         AuthHandler();
      }
},[step])


const HandleStep1 = (action,data)=>{
   // console.log("action",action,data);
             if(action === true){
               const uniqueUsername = createRandomUsername(data.userName )
               setVisitorDetails((prev) => ({ ...prev, email: data.email, displayName: data.userName ,profilePhoto:data.profilePhoto ,userName:uniqueUsername }));
               setStep({step1:false, step1Status:"COMPLETED" ,step2:true , step2Status:"PENDING"}); 
            }
   }

   

const HandleStep2 = (action,data)=>{
      if(action === true){
         setVisitorDetails((prev) => ({ ...prev, mobileNo: data.mobileNo, companyName: data.companyName }));
         setStep({step1:false , step1Status:"COMPLETED" , step2Status:"COMPLETED" ,step2:true}); 
      }
   }

   function createRandomUsername(displayName) {
      // Remove spaces and convert to lowercase
      const sanitizedDisplayName = displayName.replace(/\s+/g, '').toLowerCase();
    
      const randomNumber = Math.floor(Math.random() * 9000) + 1000;
      const username = sanitizedDisplayName + randomNumber;
    
      return username;
    }

const AuthHandler = async ()=>{
        let data = visitorDetails ;
         let User = await UserCreateHandler("POST",data);
         // console.log("User Create ",User);
         if(User.isSuccess){
            const token = User.data.cookie;
            const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            Cookies.set('mycookie', token, {expires , sameSite: 'none', secure: true });             
            // navigate("/dashboard");
            window.location.href = AfterLoginRedirectURL;

         }

   }

   // console.log("visitorDetails" ,visitorDetails)
     
  return (
     <Fragment>
      <div className='bg-white border max-w-[600px] lg:max-w-[400px] m-auto'>
         
         <Stepone handleStep={HandleStep1} />
         
         {/* {
         step.step2 ?
        <Steptwo handleStep={HandleStep2} /> 
         :
         null
          }  */}
      </div>
     </Fragment>
  )
}

export default Login