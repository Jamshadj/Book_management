import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

export const addBook = async (book: any) => {
  return await axios.post(API_URL, book);
};

export const getBooks = async (search: string, page: number, limit: number) => {
  return await axios.get(API_URL, { params: { search, page, limit } });
};
