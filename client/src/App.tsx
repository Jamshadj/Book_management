import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AddBookPage from './pages/AddBookPage';
import BookListPage from './pages/BookListPage';

const App: React.FC = () => {
  const location = useLocation();
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
        <Button
            style={{
              backgroundColor: location.pathname === '/' ? 'white' : 'transparent',
              color: location.pathname === '/' ? '#1976d2' : 'white',
              marginRight: '10px'
            }}
            component={Link} to="/"
          >
            Add Book
          </Button>
          <Button
            style={{
              backgroundColor: location.pathname === '/books' ? 'white' : 'transparent',
              color: location.pathname === '/books' ? '#1976d2' : 'white'
            }}
            component={Link} to="/books"
          >
            Book List
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<AddBookPage />} />
        <Route path="/books" element={<BookListPage />} />
      </Routes>
    </Container>
  );
};

export default App;
