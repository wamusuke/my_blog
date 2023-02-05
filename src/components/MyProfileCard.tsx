import { Paper, Grid, Avatar, Typography, Box } from '@mui/material';
import { NextPage } from 'next';

const MyProfileCard: NextPage = () => {
  return (
    <Grid item={true} xs={10} sx={{ margin: 'auto' }}>
      <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <center>
            <Avatar alt='MyIcon' src={'/images/myIcon.png'} />
          </center>
          <Typography
            variant='body2'
            sx={{
              fontFamily: 'Kiwi Maru',
              margin: 2,
            }}
          >
            現在、大学生です。
            <br />
            連合学習の研究をしています。
            <br />
            資格や技術で勉強したことについてアウトプットしたいと思います。
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default MyProfileCard;
