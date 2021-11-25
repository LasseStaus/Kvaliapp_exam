import User from "../../models/User";

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

import * as SecureStore from 'expo-secure-store';


const api_key = 'AIzaSyBV2KOnzeYrwe6Lwz2B_NbMExB2Jo2aTNs';

export const restoreUser = (user:any, token:any) => {
    return {type: LOGIN, payload: { user, token } };
}

export const logout = () => {
    SecureStore.setItemAsync('userToken', "");
    SecureStore.setItemAsync('user', "");
    SecureStore.setItemAsync('expiration', "");
    SecureStore.setItemAsync('refreshToken', "");
    return {type: LOGOUT };
};

export const refreshToken = (refreshToken:any) => {
 
    return async (dispatch:any) => { // redux thunk
        console.log("refreshToken");
        console.log(refreshToken);
        const response = await fetch('https://securetoken.googleapis.com/v1/token?key=' +  api_key, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            })
        });
  
        const data = await response.json(); // json to javascript
        console.log("Data after refresh token");
        console.log(data);
        if (!response.ok) {
            //There was a problem..
        } else {
            
            dispatch({type: REFRESH_TOKEN, payload: data.id_token })
        }
    };   
}

export const login = (email:any, password:any) => {
   return async (dispatch:any) => { // redux thunk
       const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +  api_key, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ //javascript to json
               //key value pairs of data you want to send to server
               // ...
               email: email, 
               password: password,
               returnSecureToken: true
           })
       });
 
       const data = await response.json(); // json to javascript
       console.log(data);
       if (!response.ok) {
           //There was a problem..
       } else {
           
           const user = new User(data.localId, '', '', '', email);
            
           SecureStore.setItemAsync('userToken', data.idToken);
           SecureStore.setItemAsync('user', JSON.stringify(user));
           let expiration = new Date();
           expiration.setSeconds( expiration.getSeconds() + parseInt(data.expiresIn) );
           SecureStore.setItemAsync('expiration', JSON.stringify(expiration));
           SecureStore.setItemAsync('refreshToken', data.refreshToken);


           dispatch({type: LOGIN, payload: { user, token: data.idToken } })
       }
   };
};


export const signup = (email:any, password:any) => {
    // console.log(email + " " + password);
   return async (dispatch:any) => { // redux thunk
    // console.log("again" + email + " " + password);
       const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +  api_key, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ //javascript to json
               //key value pairs of data you want to send to server
               // ...
               email: email, 
               password: password,
               returnSecureToken: true
           })
       });
 
       const data = await response.json(); // json to javascript
       console.log(data);
       if (!response.ok) {
           //There was a problem..
       } else {
           
            const user = new User(data.localId, '', '', '', email);
           dispatch({type: SIGNUP, payload: { user, token: data.idToken } })
       }
   };
};
