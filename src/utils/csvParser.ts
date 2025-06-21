import { importBooks } from '../services/bookService';

export const parseCSV = (fileBuffer: Buffer): { added: number; errors: string[] } => {
  const csvData = fileBuffer.toString();
  if (!csvData.includes('title,author,publishedYear')) {
    return { added: 0, errors: ['Invalid CSV header'] };
  }
  return importBooks(csvData);
};