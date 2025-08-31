import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const LogoutPage = () => {

    const {LogoutUser} = useAuth();

    useEffect(() => {
        LogoutUser();
    },[LogoutUser]);
    
    return <Navigate to="/" />
};