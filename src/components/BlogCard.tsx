import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import type { NextPage } from 'next';
import Link from 'next/link';
import { displayTime, restrictDisplayTitle } from '@/libs/display';
import type { Blog, Tag } from 'src/types/blog';

// Props（blogs）の型
type Props = {
  blog: Blog;
  tags: Tag[];
};

const CardStyle = {
  maxWidth: 345,
  transition: 'all 0.2s',
  '&:hover': {
    boxShadow:
      '1px 0px 5px -1px rgba(0,0,0,0.1), 0px 0px 5px 5px rgba(0,0,0,0.1), 0px 1px 5px 0px rgba(0,0,0,0.1)',
    transform: 'translateY(-1px)',
  },
};

const BlogCard: NextPage<Props> = ({ blog, tags }: Props) => {
  const tagList = tags.map((tag) => tag.tag);
  return (
    <Link href={`/blog/${blog.id}`} passHref style={{ textDecoration: 'none' }}>
      <Card sx={CardStyle}>
        <CardMedia
          sx={{ height: 140 }}
          image={`/images/thumbnails/${blog.thumbnail}`}
          title='thumbnail'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div' sx={{ height: 100 }}>
            {restrictDisplayTitle(blog.title)}
          </Typography>
        </CardContent>
        <Grid container sx={{ height: 'auto', margin: 1 }}>
          <Grid item xs={1.5}>
            <SellOutlinedIcon />
          </Grid>
          <Grid item xs={9.5}>
            {tagList.map((tag) => `#${tag} `)}
          </Grid>
        </Grid>
        <Grid container sx={{ margin: 1 }}>
          <Grid item xs={1.5}>
            <AccessTimeOutlinedIcon />
          </Grid>
          <Grid item xs={9.5}>
            {displayTime(blog.createdAt)}
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};

export default BlogCard;
