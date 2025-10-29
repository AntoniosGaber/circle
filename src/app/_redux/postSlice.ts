'use client';

import { Post } from '@/interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type PostsState = {
  isLoading: boolean;
  posts: Post[];
  error: string | null;
  post: Post | null;
};

const initialState: PostsState = {
  isLoading: false,
  posts: [],
  error: null,
  post: null,
};

export const getUserPosts = createAsyncThunk('posts/getUserposts', async (userId: string) => {
  const response = await fetch(`https://linked-posts.routemisr.com/users/${userId}/posts`, {
    method: 'GET',
    headers: {
      token: `${localStorage.getItem('token') ?? ''}`,
      'content-type': 'application/json',
    },
  });
  const data = await response.json();
  return data.posts as Post[];
});

export const getPost = createAsyncThunk('posts/getPost', async (postId: string) => {
  const response = await fetch(`https://linked-posts.routemisr.com/posts/${postId}`, {
    method: 'GET',
    headers: {
      token: `${localStorage.getItem('token') ?? ''}`,
      'content-type': 'application/json',
    },
  });
  const data = await response.json();
  return data.post as Post;
});

export const getPosts = createAsyncThunk('posts/getposts', async () => {
  const response = await fetch(`https://linked-posts.routemisr.com/posts?limit=50`, {
    method: 'GET',
    headers: {
      token: `${localStorage.getItem('token') ?? ''}`,
      'content-type': 'application/json',
    },
  });
  const data = await response.json();
  return data.posts as Post[];
});

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Failed to load posts';
    });

    
    builder.addCase(getPost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Failed to load post';
    });

    
    builder.addCase(getUserPosts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Failed to load user posts';
    });
  },
});

export const postsReducer = postSlice.reducer;
