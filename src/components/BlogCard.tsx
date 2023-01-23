import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from '@mui/material';
import type { NextPage } from 'next';
import type { Blog, Tag } from 'src/types/blog';

// Props（blogs）の型
type Props = {
  blog: Blog;
  tags: Tag[];
};

function displayTime(time: string) {
  const timeSplit = time.split("-");
  return timeSplit[0] + "/" + timeSplit[1] + "/" + timeSplit[2].split("T")[0]
}


const BlogCard: NextPage<Props> = ({ blog, tags }: Props) => {
  const tagList = tags.map((tag) => tag.tag)
  console.log(tagList)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`/images/thumbnails/${blog.thumbnail}`}
        title="thumbnail"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.content}...
        </Typography>
      </CardContent>
      <Grid container>
        <Grid item xs={1.5}><SellOutlinedIcon /></Grid>
        <Grid item xs={9.5}>
          {tagList.map((tag) => (
            `#${tag} `
          ))}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={1.5}><AccessTimeOutlinedIcon /></Grid>
        <Grid item xs={9.5}>{displayTime(blog.createdAt)}</Grid>
      </Grid>
    </Card>
  );
}

export default BlogCard;
