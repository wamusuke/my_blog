import type { NextPage } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import SchoolIcon from '@mui/icons-material/School';

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
        <Typography variant='h4' sx={{ fontFamily: 'Kiwi Maru' }}>
          経歴
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default profile;
