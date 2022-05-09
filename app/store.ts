import {combineReducers} from "@reduxjs/toolkit";

const SearchTermReducer = (state = '', action: { type: string, payload: string}) => {
    switch (action.type) {
        case "SET":
            return  action.payload;
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    searchT: SearchTermReducer
});
