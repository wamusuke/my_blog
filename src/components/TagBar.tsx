import { List, Typography, ListItemButton, ListItemText } from '@mui/material';
import type { NextPage } from 'next';
import { Dispatch } from 'react';

// Props（blogs）の型
type Props = {
  allTagList: string[];
  selectedTag: string[];
  setSelectedTag: Dispatch<string[]>;
};

const TagBar: NextPage<Props> = ({ allTagList, selectedTag, setSelectedTag }: Props) => {
  return (
    <center>
      <List
        sx={{ width: '70%', bgcolor: '#F6D1B6', height: 'auto' }}
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
          onClick={() => setSelectedTag(allTagList)}
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
            onClick={() => setSelectedTag([tag])}
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
