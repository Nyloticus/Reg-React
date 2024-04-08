import AuthReducer from "./auth/authSlice.tsx";
import UsersReducer from "./users/usersSlice.tsx";
import CommonReducer from "./common/commonSlice.tsx";
import {combineReducers} from "redux";
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
    TypedUseSelectorHook,
} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        users: UsersReducer,
        common: CommonReducer,
    },
});

const rootReducer = combineReducers({
    auth: AuthReducer,
    users: UsersReducer,
    common: CommonReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const {dispatch} = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
