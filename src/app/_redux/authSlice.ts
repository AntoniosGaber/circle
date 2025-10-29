
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoading: false,
  error: null,
};

export const autheSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  
    setloading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
      state.error = null;
    },
    removeToken: (state) => {
      state.isLoading = false;
      localStorage.removeItem('token');
      state.token = null;
    },
    
    setErroe: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const authReducer = autheSlice.reducer;
export const { setErroe, setToken, removeToken, setloading } = autheSlice.actions;
