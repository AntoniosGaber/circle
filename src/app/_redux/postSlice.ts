import { Post } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false as boolean,
  posts: [] as Post[],
  error: null as any,
  post: null as Post | null,
}; 
export let getUserPosts = createAsyncThunk('posts/getUserposts', async (userId : string) => {
  let response = await fetch( `https://linked-posts.routemisr.com/users/${userId}/posts`, {
    method: 'GET',
    headers: {
      'token': `${localStorage.getItem('token')}`,
      'content-type': 'application/json'
    }
  });
  let data = await response.json();
  console.log(data);
  return data.posts;
});

export let getPost = createAsyncThunk('posts/getPost', async (postId: string) => {
  let response = await fetch(`https://linked-posts.routemisr.com/posts/${postId}`, {
    method: 'GET',
    headers: {
      'token': `${localStorage.getItem('token')}`,
      'content-type': 'application/json'
    }
  });
  let data = await response.json();
  return data.post;
});

export let getPosts = createAsyncThunk('posts/getposts', async () => {
  let response = await fetch(`https://linked-posts.routemisr.com/posts?limit=50`, {
    method: 'GET',
    headers: {
      'token': `${localStorage.getItem('token')}`,
      'content-type': 'application/json'
    }
  });
  let data = await response.json();
  console.log(data);
  return data.posts;
});

export let postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder.addCase(getPosts.pending, (state) => { state.isLoading = true; });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = false;          
      state.error = action.payload;
    });

    
    builder.addCase(getPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.isLoading = false;          
      state.post = action.payload;      
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }); 
     builder.addCase(getUserPosts.pending, (state) => { state.isLoading = true; });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload; 
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});
     
    
  


export let postsReducer = postSlice.reducer;
