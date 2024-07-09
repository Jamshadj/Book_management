import React from 'react';
import { Container, Typography } from '@mui/material';
import BookList from '../components/BookList';

const BookListPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Select your favorite book
      </Typography>
      <BookList />
    </Container>
  );
};

export default BookListPage;
