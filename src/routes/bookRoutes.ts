import { Router } from 'express';
import { getBooks, getBook, addBook, updateBookHandler, deleteBookHandler, importBooksHandler } from '../controllers/bookController';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', addBook);
router.put('/:id', updateBookHandler);
router.delete('/:id', deleteBookHandler);
router.post('/import', importBooksHandler);

export default router;