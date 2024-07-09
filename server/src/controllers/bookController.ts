import { Request, Response } from 'express';
import Book from '../models/book';

// Add a book
export const addBook = async (req: Request, res: Response) => {
  try {
    const { name, description, publishDate, price } = req.body;

    // Validation
    if (!name || !description || !publishDate || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const book = new Book({ name, description, publishDate, price });
    await book.save();

    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error occurred' });
    }
  }
};

// Get books with search and pagination
export const getBooks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const searchQuery = search as string;

    const query = {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ],
    };

    const books = await Book.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalBooks = await Book.countDocuments(query);

    res.status(200).json({
      books,
      totalPages: Math.ceil(totalBooks / limitNumber),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error occurred' });
    }
  }
};
