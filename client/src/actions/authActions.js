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

//Register User 
export const register = ({name,email,password}) => dispatch => {
    // Headers 
    const config = {
        headers : {
            'Content-Type':'application/json'
        }
    }
    // request body 
    const body = JSON.stringify({name, email,password})

    axios.post('/api/users',body,config) //post req to tihis endpoint, 2nd param is body, 3rd param is the config which has the headers 
        .then(res => dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data //endpoint returns the user data and token
        }))
        .catch(err => {
            dispatch(
                returnErrors(err.response.data,err.response.status, 'REGISTER_FAIL')
            );
            dispatch({
                type:REGISTER_FAIL
            });
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
