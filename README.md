# Book Management REST API

A RESTful API for managing books, built with **Node.js**, **TypeScript**, and **Express**. This project supports CRUD operations for books and includes a bulk import feature via CSV file upload with manual validation. The project follows an MVC architecture, uses environment variables, includes logging with Morgan, centralized error handling, and unit tests with Jest.

## Features

- **CRUD Operations**: Create, read, update, and delete books.
- **Bulk Import**: Upload a CSV file to import multiple books with validation.
- **Type Safety**: Built with TypeScript for robust type checking.
- **Logging**: HTTP request logging using Morgan.
- **Error Handling**: Centralized error handling middleware.
- **Unit Tests**: Tests for API endpoints using Jest and Supertest.
- **Environment Variables**: Configurable via `.env` file.
- **MVC Structure**: Organized code with separate controllers, services, and routes.

## Tech Stack

- **Node.js**: Runtime environment
- **Express**: Web framework
- **TypeScript**: For type-safe JavaScript
- **Morgan**: HTTP request logger
- **Multer**: For handling file uploads
- **UUID**: For generating unique book IDs
- **Jest & Supertest**: For unit testing
- **Dotenv**: For environment variable management


## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/book-management-api.git
   cd book-management-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the project root with the following content:
   ```plaintext
   PORT=3000
   ```

4. **Build the project** (compiles TypeScript to JavaScript):
   ```bash
   npm run build
   ```

5. **Run the server**:
   - For development (with auto-reload using nodemon):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```
   - The server will run on `http://localhost:3000`.

6. **Run unit tests**:
   ```bash
   npm test
   ```

## API Endpoints

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| GET    | `/books`            | Retrieve all books              |
| GET    | `/books/:id`        | Retrieve a specific book by ID  |
| POST   | `/books`            | Create a new book               |
| PUT    | `/books/:id`        | Update an existing book         |
| DELETE | `/books/:id`        | Delete a book                   |
| POST   | `/books/import`     | Import multiple books via CSV   |

### Book Object Structure

```json
{
  "id": "uuid-string",
  "title": "string",
  "author": "string",
  "publishedYear": number
}
```

### CSV Import Format

The CSV file for the `/books/import` endpoint must have the following header and format:

```csv
title,author,publishedYear
"Book Title","Author Name",2023
"Another Book","Another Author",2024
```

- **Validation**: The API checks for missing fields and invalid `publishedYear` values.
- **Response**: Returns the number of books added and a list of errors for invalid rows.

Example response:
```json
{
  "added": 2,
  "errors": ["Row 3: Invalid publishedYear"]
}
```

## Testing with Postman

1. Import the provided `postman_collection.json` file into Postman:
   - In Postman, click **Import** > **File** > Select `postman_collection.json`.
2. Set the `base_url` variable to `http://localhost:3000` in the collection.
3. Use the collection to test all endpoints:
   - **GET /books**: Check for an empty array initially.
   - **POST /books**: Add a book with a JSON payload.
   - **GET /books/:id**: Retrieve the added book.
   - **PUT /books/:id**: Update the book.
   - **DELETE /books/:id**: Delete the book.
   - **POST /books/import**: Upload a CSV file to import books.

## Project Structure

```plaintext
book-management-api/
├── src/
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── routes/            # API routes
│   ├── models/            # Data interfaces
│   ├── middleware/        # Custom middleware (error handling)
│   ├── utils/             # Utility functions (CSV parsing)
│   ├── app.ts             # Express app setup
│   ├── server.ts          # Server entry point
├── tests/                 # Unit tests
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── README.md              # Project documentation
├── postman_collection.json # Postman collection for testing
```

## Notes

- The project uses an in-memory array for storage (for simplicity). In a production environment, consider using a database like MongoDB or PostgreSQL.
- CSV parsing is done manually without third-party libraries, as per the task requirements.
- The API includes robust error handling and input validation.
- Unit tests cover the `GET /books` endpoint; additional tests can be added for other endpoints.

