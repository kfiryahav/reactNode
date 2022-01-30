import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const Protected_rout_user = (props) => {

    // protect the routes if the user does not login
    return (props.loginUser === true ? <Outlet /> : <Navigate to="/login" />);
}

export default Protected_rout_user;
