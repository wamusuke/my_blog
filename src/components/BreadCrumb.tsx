import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export type Props = {
  overview: string;
};

export default function BreadCrumb({ overview }: Props) {
  const breadcrumbs = [
    <Link underline='hover' key='1' color='inherit' href={'/'}>
      Home
    </Link>,
    <Typography key='2' color='text.primary'>
      {overview}
    </Typography>,
  ];

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
      {breadcrumbs}
    </Breadcrumbs>
  );
}
