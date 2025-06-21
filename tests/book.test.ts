import supertest from 'supertest';
import app from '../src/app';
import { createBook } from '../src/services/bookService';

describe('Book API', () => {
  beforeEach(() => {
    (global as any).books = [];
  });

  test('GET /books should return all books', async () => {
    createBook({ title: 'Test Book', author: 'Test Author', publishedYear: 2023 });
    const response = await supertest(app).get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('title', 'Test Book');
  });
});