import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Footer from '@/components/Footer';
import type { NextPage } from 'next';
import Header from '@/components/Header';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const profile: NextPage = () => {
  return (
    <>
      <Header />
      <Container maxWidth='md' sx={{ backgroundColor: '#D49B7B' }}>
        <Typography variant='h3' sx={{ fontFamily: 'cursive', color: 'white' }}>
          Profile
        </Typography>
        <Grid container direction={'row'} justifyContent={'space-evenly'}>
          <Grid item>
            <Avatar alt='MyIcon' src={'/images/myIcon.png'} sx={{ width: 250, height: 250 }} />
          </Grid>
          <Grid container direction={'column'} sx={{ width: 'auto' }}>
            <Grid
              container
              direction={'row'}
              justifyContent={'flex-start'}
              sx={{
                fontFamily: 'Kiwi Maru',
                fontSize: 32,
                color: 'white',
              }}
            >
              名前
            </Grid>
            <Grid
              container
              direction={'row'}
              justifyContent={'flex-end'}
              sx={{
                fontFamily: 'cursive',
                fontSize: 20,
                color: 'white',
              }}
            >
              waml
            </Grid>
            <Grid
              container
              direction={'row'}
              justifyContent={'flex-start'}
              sx={{
                fontFamily: 'Kiwi Maru',
                fontSize: 32,
                color: 'white',
              }}
            >
              経歴
            </Grid>
            <Grid
              container
              direction={'row'}
              justifyContent={'space-between'}
              sx={{
                fontFamily: 'Kiwi Maru',
                fontSize: 20,
                color: 'white',
              }}
            >
              <Grid item>2019.4～</Grid>
              <Grid item>上智大学</Grid>
            </Grid>
            <Grid
              container
              direction={'row'}
              justifyContent={'space-between'}
              sx={{
                fontFamily: 'Kiwi Maru',
                fontSize: 20,
                color: 'white',
              }}
            >
              <Grid item>2023.4～</Grid>
              <Grid item>上智大学院進学予定</Grid>
            </Grid>
            <Grid
              container
              direction={'row'}
              justifyContent={'flex-start'}
              sx={{
                fontFamily: 'Kiwi Maru',
                fontSize: 32,
                color: 'white',
              }}
            >
              資格
            </Grid>
            <Grid
              container
              direction={'row'}
              justifyContent={'space-between'}
              sx={{
                fontFamily: 'Kiwi Maru',
                fontSize: 20,
                color: 'white',
              }}
            >
              <Grid item>2019.11</Grid>
              <Grid item>基本情報技術者試験 合格</Grid>
            </Grid>
            <Grid
              container
              direction={'row'}
              justifyContent={'space-between'}
              sx={{
                fontFamily: 'Kiwi Maru',
                fontSize: 20,
                color: 'white',
              }}
            >
              <Grid item>2021.9</Grid>
              <Grid item>TOEIC 700</Grid>
            </Grid>
            <Grid
              container
              direction={'row'}
              justifyContent={'space-between'}
              sx={{
                fontFamily: 'Kiwi Maru',
                fontSize: 20,
                color: 'white',
              }}
            >
              <Grid item>2022.12</Grid>
              <Grid item>応用情報技術者試験 合格</Grid>
            </Grid>
            <Grid
              container
              direction={'row'}
              justifyContent={'flex-start'}
              sx={{
                fontFamily: 'Kiwi Maru',
                fontSize: 32,
                color: 'white',
              }}
            >
              インターン
            </Grid>
            <Grid
              container
              direction={'row'}
              justifyContent={'space-between'}
              sx={{
                fontFamily: 'Kiwi Maru',
                fontSize: 20,
                color: 'white',
              }}
            >
              <Grid item>2021.11～</Grid>
              <Grid item>株式会社Donuts</Grid>
            </Grid>
            <Grid
              container
              direction={'row'}
              justifyContent={'space-between'}
              sx={{
                fontFamily: 'Kiwi Maru',
                fontSize: 20,
                color: 'white',
              }}
            >
              <Grid item>2022.8</Grid>
              <Grid item>LINE株式会社</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth='md' sx={{ backgroundColor: '#D49B7B' }}>
        <Box sx={{ fontFamily: 'Kiwi Maru', fontSize: 20, color: 'white' }}>
          <br />
          現在、大学4年生です。資格の勉強やプログラミング、研究関連で備忘録としてアウトプットしたものが役に立てば幸いです。
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default profile;
