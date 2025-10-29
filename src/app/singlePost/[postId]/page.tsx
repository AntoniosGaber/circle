"use client" 
import PostDetails from '@/app/_postDetails/page'
import { getPost } from '@/app/_redux/postSlice'
import { state, storeDispatch } from '@/app/_redux/store'
import Loading from '@/app/loading'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function SingelPost() {
 let {post , isLoading} = useSelector((state:state)=>state.postsReducer) 
  let dispatch = useDispatch<storeDispatch>() 
 let {postId} =useParams()
  useEffect(()=>{
    dispatch(getPost( `${postId}`))
  },
[])



  return <>
  {isLoading ? <Loading/> : post && <PostDetails post={post} isComments={true} />}
  
  
  
  </>
}