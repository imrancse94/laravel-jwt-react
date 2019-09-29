/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

//require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//require('./components/Example');
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DefaultLayout from "./containers/DefaultLayout";
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import * as action from './store/actions'
import jwt from "jsonwebtoken";
import Http from './Http';
import ReduxToastr from 'react-redux-toastr'; //https://www.npmjs.com/package/react-redux-toastr
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import cookie from "js-cookie";
import "./styles/custom.css";


const jwt_secret = "DlCFWtreimaKpPtn4Bb90FRbK2uk1yvcAKLuJUz4hsVF5hAADkrYNsJT9QB0R7vZ";

let token = cookie.get("token");

if (token) {
    jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
            cookie.remove("token");
            console.log('err');
            //token = null;
        } else {
            console.log('else err');
            if (decoded.iss !== "http://localhost:8000/api/auth/login") {
                console.log('else iss');
                cookie.remove("token");
                token = null;
            }
        }
    });
}

const render = () => {
    if (document.getElementById('example')) {
        ReactDOM.render(<Provider store={store}>
            <div>
                <Routes/>
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-right"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    closeOnToastrClick/>
            </div>
        </Provider>, document.getElementById('example'));
    }

};
if (token) {
    console.log('refresh');
    Http.post("/api/auth/me").then(res => {
        store.dispatch(action.authLogin(res.data));
        render();
    });
} else {
    console.log('refresh else');
    render();
}




