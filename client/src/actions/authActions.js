import axios from 'axios'; // axios is a http client , can use fetch api if u wanted to
import {returnErrors} from './errorActions';
import {    
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from "./types";

// Check token & load user

export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({type : USER_LOADING}); // dispatch user loading action
   
    axios.get('/api/auth/user',tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status));

            dispatch({
                type: AUTH_ERROR
            })
        });
}

// setup Config/headers and token
export const tokenConfig = getState => {
     // get token from local storage 
     const token =  getState().auth.token;
     // Headers
     const config = {
         headers : {
             "Content-type":"application/json"
         }
     }
 
     // If token, add to headers 
     if (token){
         config.headers["x-auth-token"] = token;
 
     }

     return config
}
