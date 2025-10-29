'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
  });

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const htmlForm = e.currentTarget as HTMLFormElement;

    const userData = {
      name: (htmlForm.elements.namedItem('name') as HTMLInputElement).value,
      email: (htmlForm.elements.namedItem('email') as HTMLInputElement).value,
      password: (htmlForm.elements.namedItem('password') as HTMLInputElement).value,
      rePassword: (htmlForm.elements.namedItem('rePassword') as HTMLInputElement).value,
      dateOfBirth: (htmlForm.elements.namedItem('dateOfBirth') as HTMLInputElement).value, // d-m-yyyy
      gender: (htmlForm.elements.namedItem('gender') as HTMLInputElement).value.toLowerCase(),
    };

    try {
      const response = await fetch('https://linked-posts.routemisr.com/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // ✅ بدون token
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        // السيرفر بيرجع message عند الخطأ غالبًا
        throw new Error(data?.message || 'Signup failed');
      }

      // نجاح
      alert('Signup success ✅');
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Paper elevation={5} sx={{ p: 3, maxWidth: 620, mx: 'auto', mt: 6, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Register
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleRegister}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              variant="standard"
              value={form.name}
              onChange={handleChange}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              variant="standard"
              value={form.email}
              onChange={handleChange}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              variant="standard"
              value={form.password}
              onChange={handleChange}
            />

            <TextField
              label="Confirm Password"
              name="rePassword"
              type="password"
              variant="standard"
              value={form.rePassword}
              onChange={handleChange}
            />

            {/* الهاتف غير مطلوب للـ API لكن خليه في الواجهة لو حابب */}
            <TextField
              label="Phone"
              name="phone"
              type="tel"
              variant="standard"
              value={form.phone}
              onChange={handleChange}
            />

            <TextField
              label="Date of Birth (d-m-yyyy)"
              name="dateOfBirth"
              placeholder="07-10-1990"
              variant="standard"
              value={form.dateOfBirth}
              onChange={handleChange}
            />

            <TextField
              select
              label="Gender"
              name="gender"
              variant="standard"
              value={form.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>

            <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 2 }}>
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Register'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
