import {createSlice} from "@reduxjs/toolkit";
import {Alert} from "../../utils/types.ts";

interface StateType {
    alertState: Alert;
}

const initialState: StateType = {
    alertState: {open: false, type: 'success', message: ''}
};

export const CommonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setOpenAlert: (state, action) => {
            state.alertState.type = action.payload.type;
            state.alertState.message = action.payload.message;
            state.alertState.open = true;
        },
        setCloseAlert: (state) => {
            state.alertState.open = false;
            state.alertState.message = '';
            state.alertState.type = 'success';
        }

    },
});

export const {
    setOpenAlert,
    setCloseAlert
} = CommonSlice.actions;

export default CommonSlice.reducer;