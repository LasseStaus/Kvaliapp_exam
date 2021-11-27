
import { FETCH_EVENTS} from "../actions/EventAction";

const initialState = {
    events: [] // new array
};

const EventReducer = (state = initialState, action) => {
    switch (action.type) {
      
        case FETCH_EVENTS: 
            return {...state, events: action.payload };

    default:
        return state;
    }
}

export default EventReducer;