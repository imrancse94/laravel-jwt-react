import React from 'react'
import {Route,Redirect} from 'react-router'
import Main from '../Main'
import {connect} from "react-redux";


const PublicRoute = ({component: Component,isAuthenticated, ...rest}) => (
    <Route {...rest} render={props => (
        !isAuthenticated ? (
            <Main>
                <Component {...props}/>
            </Main>
        ) : (
            <Redirect to={{
                pathname: '/home',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
    }
};

export default connect(mapStateToProps)(PublicRoute);

