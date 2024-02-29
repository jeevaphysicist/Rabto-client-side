import Cookies from "js-cookie";
import{jwtDecode} from "jwt-decode" ;

       
// export const AfterLoginRedirectURL = `http://localhost:3000/dashboard`;

const BASE_URL = `http://localhost:8080`;
// const BASE_URL = `https://rabto-itf2.onrender.com`
// const BASE_URL = `https://rabto.onrender.com`;
export const Event_ID = "65b929047fbec74c0d978b7f"; 
      
const cookie = Cookies.get("mycookie");
let responsePayload = "";
let userID = "";
if(cookie){
responsePayload = jwtDecode(cookie);
// console.log("response Payload ",responsePayload);
userID = responsePayload.userName ;
}
export let userid = responsePayload.userName ;
let userName = "";
let profileUserID = "";
if (userID) {
    const getcurrentuser = async () => {
      try {
        let response = await fetch(`${BASE_URL}/api/user/get-current-user/${userID}`, { method: "GET" });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        let data = await response.json();
        // console.log("data", data);
        
        if (data && data.data) {
        //   console.log("data", data.data.userName);
          let name = data.data.userName;
          return name;
        } else {
        //   throw new Error("No data or user name found");
        }
      } catch (error) {
        // console.error("Error fetching current user data:", error);
        throw error;
      }
    }
  
    // Ensure the function is called within an async context
    const fetchUserName = async () => {
      try {
        let name = await getcurrentuser();
        return name ;
        // console.log("userName", name);
        // Do something with the userName
      } catch (error) {
        // console.error("Error fetching user name:", error);
      }
    };
    // Call the function
    userName = await fetchUserName();
  } 
  
// console.log("Access",userName);
export let USER_NAME= responsePayload.userName ;
// console.log("userName",userName);
// export const AfterLoginRedirectURL = `https://app.rabto.in/dashboard`;
export const AfterLoginRedirectURL = `http://localhost:3000/profile/${responsePayload.userName}`;


let options = {
      method:"",
      headers:{"Content-Type":"application/json"},
      body:"",
      credentials:"include",
}

export const UserAuthenticationHandler = (action,data)=>{
    options.method = action ;
    options.body = JSON.stringify(data);
    let output = fetch(`${BASE_URL}/api/auth/userauthentication`,options).then(res=>res.json());
    return output ;
} 

export const UserCreateHandler = (action,data)=>{
    options.method = action ;
    options.body = JSON.stringify(data);
    let output = fetch(`${BASE_URL}/api/auth/createuser`,options).then(res=>res.json());
    return output ;
}

export const checkCookieHandler = (action,data)=>{
    options.method = action ;
     data.cookie = cookie ;
    options.body = JSON.stringify(data);

    let output = fetch(`${BASE_URL}/api/check`,options).then(res=>res.json());
    return output ;
}

export const GetuserProfile = async (userName)=>{
    let output = fetch(`${BASE_URL}/api/user/get-a-user/${userName}`,{method:"GET"}).then(res=>res.json())
    return output ;
}

export const updateUserProfileHandler = (action,data)=>{
    options.method = action ;
    let value ={cookie : cookie, data};
        options.body = JSON.stringify(value);

    let output = fetch(`${BASE_URL}/api/user/update-user`,options).then(res=>res.json());
    return output ;
}

export const CreateServiceOrProductHandler = (action,data)=>{
   options.method = action ;
   data.cookie = cookie ;
   options.body = JSON.stringify(data);

  let output = fetch(`${BASE_URL}/api/serviceorproduct/create-service-or-product`,options).then(res=>res.json());
  return output ;
}

export const UpdateServiceOrProductHandler = (action,data)=>{
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);

 let output = fetch(`${BASE_URL}/api/serviceorproduct/update-service-or-product`,options).then(res=>res.json());
 return output ;
}

export const DeleteServiceOrProductHandler = (action,data)=>{
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);

 let output = fetch(`${BASE_URL}/api/serviceorproduct/delete-service-or-product`,options).then(res=>res.json());
 return output ;
}

export const GetuserServiceHandler = (userID)=>{
 let output = fetch(`${BASE_URL}/api/serviceorproduct/get-service-for-user/${userID}`,{method:"GET"}).then(res=>res.json());
 return output ;
}

export const GetuserProductHandler = (userID)=>{ 

  let output = fetch(`${BASE_URL}/api/serviceorproduct/get-product-for-user/${userID}`,{method:"GET"}).then(res=>res.json());
  return output ;
 }

 export const CreateEventHandler = (action,data)=>{
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);

 let output = fetch(`${BASE_URL}/api/event/create-event`,options).then(res=>res.json());
 return output ;
}

export const UpdateEventHandler = (action,data)=>{
 options.method = action ;
 data.cookie = cookie ;
 options.body = JSON.stringify(data);

let output = fetch(`${BASE_URL}/api/event/update-event`,options).then(res=>res.json());
return output ;
}

export const DeleteEventHandler = (action,data)=>{
 options.method = action ;
 data.cookie = cookie ;
 options.body = JSON.stringify(data);

let output = fetch(`${BASE_URL}/api/event/delete-event`,options).then(res=>res.json());
return output ;
}

export const GetuserEventHandler = (userID)=>{ 

 let output = fetch(`${BASE_URL}/api/event/get-event-for-user/${userID}`,{method:"GET"}).then(res=>res.json());
 return output ;
}

export const CreateStallHandler = (action,data)=>{
  // console.log("data",data);

  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);

 let output = fetch(`${BASE_URL}/api/stall/create-stall`,options).then(res=>res.json());
 return output ;
}

export const UpdateStallHandler = (action,data)=>{
  
 options.method = action ;
 data.cookie = cookie ;
 options.body = JSON.stringify(data);

let output = fetch(`${BASE_URL}/api/stall/update-stall`,options).then(res=>res.json());
return output ;
}

export const DeleteStallHandler = (action,data)=>{
 options.method = action ;
 data.cookie = cookie ;
 options.body = JSON.stringify(data);

let output = fetch(`${BASE_URL}/api/stall/delete-stall`,options).then(res=>res.json());
return output ;
}

export const GetuserStallHandler = (id)=>{ 
 let output = fetch(`${BASE_URL}/api/stall/get-stall-for-user/${id}`,{method:"GET"}).then(res=>res.json());
 return output ;
}

export const GetStallBYIDHandler = (id)=>{ 
  let output = fetch(`${BASE_URL}/api/stall/get-stall-for-id/${id}`,{method:"GET"}).then(res=>res.json());
  return output ;
 }

export const GetuserServiceOrProductForStallHandler = ()=>{ 
  let output = fetch(`${BASE_URL}/api/serviceorproduct/get-serviceorproduct-for-user/${userid}`,{method:"GET"}).then(res=>res.json());
  return output ;
 }

 export const AddaServiceOrProductTOStallHandler = (action,data)=>{ 
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);
  let output = fetch(`${BASE_URL}/api/stall/add-a-product-stall`,options).then(res=>res.json());
  return output ;
 }

 export const RemoveaServiceOrProductTOStallHandler = (action,data)=>{ 
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);
  let output = fetch(`${BASE_URL}/api/stall/delete-a-product-stall`,options).then(res=>res.json());
  return output ;
 }

 export const getStallServiesORProductsHandler = (action,data)=>{ 
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);
  let output = fetch(`${BASE_URL}/api/serviceorproduct/get-stall-serviceorproduct-for-user`,options).then(res=>res.json());
  return output ;
 }

 export const getStallforEventHandler = ()=>{ 
  let output = fetch(`${BASE_URL}/api/stall/get-all-stall-for-events`,{method:"GET"}).then(res=>res.json());
  return output ;
 }

 export const getServiceorproductforEventHandler = (id)=>{ 
  let output = fetch(`${BASE_URL}/api/serviceorproduct/service-or-product/${id}`,{method:"GET"}).then(res=>res.json());
  return output ;
 }

 export const ScannedVisitorStallCreate = (action , data)=>{ 
  options.method = action ;
  data.cookie = cookie ;
  //  console.log("data",data);
  options.body = JSON.stringify(data);
  let output = fetch(`${BASE_URL}/api/visitors/create-visitor-user`,options).then(res=>res.json());
  return output ;
 }

 export const ScannedUserStallCreate = (action , data)=>{ 
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);
  // console.log("data",data);
  // console.log("options",options);
  let output = fetch(`${BASE_URL}/api/stalluser/create-stall-user`,options).then(res=>res.json());
  return output ;
 }

 export const GetVisitorDetailsForEventsHandler = (action , data)=>{ 
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);
  let output = fetch(`${BASE_URL}/api/visitors/get-visitor-details-for-events`,options).then(res=>res.json());
  return output ;
 }

 export const BookMarkAStallHandler = (action , data)=>{ 
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);
  let output = fetch(`${BASE_URL}/api/visitors/update-bookmark`,options).then(res=>res.json());
  return output ;
 }


 export const NewServiedeorProduct = (action , data)=>{ 
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);
  let output = fetch(`${BASE_URL}/api/visitors/update-bookmark`,options).then(res=>res.json());
  return output ;
 }

 export const GetDashboardVisitorsForEvents = (action , data)=>{ 
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);
  let output = fetch(`${BASE_URL}/api/stalluser/get-stall-user-data`,options).then(res=>res.json());
  return output ;
 }

 export const LeadCreateHandler = (action , data)=>{ 
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);
  let output = fetch(`${BASE_URL}/api/stalluser/update-lead-rating`,options).then(res=>res.json());
  return output ;
 }

 export const getSubcriptionsHandler = (id)=>{ 
  let output = fetch(`${BASE_URL}/api/subscriptions/get-subcripitons`,{method:"GET"}).then(res=>res.json());
  return output ;
 }

 export const getUserDetailsForleadsHandler = (id)=>{ 
  let output = fetch(`${BASE_URL}/api/user/get-user-qr`,{method:"GET"}).then(res=>res.json());
  return output ;
 }


//  Proxy Part Start

export const handleFoodForUser = (userID , meal)=>{
  let output = fetch(`${BASE_URL}/api/proxy/${userID}/Food/${meal}`,{method:"GET"}).then(res=>res.json());
  return output ;
}

export const handleHallForUser = (userID , hall)=>{
  let output = fetch(`${BASE_URL}/api/proxy/${userID}/Hall/${hall}`,{method:"GET"}).then(res=>res.json());
  return output ;  
}

export const handleGiftForUser = (userID , gift)=>{
  let output = fetch(`${BASE_URL}/api/proxy/${userID}/Gift`,{method:"GET"}).then(res=>res.json());
  return output ;         
}

// Stall User Get GiftS AND USERS Start
export const NewEventTemparyAPIForGifts = (action , data)=>{ 
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);
  let output = fetch(`${BASE_URL}/api/dashboard/gift`,options).then(res=>res.json());
  return output ;
 }


// Stall User Get GiftS AND USERS End
export const NewEventTemparyAPIForVisitors = (action , data)=>{ 
  options.method = action ;
  data.cookie = cookie ;
  options.body = JSON.stringify(data);
  let output = fetch(`${BASE_URL}/api/dashboard/visitors`,options).then(res=>res.json());
  return output ;
 }