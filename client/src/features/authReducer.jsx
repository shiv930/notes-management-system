import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

let authReducer =createSlice({
    name:"auth",
    initialState:{
        user: null,
        isLoggedIn:false,
        loading:true,
    },
    reducers:{
        addUser:(state, action)=>{
            state.user = action.payload
            state.isLoggedIn = true
            state.loading = false
        },
        removeUser:(state, action)=>{
            state.user = null
            state.isLoggedIn = false
            state.loading = false
        }
    }
})

export let {addUser, removeUser} = authReducer.actions;
export default authReducer.reducer