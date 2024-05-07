import {Action, ConfigureStoreOptions, ThunkAction, combineReducers, configureStore} from "@reduxjs/toolkit"
import dateReducer from "./slice/dateSlice"
import authReducer from "./slice/authSlice"
import userReducer from "./slice/userSlice"
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from '@reduxjs/toolkit/query'
import { attendanceApi } from "./services/Attendance";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    stateReconcile: autoMergeLevel2,
    blacklist:['date', 'attendanceApi']
}
 
const rootReducer = combineReducers({
    date : dateReducer,
    auth : authReducer,
    user : userReducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined,) =>  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(attendanceApi.middleware),...options,
})

export const store = createStore();
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
const  persistor = persistStore(store); 
export { persistor };