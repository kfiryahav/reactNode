import React, { useEffect, useState } from 'react';
import { api_call, URL } from '../../services/api_calls';
// import { authantication } from '../../services/authantication';
import { Navigate, Outlet } from 'react-router-dom';

const Protected_rout_business = (props) => {

    // protect the routes if the user does not not a business
    return (props.bussiness === true ? <Outlet /> : <Navigate to="/user_info" />)
}

export default Protected_rout_business;
