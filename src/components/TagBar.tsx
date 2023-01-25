import { List, Typography, ListItemButton, ListItemText, Box } from '@mui/material';
import type { NextPage } from 'next';
import { Dispatch, SetStateAction } from 'react';
import type { Blog } from 'src/types/blog';

// Props（blogs）の型
type Props = {
  allTagList: string[];
  setSelectedBlog: Dispatch<SetStateAction<Blog[]>>;
  allBlogs: Blog[];
};

const TagBarStyle = {
  transition: 'all 0.2s',
  '&:hover': {
    boxShadow:
      '1px 0px 5px -1px rgba(0,0,0,0.1), 0px 0px 5px 5px rgba(0,0,0,0.1), 0px 1px 5px 0px rgba(0,0,0,0.1)',
    transform: 'translateY(-1px)',
  },
  width: '70%',
  bgcolor: '#F6D1B6',
  height: 'auto',
};

const TagBar: NextPage<Props> = ({ allTagList, setSelectedBlog, allBlogs }: Props) => {
  const selectTag = (selectedTag: string) => {
    const selectBlogs = allBlogs.filter((blog) => {
      return blog.tags.map((tag) => tag.tag).includes(selectedTag);
    });
    setSelectedBlog(selectBlogs);
  };
  return (
    <center>
      <List
        sx={TagBarStyle}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <Typography
            component='div'
            sx={{
              py: 0.5,
              px: 4,
              my: 1,
              fontSize: 18,
              color: '#444',
              borderBottom: 'solid 0.7px #888',
            }}
          >
            # Tags
          </Typography>
        }
      >
        <ListItemButton
          key={'All'}
          onClick={() => {
            setSelectedBlog(allBlogs);
          }}
          sx={{ py: 0.5, px: 4, minHeight: 32 }}
        >
          <ListItemText
            primary='All'
            primaryTypographyProps={{
              fontSize: 15,
            }}
          />
        </ListItemButton>
        {allTagList.map((tag) => (
          <ListItemButton
            key={tag}
            onClick={() => {
              selectTag(tag);
            }}
            sx={{ py: 0.5, px: 4, minHeight: 32 }}
          >
            <ListItemText
              primary={tag}
              primaryTypographyProps={{
                fontSize: 15,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </center>
  );
};

export default TagBar;
