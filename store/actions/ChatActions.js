import ChatRoom from '../../models/ChatRoom';
import Message from './../../models/Message';
import User from './../../models/User';

export const TOGGLE_HAPPY = 'TOGGLE_HAPPY';
export const NEW_CHATROOM = 'NEW_CHATROOM';
export const DELETE_CHATROOM = 'DELETE_CHATROOM';
export const NEW_CHATMESSAGE = 'NEW_CHATMESSAGE';


export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';

export const toggleHappy = (isHappy) => {
    return { type: TOGGLE_HAPPY, payload: isHappy };
};



export const newChatRoom = (chatroomName) => {
    return async (dispatch, getState) => { // redux thunk
        const token = getState().user.token; // accessing token in the state.

                                    // Find this link for YOUR firebase, in the "Realtime Database"-tab in the firebase console
                                    // You must use YOUR link and not this link, to save data in your database and not mine.
                                    
        const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' +  token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                chatroomName: chatroomName,
                imageUrl: 'default-user-img.png',
                messages: []
            })
        });
  
        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
        } else {
            // do something?
            const chatRoom = new ChatRoom(data.name, 'default-user-img.png', chatroomName, []);
            dispatch({ type: NEW_CHATROOM, payload: chatRoom })
        }
    };
};

export const fetchChatRooms = () => {
    return async (dispatch, getState) => { // redux thunk
        const token = getState().user.token; // accessing token in the state.

                                    // Find this link for YOUR firebase, in the "Realtime Database"-tab in the firebase console
                                    // You must use YOUR link and not this link, to save data in your database and not mine.
        const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' +  token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
  
        const data = await response.json(); // json to javascript
        // console.log(data);

        let chatrooms = [];
        for(const key in data) {
            let messages = [];
            for(const key2 in data[key].messages) {
                let msg = data[key].messages[key2];
                messages.push(new Message(key2, msg.messageText, new Date(msg.messageTimestamp), msg.user));
            }

            chatrooms.push(new ChatRoom(key, data[key].imageUrl, data[key].chatroomName, data[key].messages ? messages : []));
        }

        if (!response.ok) {
            //There was a problem..
        } else {
            // do something?
            dispatch({ type: FETCH_CHATROOMS, payload: chatrooms })
        }
    };
};





export const deleteChatRoom = (chatroomName) => {
    return { type: DELETE_CHATROOM, payload: chatroomName };
};

export const newChatMessage = (chatRoomId, message) => {
    return async (dispatch, getState) => { // redux thunk
        const token = getState().user.token; // accessing token in the state.

        // const url = 'https://kvaliapp-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/' + chatRoomId + '/messages.json?auth=';
        // console.log("url " + url);
        // console.log("message", message);
                                    // Find this link for YOUR firebase, in the "Realtime Database"-tab in the firebase console
                                    // You must use YOUR link and not this link, to save data in your database and not mine.
        const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/' + chatRoomId + '/messages.json?auth=' +  token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...

                ...message
            })
        });
  
        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
        } else {
            // do something?
            dispatch({ type: NEW_CHATMESSAGE, payload: {chatRoomId, messageObj: message }})
        }
    };

    // const tempUser = new User('1', 'Peter Møller', 'Jensen', 'dummyUrlLink');
    // const messageObj = new Message(Math.random().toString(), message, new Date(), tempUser);
    // // console.log("************");
    // // console.log(messageObj);
    // // console.log("************");
    // return { type: NEW_CHATMESSAGE, payload: { chatRoomId, messageObj } };
};
