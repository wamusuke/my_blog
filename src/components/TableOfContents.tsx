import { MenuBookOutlined } from '@mui/icons-material';
import { Box, Typography, Paper, Grid } from '@mui/material';
import Script from 'next/script';
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
    <Grid item={true} xs={10} sx={{ margin: 'auto' }}>
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
      {/* admax */}
      <div className="admax-ads" data-admax-id="a442ea427d72f6dc94824623fdc91c6e" style={{ display: 'inline-block', width: '160px', height: '600px' }}></div>
      <Script
        id="admax-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(admaxads = window.admaxads || []).push({admax_id: "a442ea427d72f6dc94824623fdc91c6e",type: "banner"});`,
        }}
      />
      <Script
        src="https://adm.shinobi.jp/st/t.js"
        strategy="afterInteractive"
        type="text/javascript"
        async
      />
      {/* admax */}
    </Grid>
  );
};

export default TableOfContents;
