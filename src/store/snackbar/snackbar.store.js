import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: {
        show: false,
        type: "",
        text: "",
    },

    reducers: {
        handleSnackBar(state, action) {
            let { show, text, type } = action.payload;
            console.log("handleSnackBar RAN >> ", show, text, type);
            if (!text) text = state.text;
            if (type !== "error" && type !== "info" && type !== "success" && type !== "warning") type = "info";
            state.show = show;
            state.text = text;
            state.type = type;
        },
    },
});

export const { handleSnackBar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
