'use client';

import React from 'react';
import { useFormik } from 'formik';
import { Box, Paper, TextField, Button, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { state, storeDispatch } from '../_redux/store';
import { setErroe, setloading, setToken } from '../_redux/authSlice';
import Loading from '../loading';

export default function Login() {
  const { isLoading } = useSelector((s: state) => s.authReducer);
  const dispatch = useDispatch<storeDispatch>();
  const router = useRouter();

  async function login(values: { email: string; password: string }) {
    try {
      dispatch(setloading());

      // ✅ URL داخل backticks ```
      const response = await fetch(`https://linked-posts.routemisr.com/users/signin`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log('LOGIN status:', response.status, 'data:', data);

      if (response.ok && data?.token) {
        dispatch(setToken(data.token));     // يحفظ token في localStorage('token')
        router.replace('/');                // بدّل push لو حابب
      } else {
        dispatch(setErroe(data?.message || data?.error || 'Login failed'));
      }
    } catch (err: any) {
      dispatch(setErroe(err?.message || 'Network error'));
    }
  }

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: login,
  });

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Paper elevation={4} sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 6, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              variant="standard"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="email"
            />

            <TextField
              label="Password"
              type="password"
              variant="standard"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="current-password"
            />

            {isLoading ? (
              <Loading />
            ) : (
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                login
              </Button>
            )}
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
