import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import { Popup } from 'semantic-ui-react';

function copyTextToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    },
  );
}

const CopyClipboardButton = () => {
  return (
    <Popup
      trigger={
        <IconButton onClick={() => copyTextToClipboard(location.href)}>
          <ContentCopyIcon />
        </IconButton>
      }
      content='Copied!'
      on='click'
      position='left center'
    />
  );
};

export default CopyClipboardButton;
