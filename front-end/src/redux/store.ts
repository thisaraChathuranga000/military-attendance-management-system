import {Action, ThunkAction, combineReducers, configureStore} from "@reduxjs/toolkit"
import dateReducer from "./slice/dateSlice"
import authReducer from "./slice/authSlice"
 
const rootReducer = combineReducers({
    date : dateReducer,
    auth : authReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;