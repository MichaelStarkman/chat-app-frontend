import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        // Back-end url
        baseUrl: "https://c-app-backend.herokuapp.com",
    }),

    endpoints: (builder) => ({
        // creating the user
        //  /users
        signupUser: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user,
            }),
        }),

        // /login
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        // /logout
        logoutUser: builder.mutation({
            query: (payload) => ({
                url: "/logout",
                method: "DELETE",
                body: payload,
            }),
        }),
    }),
});

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = appApi;

export default appApi;
