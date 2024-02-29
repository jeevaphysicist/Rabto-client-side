import Cookies from "js-cookie";
import {Navigate, useLocation} from "react-router-dom";


const UserRoutes = ({children}) => {    
    if(!Cookies.get("mycookie")){
        return <Navigate to="/" replace />
    }
    return children
};


export default UserRoutes;