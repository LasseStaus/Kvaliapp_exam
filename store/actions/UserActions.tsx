import User from "../../models/User";

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const TOGGLE_VALID = 'TOGGLE_VALID';
export const EVENT_NOTIFICATIONS_TOGGLE = 'TOGGLE_NOTIFICATIONS_EVENT';
export const CHAT_NOTIFICATIONS_TOGGLE = 'TOGGLE_NOTIFICATIONS_CHAT';
export const UPDATE_SIGNUP_INFORMATION = 'UPDATE_SIGNUP_INFORMATION';
export const CHECK_ERROR = 'CHECK_ERROR';


import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { Value } from "react-native-reanimated";

const api_key = 'AIzaSyAYgqRQP-h_8D_OTDbrG3e50E-3_nyvAvg';

export const restoreUser = (user: any, token: any, isValid: boolean) => {
    console.log("login2 is valid", isValid)
    return { type: LOGIN, payload: { user, token, isValid } };
}

export const toggleUserValid = (isValid: any) => {
    return { type: TOGGLE_VALID, payload: isValid }
}
export const logout = () => {
    SecureStore.deleteItemAsync('userToken');
    SecureStore.deleteItemAsync('user');
    SecureStore.deleteItemAsync('expiration');
    SecureStore.deleteItemAsync('refreshToken');
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

   /*   FETCHING ALL USERS EXAMPLE
         const responseRealtime = await fetch(`https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/userinfo/.json?auth=` + data.idToken, {  
             
           for (const key in dataRealtime) {
                if (dataRealtime[key].email === email) {
                    console.log("user fundet", dataRealtime[key])
                    userInfo = dataRealtime[key];
                }
            }          https://kvaliapp-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?orderBy="chatroomName"&equalTo="Test"&auth=' + token,
         */
        console.log("credentials", email, password)
        const responseRealtime = await fetch(`https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/userinfo.json?orderBy="email"&equalTo="${email}"&auth=` + data.idToken, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const userInfoObject = await responseRealtime.json();

            console.log("userinfoobjkect", userInfoObject)
           let userInfo;
            for (const key in userInfoObject) {
                console.log("user fundet", userInfoObject[key])
                userInfo = userInfoObject[key]
                console.log("inside fun", userInfoObject[key])
            }
         

        if (!response.ok) {
            //There was a problem..
        } else {
      
            const user = new User(userInfo.id, userInfo.firstname, userInfo.lastname, userInfo.imageUrl, userInfo.email, userInfo.studyProgramme, userInfo.chatToggle, userInfo.eventToggle); 
            SecureStore.setItemAsync('userToken', data.idToken);
            SecureStore.setItemAsync('user', JSON.stringify(user)); 
            let expiration = new Date();
            //token sættes en time foran
            expiration.setSeconds(expiration.getSeconds() + parseInt(data.expiresIn));
            SecureStore.setItemAsync('expiration', JSON.stringify(expiration));
            SecureStore.setItemAsync('refreshToken', data.refreshToken);
             dispatch({ type: LOGIN, payload: { user, token: data.idToken, isValid: true } }) 
        } 
    };
};


export const signup = (email: string, password: string, props: any) => {
    return async (dispatch: any) => { // redux thunk
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
        const responseRealtimeDatabase = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/userinfo.json?auth='
            + data.idToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data that is being sent to the server; Represents the user.js model
                id: data.localId,
                firstname: "",
                lastname: "",
                imageUrl: "",
                email: email,
                studyProgramme: "",
                chatToggle: false,
                eventToggle: false,
            })
        });
        const dataRealtimeDatabase = await responseRealtimeDatabase.json(); // json to javascript 
        if (!response.ok  && !responseRealtimeDatabase.ok ) {
            let errorMessage = data.error.message;

         /*    console.log(data,"all data")
            if(errorMessage == "INVALID_EMAIL"){
                console.log("yes", errorMessage)
            }
            if(errorMessage == "WEAK_PASSWORD"){
                console.log("PW", errorMessage)
            }  */

            console.log("Error Message", errorMessage) 
            dispatch({type: CHECK_ERROR, payload: errorMessage})
            //There was a problem..
        } else {
            const user = new User(dataRealtimeDatabase.name, '', '', '', email, '', false, false);
            SecureStore.setItemAsync('userToken', data.idToken);
            SecureStore.setItemAsync('user', JSON.stringify(user));
            let expiration = new Date();
            expiration.setSeconds(expiration.getSeconds() + parseInt(data.expiresIn));
            SecureStore.setItemAsync('expiration', JSON.stringify(expiration));
            SecureStore.setItemAsync('refreshToken', data.refreshToken);
            dispatch({ type: SIGNUP, payload: { user, token: data.idToken } })
            dispatch(updateCorrectDatabaseId(user, data.idToken)) 
            props.navigation.navigate('OnboardUserinfoScreen') 
        }
    };
};

export const updateCorrectDatabaseId = (userInfo: any, datatoken:any) => {
    return async (props: any) => { 
        const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/userinfo/'
         + userInfo.id + '/.json?auth=' + datatoken, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userInfo.id,
            })
        });
        const data = await response.json(); 
        console.log(data, "tredje funktion")
        console.log(data);
        if (!response.ok) {
            console.log(response);
        } else {
            console.log("response ok, user updated with correct ID in DB", userInfo.id );
        }
    };
};

export const updateUser = (fullName: string, studyProgramme: string, userInfo: any, props: any) => {
    return async (dispatch: any, getState: any) => { 
        const token = getState().user.token;
        const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/userinfo/' 
        + userInfo.id + '/.json?auth=' + token, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: fullName,
                studyProgramme: studyProgramme,
            })
        });
        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
        } else {
            const user = new User(userInfo.id, fullName, userInfo.lastname, userInfo.imageUrl, 
                                  userInfo.email, studyProgramme, userInfo.chatToggle, userInfo.eventToggle);
            SecureStore.setItemAsync('user', JSON.stringify(user));
            dispatch({ type: UPDATE_SIGNUP_INFORMATION, payload: user })
            props.navigation.navigate('NotificationScreen') 
        }
    };
};

/* function updateSecurestore(user, userToken, expiration, refreshToken) {

    if(user) {
        SecureStore.setItemAsync('user', JSON.stringify(user));
    }
    if(userToken) {
        SecureStore.setItemAsync('user', JSON.stringify(user));
    }
    if(expiration) {
        SecureStore.setItemAsync('user', JSON.stringify(user));
    }
    if(refreshToken) {
        SecureStore.setItemAsync('user', JSON.stringify(user));
    }

} */
export const updateNotificationOnboardFlow = (userInfo: any, props: any) => {
    return async (dispatch: any, getState: any) => { // redux thunk
        const token = getState().user.token;
        console.log('vi er heri update NOTIFICATION',  userInfo);
        const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/userinfo/' + userInfo.id + '/.json?auth=' + token, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chatToggle: true,
                eventToggle: true,
            })
        });
        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
            console.log(response);
        } else {
            const user = new User(userInfo.id, userInfo.firstname, userInfo.lastname, userInfo.imageUrl, userInfo.email, userInfo.studyProgramme, true, true);
            SecureStore.setItemAsync('user', JSON.stringify(user));
            dispatch({ type: EVENT_NOTIFICATIONS_TOGGLE, payload: user })
            dispatch({ type: CHAT_NOTIFICATIONS_TOGGLE, payload: user })
            props.navigation.navigate('AppTutorialScreen1')
            /*        props.navigation.navigate('NotificationScreen')  */// working
            //     const user = new User(data.localId, data.firstname, '', '', email, data.studyProg);
            //    dispatch({type: SIGNUP, payload: { user, token: data.idToken } })
        }
    };
};

export const toggleChatNotification = (userInfo: any, setNotificationBoolean: boolean) => {
    return async (dispatch: any, getState: any) => { // redux thunk
        const token = getState().user.token;
        const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/userinfo/' + userInfo.id + '/.json?auth=' + token, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chatToggle: !setNotificationBoolean,
            })
        });
        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
            console.log(response);
        } else {
            const user = new User(userInfo.id, userInfo.firstname, userInfo.lastname, userInfo.imageUrl, 
                                  userInfo.email, userInfo.studyProgramme, !setNotificationBoolean, userInfo.eventToggle);
            SecureStore.setItemAsync('user', JSON.stringify(user));
            dispatch({ type: CHAT_NOTIFICATIONS_TOGGLE, payload: user })
        }
    };
};
export const toggleEventNotification = (userInfo: any, setNotificationBoolean: boolean) => {
    return async (dispatch: any, getState: any) => { // redux thunk
        const token = getState().user.token;
        const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/userinfo/' + userInfo.id + '/.json?auth=' + token, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eventToggle: !setNotificationBoolean,
            })
        });
        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
            console.log(response);
        } else {
            const user = new User(userInfo.id, userInfo.firstname, userInfo.lastname, userInfo.imageUrl, 
                                  userInfo.email, userInfo.studyProgramme, userInfo.chatToggle, !setNotificationBoolean);
            SecureStore.setItemAsync('user', JSON.stringify(user));
            dispatch({ type: EVENT_NOTIFICATIONS_TOGGLE, payload: user })
        }
    };
};

export const updateGoingUser = (eventId: any, user: any) => {
    // console.log(name, studyProg, token);
    // console.log(email + " " + password);
    console.log('vi er her');
    console.log(eventId, user)
    return async (dispatch: any, getState: any) => { // redux thunk

        const token = getState().user.token;
        // console.log("again" + email + " " + password);
        const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/events/' + eventId + '/goingUsers.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...user
            })
        });

        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
            console.log(response);
        } else {
            console.log('goingUserAdded');

            //console.log(isValid);
            //dispatch(toggleUserValid(!isValid));
            //     const user = new User(data.localId, data.firstname, '', '', email, data.studyProg);
            //    dispatch({type: SIGNUP, payload: { user, token: data.idToken } })
        }
    };
};

export const updateInterestedUser = (eventId: any, user: any) => {
    // console.log(name, studyProg, token);
    // console.log(email + " " + password);
    console.log('vi er her');
    console.log(eventId, user)
    return async (dispatch: any, getState: any) => { // redux thunk

        const token = getState().user.token;
        // console.log("again" + email + " " + password);
        const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/events/' + eventId + '/interestedUsers.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...user
            })
        });

        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
            console.log(response);
        } else {
            console.log('interestedUserAdded');

            //console.log(isValid);
            //dispatch(toggleUserValid(!isValid));
            //     const user = new User(data.localId, data.firstname, '', '', email, data.studyProg);
            //    dispatch({type: SIGNUP, payload: { user, token: data.idToken } })
        }
    };
};