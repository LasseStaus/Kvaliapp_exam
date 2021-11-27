import User from "../../models/User";

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const TOGGLE_VALID = 'TOGGLE_VALID';

export const EVENT_NOTIFICATIONS_TOGGLE = 'TOGGLE_NOTIFICATIONS_EVENT';
export const CHAT_NOTIFICATIONS_TOGGLE = 'TOGGLE_NOTIFICATIOSNS_CHAT';

import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

const api_key = 'AIzaSyAYgqRQP-h_8D_OTDbrG3e50E-3_nyvAvg';

export const restoreUser = (user: any, token: any) => {
    return { type: LOGIN, payload: { user, token } };
}

export const toggleUserValid = (isValid: any) => {
    return { type: TOGGLE_VALID, payload: isValid }
}
export const logout = () => {
    SecureStore.setItemAsync('userToken', "");
    SecureStore.setItemAsync('user', "");
    SecureStore.setItemAsync('expiration', "");
    SecureStore.setItemAsync('refreshToken', "");
    return { type: LOGOUT };
};

export const refreshToken = (refreshToken: string) => {

    return async (dispatch: any) => { // redux thunk
        console.log("refreshToken");
        console.log(refreshToken);
        const response = await fetch('https://securetoken.googleapis.com/v1/token?key=' + api_key, {
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

            dispatch({ type: REFRESH_TOKEN, payload: data.id_token })
        }
    };
}

export const login = (email: string, password: string) => {
    return async (dispatch: any) => { // redux thunk
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + api_key, {
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
            //token sættes en time foran
            expiration.setSeconds(expiration.getSeconds() + parseInt(data.expiresIn));
            SecureStore.setItemAsync('expiration', JSON.stringify(expiration));
            SecureStore.setItemAsync('refreshToken', data.refreshToken);
            dispatch({ type: LOGIN, payload: { user, token: data.idToken } })
        }
    };
};


export const signup = (email: any, password: any, props: any) => {
    // console.log(email + " " + password);
    return async (dispatch: any, getState: any) => { // redux thunk
        // console.log("again" + email + " " + password);
        const token = getState().user.token;
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + api_key, {
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
        const responseRealtime = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/userinfo.json?auth=' + data.idToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                id: data.localId,
                firstname:"",
                lastname:"",
                imageUrl:"",
                email: email,
                studyProgramme:"",
                chatToggle:false,
                eventToggle: false,
          

            })
        });

        const dataRealtime = await responseRealtime.json(); // json to javascript

        console.log(dataRealtime, 'prøv og se den her hahahahahhahahahahahahahahaha');
        console.log(data);
        if (!response.ok && !responseRealtime.ok) {
            //There was a problem..
        } else {
            console.log('find navn her', responseRealtime);
            const user = new User(dataRealtime.name, '', '', '', email, '', false, false);
            
            dispatch({ type: SIGNUP, payload: { user, token: data.idToken } })   
            props.navigation.navigate('OnboardUserinfoScreen') // working
        }
    };
};


export const updateUser = (fullName:string, studyProgramme:string, userInfoId:string, isValid:any, props:any) => {
    // console.log(name, studyProg, token);
    // console.log(email + " " + password);
    console.log('vi er her0');
    console.log(fullName, studyProgramme, userInfoId, isValid);
   return async (dispatch: any, getState: any) => { // redux thunk

    const token = getState().user.token;
    // console.log("again" + email + " " + password);
    const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/userinfo/' + userInfoId + '/.json?auth=' +  token, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            firstname:fullName,
    
            studyProgramme:studyProgramme,
        })
    });
 
       const data = await response.json(); // json to javascript
       console.log(data);
       if (!response.ok) {
           //There was a problem..
           console.log(response);
       } else {
        console.log(isValid);
        props.navigation.navigate('NotificationScreen') // working
        //     const user = new User(data.localId, data.firstname, '', '', email, data.studyProg);
        //    dispatch({type: SIGNUP, payload: { user, token: data.idToken } })
       }
   };
};

export const updateNotificationOnboardFlow = (setNotification: any, userInfo:any, props:any) => {
    // console.log(name, studyProg, token);
    // console.log(email + " " + password);
    console.log('vi er her updateNotification', setNotification);
   return async (dispatch: any, getState: any) => { // redux thunk

    const token = getState().user.token;
    // console.log("again" + email + " " + password);
    const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/userinfo/' + userInfo.id + '/.json?auth=' +  token, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            chatToggle:!setNotification,
            eventToggle:!setNotification,
        })
    });
       const data = await response.json(); // json to javascript
       console.log(data);
       if (!response.ok) {
           //There was a problem..
           console.log(response);
       } else {
        console.log('vi er her updateNotification', setNotification);
        console.log(setNotification)
        props.navigation.navigate('AppTutorialScreen1')
        const user = new User(userInfo.id, userInfo.firstName, userInfo.lastName, userInfo.imageUrl, userInfo.email, userInfo.studyProgramme, !userInfo.eventToggle, !userInfo.eventToggle); 
        dispatch({type: EVENT_NOTIFICATIONS_TOGGLE, payload: user})
        dispatch({type: CHAT_NOTIFICATIONS_TOGGLE, payload: user}) 
 /*        props.navigation.navigate('NotificationScreen')  */// working
        //     const user = new User(data.localId, data.firstname, '', '', email, data.studyProg);
        //    dispatch({type: SIGNUP, payload: { user, token: data.idToken } })
       }
   };
};



