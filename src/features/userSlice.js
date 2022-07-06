// state management for user
import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    // functions that will change user state  /  ACTIONS
    reducers: {
        // Add message notifications
        addNotifications: (state, { payload }) => {
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        // Reset message notifications
        resetNotifications: (state, { payload }) => {
            delete state.newMessages[payload];
        },
    },

    extraReducers: (builder) => {
        // save user after sign up
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload);
        // save user after log in
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => payload);
        // logout: destroy user session
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
    },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;