import {Action, ConfigureStoreOptions, ThunkAction, combineReducers, configureStore} from "@reduxjs/toolkit"
import dateReducer from "./slice/dateSlice"
import authReducer from "./slice/authSlice"
import userReducer from "./slice/userSlice"
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    stateReconcile: autoMergeLevel2,
    blacklist:['date']
}
 
const rootReducer = combineReducers({
    date : dateReducer,
    auth : authReducer,
    user : userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined,) =>  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),...options,
})

export const store = createStore()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
const  persistor = persistStore(store); 
export { persistor }