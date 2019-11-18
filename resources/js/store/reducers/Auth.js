import * as ActionTypes from '../action-types'
import Http from '../../Http'
import localforage from 'localforage';
import cookie from "js-cookie";

const user = {
    id: null,
    name: null,
    email: null,
    createdAt: null,
    updatedAt: null
};

const initialState = {
    isAuthenticated : false,
    isLoading: true,
    user
};

const Auth = (state= initialState,{type,payload = null}) => {
    switch(type){
        case ActionTypes.SET_LOGIN:
            return setLogin(state,payload);
        case ActionTypes.AUTH_LOGIN:
            return authLogin(state,payload);
        case ActionTypes.AUTH_CHECK:
            return checkAuth(state);
        case ActionTypes.AUTH_LOGOUT:
            return logout(state);
        case ActionTypes.AUTH_USER_ADD:
            return authuserAdd(state,payload);
        case ActionTypes.USER_GROUP_LIST:
            return getUserGroupList(state,payload);
        case ActionTypes.SET_LOADER:
            return setLoader(state);
        case ActionTypes.DISABLE_LOADER:
            return disableLoader(state);
        default:
            return state;
    }


};

// ssadmin user add
const authuserAdd = (state,payload) => {

    const flashMessage = payload.message;
    const status = payload.success;

    state = Object.assign({}, state, {
        flash: flashMessage,
        status:status
    });
    return state;
}

const getUserGroupList = (state,payload) => {

    const flashMessage = payload.message;
    const status = payload.success;

    state = Object.assign({}, state, {
        flash: flashMessage,
        status:status
    });
    return state;
}
const authLogin = (state,payload) => {
    console.log('authlogin',payload);
    const jwtToken = payload.data.access_token;
    const user = payload.data.user;
    const permissions = payload.data.permission;
    setToken(jwtToken)
    Http.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

    state = Object.assign({}, state, {
        isAuthenticated: true,
        isLoading:false,
        user:user,
        permissions:permissions
    });
    return state;

};

const  setLoader = (state) => {
    console.log('dddd',state)
    state = Object.assign({},state,{isAuthenticated:true,isLoading:true
    });
    return state;
}

const  disableLoader = (state) => {
    return Object.assign({},state,{isAuthenticated:true,isLoading:false});
}
const setLogin = (state,payload) => {
    const user = payload.data.user;

    const permissions = payload.data.permission;
    state = Object.assign({}, state, {isAuthenticated:true,isLoading:false,user:user,permissions:permissions});
    console.log('setLogin',state);
    return state;
};

const setLocalForageToken = token => {
      if (!token) {
          cookie.remove("token");
      }
    cookie.set("token", token);
};

const setHttpToken = (token) => {
  if (!token) {
    Http.defaults.headers.common['Authorization'] = null;
  }

  Http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export const setToken = token => {
  setLocalForageToken(token);
  setHttpToken(token);
};

const checkAuth = (state,payload) =>{

    if(payload){
        if(payload.token){
            localStorage.removeItem('jwt_token');
            localStorage.setItem('jwt_token',payload.token);
            setToken(payload.token);
        }
    }
    state =Object.assign({},state,{
        isAuthenticated : !!localStorage.getItem('jwt_token'),
        isAdmin : localStorage.getItem('is_admin'),
    });

    if(state.isAuthenticated){
        Http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
    }
    return state;
};

const logout = (state) => {

    cookie.remove('token');
    localStorage.setItem('is_admin',false);
    state = Object.assign({},state,{
        isAuthenticated: false,
        isAdmin : false,
        user:{}
    });
    Http.defaults.headers.common['Authorization'] = "";
    return state;
};

export default Auth;
