import * as ActionTypes from '../action-types'

export function authLogin(payload){
    return {
        type: ActionTypes.AUTH_LOGIN,
        payload
    }
}


export function authLogout(){
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

export function authCheck(){
    return {
        type:ActionTypes.AUTH_CHECK
    }
}
//userAdd
export function authuserAdd(payload){
    return {
        type:ActionTypes.AUTH_USER_ADD,
        payload
    }
}

export function authUserAddView(payload){
    return {
        type:ActionTypes.AUTH_USER_ADD_VIEW,
        payload
    }
}
