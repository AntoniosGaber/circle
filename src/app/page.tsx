'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './loading';
import { useDispatch, useSelector } from 'react-redux';
import { state, storeDispatch } from './_redux/store';
import { getPosts } from './_redux/postSlice';
import PostDetails from './_postDetails/page';

export default function Home() {
  const router = useRouter();
  const [sLoading, setLoading] = useState(true); 
 let {posts , isLoading}=  useSelector((state: state)=> state.postsReducer) ; 
 let dispatch = useDispatch<storeDispatch>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        setLoading(false);
        dispatch(getPosts())
      }
    }
  }, [router]);

  return (
    <>
      {sLoading ? <Loading /> :posts.map((post)=> <PostDetails key={post._id} post={post}/>   ) }
    </>
  );
}
