import type { NextPage } from 'next';
import Header from 'src/components/Header';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const profile: NextPage = () => {
  return (
    <>
      <Header />
      <Container maxWidth='md' sx={{ backgroundColor: '#D49B7B' }}>
        <center>
          <Avatar alt='MyIcon' src={'/images/myIcon.png'} sx={{ width: 200, height: 200 }} />
          <Box sx={{ fontFamily: 'cursive', fontSize: 32, color: 'white' }}>waml</Box>
        </center>
      </Container>
      <Container maxWidth='md' sx={{ backgroundColor: 'white' }}>
        <Typography variant='h4' gutterBottom sx={{ fontFamily: 'cursive' }}>
          Background
        </Typography>
      </Container>
    </>
  );
};

export default profile;
