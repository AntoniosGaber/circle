
"use client"
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
   
   token: (typeof window !== 'undefined' ? localStorage.getItem('token') : null) as string | null,


  isLoading: false as boolean,
  error: null as null | string,
};

export let autheSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setloading: (state) => {
      state.isLoading = true;
    },
    setToken: (state, action) => {
      state.isLoading = false;
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.isLoading = false;
      localStorage.removeItem('token');
      state.token = null;
    },
    setErroe: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export let authReducer = autheSlice.reducer;
export let { setErroe, setToken, removeToken, setloading } = autheSlice.actions;
