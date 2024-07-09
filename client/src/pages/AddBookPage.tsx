import React from 'react';
import { Container, Typography } from '@mui/material';
import BookForm from '../components/BookForm';

const AddBookPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Please add your book details
      </Typography>
      <BookForm />
    </Container>
  );
};

export default AddBookPage;
