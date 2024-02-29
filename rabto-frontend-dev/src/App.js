import React, { Fragment, Suspense, lazy, useEffect } from 'react';
import { Route, Routes , Navigate } from 'react-router-dom';
import Loading from './Components/Loading/Loading';
import AuthRoute from './RouteProtection/AuthRoute';
import Error404 from './Components/PageNotFound/Error404';
import Cookies from 'js-cookie';
import { checkCookieHandler } from './APIS/APIs';
import UserRoutes from './RouteProtection/AuthRoute';
import ScrollToTop from './ScrollToTop';
import { user} from "./APIS/CurrentUser";
import EventAdminDashboard from './MainComponents/eventCio/EventAdminDashboard';

const Login = lazy(() => import('./Components/Entry/Login'));
const Dashboard = lazy(() => import('./Components/Home/Index'));
const StallProfile = lazy(() => import('./Components/Stall/Profile'));
const ProductService = lazy(() => import('./Components/Stall/ProductorService'));
const ProfilePage = lazy(() => import('./MainComponents/Profile/Index'));
const DashboardPage = lazy(() => import('./MainComponents/Dashboard/Index'));
const EventInsights = lazy(() => import('./MainComponents/Dashboard/EventInsights'));
const EditProfile = lazy(() => import('./MainComponents/EditProfile/Index'));
const EditStall = lazy(() => import('./MainComponents/EditStall/Index'));
const Yuktijewels = lazy(() => import('./MainComponents/Profile/YuktijewelsProfile'));
const Profile = lazy(() => import('./MainComponents/NewProfile/Index'));
const NewStallProfile = lazy(() => import('./MainComponents/NewStallProfile/Index'));
const BookMark = lazy(() => import('./Components/Bookmark/index'));
const VisitorProfile = lazy(() => import('./Components/VisitorProfile/index'));
const ServiceOrProductCreate = lazy(() => import('./MainComponents/EditProfile/ServiceOrProductCreate'));
const ExportToExcel = lazy(() => import('./MainComponents/Dashboard/ExportToExcel'));
const ProfileV2 = lazy(() => import('./MainComponents/Profilev2/index'));
const Proxy = lazy(() => import('./Components/Proxy/index'));
const NewEventDashboard = lazy(() => import('./MainComponents/Dashboard/EventIndex'));


const App = () => {
  const cookie = Cookies.get("mycookie");
  // console.log("cookie app js",cookie);
  useEffect(()=>{
    // checkCookieHandler("POST",{check:"true"})
  },[])
  
  return (
    <Suspense fallback={<Loading/>}>
      <ScrollToTop/>  
      <Routes>
        {cookie ? 
        <Route  path="/"  element={<Navigate to={`/profile/${user.userName}`} />}/>
         :
        <Route path="/" element={<Login />} />       
        }

     
        
        <Route path="/dashboard" element={<UserRoutes> <Dashboard/> </UserRoutes> } />
        <Route path="/stallprofile" element={<StallProfile/>} />
        <Route path="/productservicedetails/:id" element={ <UserRoutes><ProductService/></UserRoutes>} />
        {/* <Route path="/profile/:profileUserName" element={<ProfilePage/>} /> */}
        {/* <Route path="/userdashboard" element={<UserRoutes> <DashboardPage/></UserRoutes> } /> */}
        <Route path="/userdashboard" element={<UserRoutes> <NewEventDashboard/></UserRoutes> } />
        <Route path="/eventinsights" element={<UserRoutes> <EventInsights/></UserRoutes>} />
        <Route path="/editprofile/:tab" element={<UserRoutes> <EditProfile/></UserRoutes>  } />
        <Route path="/editstall" element={<UserRoutes> <EditStall/> </UserRoutes> } />
        <Route path="/profile/yuktijewels" element={ <Yuktijewels/>  } />
        <Route path="/profile/username" element={ <Profile/>  } />
        <Route path="/stall/:stallid" element={<NewStallProfile/>  } />
        <Route path="/bookmark" element={<UserRoutes> <BookMark/> </UserRoutes> } />
        <Route path="/visitorprofile" element={ <VisitorProfile/>  } />
        <Route path="/createproductservices" element={ <ServiceOrProductCreate  />  } />
        <Route path="/excelexport" element={ <ExportToExcel  />  } />
        <Route path="/profile/:profileUserName" element={ < ProfileV2  />  } />
        <Route path="/proxy/:userID" element={ <Proxy/>  } />
        <Route path="*" element={<Error404/>} />
        <Route path="/dash" element={<EventAdminDashboard />} />
      </Routes>
    </Suspense>
  );
};

export default App;
