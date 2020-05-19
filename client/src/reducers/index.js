import {combineReducers } from "redux"
import itemReducer from "./itemReducer"
import errorReducer from "./errorReducer"
import authRedeucer from "./authReducer"

export default combineReducers({
    item:itemReducer,
    error:errorReducer,
    auth:authRedeucer
})













