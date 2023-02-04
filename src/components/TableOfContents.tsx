import { MenuBookOutlined } from '@mui/icons-material';
import { Box, Typography, Paper, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import tocbot from 'tocbot';

const TableOfContents = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.article',
      headingSelector: 'h1, h2, h3, h4',
    });
    return () => tocbot.destroy();
  }, []);

  return (
    <Grid xs={10} sx={{ margin: 'auto' }}>
      <Paper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography sx={{ margin: 1 }}>
            <MenuBookOutlined />
          </Typography>
          <Typography sx={{ fontFamily: 'Kiwi Maru', margin: 1 }}>目次</Typography>
        </Box>
        <div className='toc'></div>

        <style jsx global>{`
          .toc {
            padding: 1rem;
            font-family: Kiwi Maru;
          }

          .toc-list .toc-list {
          }

          .toc-list-item {
            padding-bottom: 0.5rem;
          }

          .toc-list-item:last-child {
          }
          .is-active-link {
          }
        `}</style>
      </Paper>
    </Grid>
  );
};

export default TableOfContents;
