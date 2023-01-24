import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    // check if the user logged in or not
    const {user} = useContext(AuthContext)
    const location = useLocation()

    return (
        (user !== null && allowedRoles.includes(user?.data?.roleId)) ? <Outlet /> : 
        user?.token ? <Navigate to="/unauthorized" state={{ from: location }} replace /> : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth