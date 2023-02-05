import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { NextPage } from 'next';
import { bgColor } from '@/libs/color';

const Header: NextPage = () => {
  return (
    <AppBar position='static' sx={{ backgroundColor: bgColor }} elevation={0}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters={false}>
          <Typography
            variant='h6'
            noWrap
            component={'a'}
            href={'/'}
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
            <ImportantDevicesIcon
              sx={{ color: '#D49B7B', display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <Box sx={{ fontFamily: 'cursive', color: '#D49B7B' }}>waml&apos;s blog</Box>
          </Typography>
          <Box sx={{ flexGrow: 0.7 }} />
          <Typography
            variant='h6'
            noWrap
            component={'a'}
            href={'../'}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'cursive',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#D49B7B',
            }}
          >
            Home
          </Typography>
          <Typography
            variant='h6'
            noWrap
            component={'a'}
            href={'../profile'}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'cursive',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#D49B7B',
            }}
          >
            About Me
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
