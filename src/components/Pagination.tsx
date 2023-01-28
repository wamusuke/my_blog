import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export type Props = {
  page: number
  setPage: React.Dispatch<number>
  totalItemSize: number
  sizePerPage: number
}

export default function PaginationControlled({ page, setPage, totalItemSize, sizePerPage }: Props) {
  const maxPage = Math.ceil(totalItemSize / sizePerPage);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Pagination count={maxPage} page={page} onChange={handleChange} color="primary" />
  );
}