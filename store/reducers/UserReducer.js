import { LOGIN, SIGNUP, LOGOUT, REFRESH_TOKEN, TOGGLE_VALID, EVENT_NOTIFICATIONS_TOGGLE, CHAT_NOTIFICATIONS_TOGGLE, UPDATE_SIGNUP_INFORMATION, CHECK_ERROR } from "../actions/UserActions";

const initialState = {
    loggedInUser: undefined,
    token: undefined,
    isValid: false,
    errorCode: '',
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case SIGNUP:
            return { ...state, loggedInUser: action.payload.user, token: action.payload.token };

        case UPDATE_SIGNUP_INFORMATION:

            return { ...state, loggedInUser: action.payload };
        case TOGGLE_VALID:
            //state.isHappy = true; //NOO !!!! State mutation not allowed
            return { ...state, isValid: action.payload };
        case EVENT_NOTIFICATIONS_TOGGLE:
            //state.isHappy = true; //NOO !!!! State mutation not allowed
             return { ...state, loggedInUser: action.payload }; 
     /*         return { ...state, loggedInUser: {...state.loggedInUser, eventToggle: action.payload} };  */
             
        case CHAT_NOTIFICATIONS_TOGGLE:
            //state.isHappy = true; //NOO !!!! State mutation not allowed
            return { ...state, loggedInUser: action.payload };

        case REFRESH_TOKEN:
            return { ...state, token: action.payload };
        case CHECK_ERROR:
            return { ...state, errorCode: action.payload };

        case LOGOUT:
            return { ...state, loggedInUser: undefined, token: undefined, isValid: false };

        case LOGIN:
            return {
                ...state, loggedInUser: action.payload.user,
                token: action.payload.token,
                isValid: true
            };

        default:
            return state;
    }
}

export default UserReducer;