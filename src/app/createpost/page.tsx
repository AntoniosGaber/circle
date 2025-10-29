'use client';

import React, { FormEvent } from 'react';
import { Paper, TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


export default function CreatePost() {  

  
   let router = useRouter()

  async function handleSubmit(e:FormEvent<HTMLFormElement>){ 
    e.preventDefault()
    let form = e.target as HTMLFormElement ; 
    let formDate = new FormData(); 
    formDate.append('body' ,form.body.value);
    formDate.append('image' ,form.image.files[0]) 
    let response = await fetch(`https://linked-posts.routemisr.com/posts` , {
      method : 'POST' ,  
      body: formDate , 
      headers :{
        'token' : `${localStorage.getItem('token')}`
      }

    }) ; 
    let data = await response.json() 
    console.log(data)
toast.success(data.message)
router.push('/profile')
  }

 
  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Paper
        elevation={5}
        sx={{
          p: 3,
          maxWidth: 620,
          mx: 'auto',
          mt: 6,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" align="left" sx={{ mb: 2, fontWeight: 700 }}>
          create your post 
        </Typography>

        <form
          onSubmit={ (e)=>handleSubmit(e)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <TextField
            
            label="body"
            type="text"
            id="body"
            name="body"
            variant="standard"
            fullWidth
          />
          <TextField
            
            label="image"
            type="file"
            id="image"
            name="image"
            variant="standard"
            fullWidth
          /> 
          

          <Button  type="submit" variant="contained" fullWidth>
            
              add 
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
