import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LineIcon,
  LineShareButton,
} from 'react-share';

const SnsShareButtons = () => {
  const [currentURL, setCurrentURL] = useState<string>('');
  useEffect(() => {
    setCurrentURL(location.href);
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <FacebookShareButton url={currentURL} title={'Facebook'}>
        <FacebookIcon size={50} round />
      </FacebookShareButton>
      <TwitterShareButton url={currentURL} title={'Twitter'} via='waml' hashtags={["waml'sblog"]}>
        <TwitterIcon size={50} round />
      </TwitterShareButton>
      <LineShareButton url={currentURL} title={'Line'}>
        <LineIcon size={50} round />
      </LineShareButton>
    </Box>
  );
};

export default SnsShareButtons;
