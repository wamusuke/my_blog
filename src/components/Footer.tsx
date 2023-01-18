import * as React from 'react';
import { NextPage } from 'next';
import { Box } from '@mui/material';

const Footer: NextPage = () => {
  return (
    <footer>
      <center>
        <Box sx={{ fontFamily: 'cursive', fontSize: 16 }}>@ 2023 waml&apos;s blog</Box>
      </center>
    </footer>
  );
};

export default Footer;
