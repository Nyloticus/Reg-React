import {createSlice} from "@reduxjs/toolkit";


interface StateType {
    token: string;
    refreshToken: string;
}

const initialState: StateType = {
    token: "",
    refreshToken: "",
};

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoginUserData: (state: { token: string; refreshToken: string }, action: { payload: { token: string; }; }) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.token;
        },
        setLogoutUserData: (state: { token: string; refreshToken: string }) => {
            state.token = "";
            state.refreshToken = "";
        }

    },
});

export const {
    setLoginUserData,
    setLogoutUserData
} = AuthSlice.actions;

export default AuthSlice.reducer;