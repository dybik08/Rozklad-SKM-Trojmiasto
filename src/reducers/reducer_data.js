import {FETCH_DATA} from "../actions/fetchData";

export default function(state=[], action){
    switch(action.type){
        case FETCH_DATA:
            state=[];
            console.log("State in reducer: ", state);
            console.log("Data in reducer: ",action.payload);
            return[action.payload, action.station, ...state];
        default:
            return state;
    }
}