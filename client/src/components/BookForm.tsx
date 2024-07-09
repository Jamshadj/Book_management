import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Snackbar } from '@mui/material';
import { addBook } from '../services/api';

const BookForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [price, setPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const book = { name, description, publishDate, price };
    try {
      await addBook(book);
      setName('');
      setDescription('');
      setPublishDate('');
      setPrice(0);
      setSuccessMessage('Book added successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
      <Typography variant="h6">Add Book</Typography>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth margin="normal" />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required fullWidth margin="normal" multiline rows={4} />
      <TextField label="Publish Date" type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} required fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
      <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required fullWidth margin="normal" />
      <Button type="submit" variant="contained" color="primary">Add Book</Button>
    </Box>
  );
};

export default BookForm;
