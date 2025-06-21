import { Request, Response, NextFunction } from 'express';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../services/bookService';
import { parseCSV } from '../utils/csvParser';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export const getBooks = (req: Request, res: Response) => {
  const books = getAllBooks();
  res.json(books);
};

export const getBook = (req: Request, res: Response, next: NextFunction) => {
  const book = getBookById(req.params.id);
  if (!book) return next(new Error('Book not found'));
  res.json(book);
};

export const addBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, author, publishedYear } = req.body;
  if (!title || !author || !publishedYear) return next(new Error('Missing required fields'));
  if (typeof publishedYear !== 'number' || publishedYear < 0) return next(new Error('Invalid publishedYear'));
  const newBook = createBook({ title, author, publishedYear });
  res.status(201).json(newBook);
};

export const updateBookHandler = (req: Request, res: Response, next: NextFunction) => {
  const { title, author, publishedYear } = req.body;
  if (!title || !author || !publishedYear) return next(new Error('Missing required fields'));
  if (typeof publishedYear !== 'number' || publishedYear < 0) return next(new Error('Invalid publishedYear'));
  const updatedBook = updateBook(req.params.id, { title, author, publishedYear });
  if (!updatedBook) return next(new Error('Book not found'));
  res.json(updatedBook);
};

export const deleteBookHandler = (req: Request, res: Response, next: NextFunction) => {
  const success = deleteBook(req.params.id);
  if (!success) return next(new Error('Book not found'));
  res.status(204).send();
};

export const importBooksHandler = [
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next(new Error('No file uploaded'));
    try {
      const result = parseCSV(req.file.buffer);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
];