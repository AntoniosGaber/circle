 'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { removeToken } from '../_redux/authSlice';
import { state } from '../__redux/store'; // ← عدّل المسار لو مختلف
import { useEffect, useState } from 'react'; // ← المهم: useState

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const token = useSelector((s: state) => s.authReducer.token);
  const dispatch = useDispatch();
  const router = useRouter();
  function logout() {
    handleCloseNavMenu();
    dispatch(removeToken());
    router.push('/login');
  }

  // ✅ يمنع Hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Desktop title */}
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {mounted && token ? <Link href="/">circle</Link> : 'ciecle'}
            </Typography>

            {/* Mobile menu button */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="open navigation"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {mounted && token
                  ? [
                      <MenuItem key="profile" onClick={handleCloseNavMenu}>
                        <Typography sx={{ textAlign: 'center' }}>
                          <Link href="/profile">profile</Link>
                        </Typography>
                      </MenuItem>,
                      <MenuItem key="create" onClick={handleCloseNavMenu}>
                        <Typography sx={{ textAlign: 'center' }}>
                          <Link href="/createpost">Add post</Link>
                        </Typography>
                      </MenuItem>,
                    ]
                  : null}
              </Menu>
            </Box>

            {/* Mobile title */}
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {mounted && token ? <Link href="/">circle</Link> : 'ciecle'}
            </Typography>

            {/* Desktop links when logged in */}
            {mounted && token && (
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Link href="/profile">profile</Link>
                </Button>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Link href="/createpost">Add post</Link>
                </Button>
              </Box>
            )}

            {/* Desktop right side: auth buttons */}
            <Box
              sx={{
                flexGrow: mounted && token ? 0 : 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              {mounted && token ? (
                <Button onClick={logout} sx={{ my: 2, color: 'white', display: 'block' }}>
                  logout
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                    <Link href="/login">login</Link>
                  </Button>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                    <Link href="/register">register</Link>
                  </Button>
                </Box>
              )}
            </Box>

            {/* Mobile user menu (avatar) */}
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="user" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {mounted && token ? (
                  <MenuItem onClick={logout}>
                    <Typography sx={{ textAlign: 'center' }}>logout</Typography>
                  </MenuItem>
                ) : (
                  [
                    <MenuItem key="login" onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: 'center' }}>
                        <Link href="/login">login</Link>
                      </Typography>
                    </MenuItem>,
                    <MenuItem key="register" onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: 'center' }}>
                        <Link href="/register">register</Link>
                      </Typography>
                    </MenuItem>,
                  ]
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

