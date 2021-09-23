export const TOGGLE_HAPPY = 'TOGGLE_HAPPY';
export const NEW_CHATROOM = 'NEW_CHATROOM';

export const toggleHappy = (isHappy) => {
    return { type: TOGGLE_HAPPY, payload: isHappy }
};

export const newChatRoom = (chatroomName) => {
    return { type: NEW_CHATROOM, payload: chatroomName }
};