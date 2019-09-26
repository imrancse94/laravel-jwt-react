import React from 'react'
import {Route,Redirect} from 'react-router'
import Main from '../Main'
import {connect} from "react-redux";


const PublicRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        <Component {...props}/>
    )}/>
);



export default PublicRoute;

