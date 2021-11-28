import Event from '../../models/Event';

export const FETCH_EVENTS = 'FETCH_EVENTS';

export const fetchEvents = () => {
    return async (dispatch, getState) => { // redux thunk
        const token = getState().user.token; // accessing token in the state.

                                    // Find this link for YOUR firebase, in the "Realtime Database"-tab in the firebase console
                                    // You must use YOUR link and not this link, to save data in your database and not mine.
        const response = await fetch('https://kvaliapp-c1e89-default-rtdb.europe-west1.firebasedatabase.app/events.json?auth=' +  token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
  
        const data = await response.json(); // json to javascript
/*         console.log(data); */

        let events = [];
        for(const key in data) {

        
            events.push(new Event(key,data[key].eventName,data[key].imageUrl,data[key].eventType,data[key].eventTime,data[key].eventLocation));

        }

        if (!response.ok) {
            //There was a problem..
        } else {
            // do something?
            dispatch({ type: FETCH_EVENTS, payload: events })
        }
    };
};