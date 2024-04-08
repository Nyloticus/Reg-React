import {createSlice} from "@reduxjs/toolkit";

interface StateType {
    userTypes: any[];
}

const initialState: StateType = {
    userTypes: ['all']
};

export const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUserTypes: (state, action) => {
            state.userTypes = action.payload;
        },

    },
});

export const {
    setUserTypes
} = UsersSlice.actions;

export default UsersSlice.reducer;