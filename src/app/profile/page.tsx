'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { state, storeDispatch } from '../_redux/store';
import { getUserPosts } from '../_redux/postSlice';
import { jwtDecode } from 'jwt-decode';
import Loading from '../loading';
import PostDetails from '../_postDetails/page';

export default function Profile() {
  const { isLoading, posts } = useSelector((state: state) => state.postsReducer);
  const dispatch = useDispatch<storeDispatch>();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return;

    const userToken = jwtDecode(token as string) as any;
    dispatch(getUserPosts(userToken.user));
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        posts.map((post) => (
          <PostDetails key={(post as any)._id || (post as any).id} post={post} isComments={true} />
        ))
      )}
    </>
  );
}
