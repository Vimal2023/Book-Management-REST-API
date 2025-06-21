import express, { Application } from 'express';
import morgan from 'morgan';
import bookRoutes from './routes/bookRoutes';
import errorHandler from './middleware/errorHandler';

const app: Application = express();

// here we have the middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// here we have the Routes
app.use('/books', bookRoutes);

// here we have the Error Handling
app.use(errorHandler);

export default app;