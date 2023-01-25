import { Box } from '@mui/material';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LineIcon,
  LineShareButton,
} from 'react-share';


const SnsShareButtons = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FacebookShareButton url={""} title={'Facebook'}>
        <FacebookIcon size={50} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={""}
        title={'Twitter'}
        via='waml'
        hashtags={["waml'sblog"]}
      >
        <TwitterIcon size={50} round />
      </TwitterShareButton>
      <LineShareButton url={""} title={'Line'}>
        <LineIcon size={50} round />
      </LineShareButton>
    </Box>
  );
};

export default SnsShareButtons;
