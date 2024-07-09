import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';
import { getBooks } from '../services/api';

const BookList: React.FC = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, [search, page, rowsPerPage]);

  const fetchBooks = async () => {
    try {
      const response = await getBooks(search, page + 1, rowsPerPage);
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Typography variant="h6">Book List</Typography>
      <TextField
        label="Search"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Publish Date</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book: any) => (
            <TableRow key={book._id}>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.description}</TableCell>
              <TableCell>{new Date(book.publishDate).toLocaleDateString()}</TableCell>
              <TableCell>{book.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalPages * rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default BookList;
