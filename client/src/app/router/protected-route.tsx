import {Navigate, Outlet, useLocation} from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function ProtectedRoute(){
    const {user, isAuthenticated} = useAuth();

    const location = useLocation();

    if(!isAuthenticated || !user){
        return(
            <Navigate to="/login" replace state={{from:location}} />
        )
    }

    return <Outlet/>

}