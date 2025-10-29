'use client';

import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { postsReducer } from './postSlice';

export const store = configureStore({
  reducer: {
    authReducer,
    postsReducer,
  },
});


export type state = ReturnType<typeof store.getState>;
export type storeDispatch = typeof store.dispatch;
