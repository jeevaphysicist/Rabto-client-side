import React from 'react';
import { BsGoogle } from "react-icons/bs";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { auth ,provider } from "../../Config/Firebase";
import { signInWithPopup } from "firebase/auth";
import { AfterLoginRedirectURL, UserAuthenticationHandler, UserCreateHandler } from "../../APIS/APIs";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
// import { jwtDecode} from "jwt-decode" ;



const GoogleLogins = ({handleStep}) => {

  let navigate = useNavigate();

const responseGoogle = async (response)=>{
  const responsePayload = jwtDecode(response.credential);
  const {email,name,sub,email_verified ,picture }=responsePayload;
  // console.log("response",responsePayload);
  const data = {email:email,
              displayName:name,  
              profilePhoto:picture,
              mobileNo:""         
                }

    // console.log("google response result",result);
    handleStep(true);
   
    
    UserCreateHandler("POST",data).then(response=>{
        //  console.log("response google signin",response);
         if(response.isSuccess){        
          const token = response.data.cookie;
          const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
          Cookies.set('mycookie', token, {expires , sameSite: 'none', secure: true }); 
          setTimeout(()=>{
             handleStep(false);     
            
             window.location.reload();
            //  window.location.href = AfterLoginRedirectURL;             
          },1000)
        
    }
    else{
      handleStep(false);   
    }
    
      })
     

  
     
}
  return (
    <div  className=" flex items-center justify-center gilroyMedium text-[18px] font-[600] " >
      <GoogleOAuthProvider clientId="478273431301-8ok0pcugo7mbmkfp6conrclugn786n8e.apps.googleusercontent.com">
        <GoogleLogin
        onSuccess={responseGoogle}
        onError={() => {
                      //  console.log('Login Failed');
                      }}             
        />
      </GoogleOAuthProvider>
      </div>
  )
}

export default GoogleLogins