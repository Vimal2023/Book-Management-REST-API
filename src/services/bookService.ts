import { v4 as uuidv4 } from 'uuid';
import { Book } from '../models/bookModel';

let books: Book[] = [];

export const getAllBooks = (): Book[] => books;

export const getBookById = (id: string): Book | undefined => books.find(book => book.id === id);

export const createBook = (book: Omit<Book, 'id'>): Book => {
  const newBook: Book = { id: uuidv4(), ...book };
  books.push(newBook);
  return newBook;
};

export const updateBook = (id: string, updatedBook: Omit<Book, 'id'>): Book | undefined => {
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return undefined;
  books[index] = { id, ...updatedBook };
  return books[index];
};

export const deleteBook = (id: string): boolean => {
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  return true;
};

export const importBooks = (csvData: string): { added: number; errors: string[] } => {
  const errors: string[] = [];
  let added = 0;
  const rows = csvData.split('\n').slice(1);

  rows.forEach((row, index) => {
    const [title, author, publishedYear] = row.split(',').map(item => item.trim());
    if (!title || !author || !publishedYear) {
      errors.push(`Row ${index + 2}: Missing required fields`);
      return;
    }
    const year = parseInt(publishedYear, 10);
    if (isNaN(year) || year < 0) {
      errors.push(`Row ${index + 2}: Invalid publishedYear`);
      return;
    }
    createBook({ title, author, publishedYear: year });
    added++;
  });

  return { added, errors };
};