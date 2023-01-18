import { Box } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';

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
