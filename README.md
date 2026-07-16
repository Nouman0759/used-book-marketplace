# SecondChapter — Used Book Marketplace

A small full-stack app where readers list used books for sale and others place bids on them.

- **Client:** React 19 (Vite), React Router, Axios
- **Server:** Node.js, Express 5, SQLite3, Multer (image uploads)

## Project structure

```
used-book-marketplace/
├── client/                 React frontend (Vite)
│   ├── src/
│   │   ├── components/     Navbar, BookCard, BidForm
│   │   ├── pages/          Home, AddBook, BookDetails
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                  Express backend
│   ├── database/
│   │   └── database.js     SQLite connection + table setup
│   ├── routes/
│   │   └── books.js        /books API routes
│   ├── uploads/             Uploaded book images (created at runtime)
│   ├── database.sqlite      SQLite database file
│   ├── app.js                Server entry point
│   └── package.json
│
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

## Setup

Clone the repo, then install dependencies for both the client and the server:

```bash
git clone https://github.com/Nouman0759/used-book-marketplace.git
cd used-book-marketplace

cd server
npm install

cd ../client
npm install
```

## Running the app

The client and server run as two separate processes — start each in its own terminal.

**1. Start the server** (from `server/`):

```bash
cd server
node app.js
```

The API runs at `http://localhost:5000`. On first run it automatically creates `database.sqlite` and the required tables if they don't already exist.

**2. Start the client** (from `client/`):

```bash
cd client
npm run dev
```

The app opens at `http://localhost:5173`.

> The client currently talks to the API at a hardcoded `http://localhost:5000` — if you run the server on a different port or host, update the URLs in `client/src/pages/Home.jsx`, `AddBook.jsx`, `BookDetails.jsx`, and `client/src/components/BidForm.jsx`.

## API reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | List all books with thumbnail and bid count |
| GET | `/books/:id` | Get a single book with its images and bid history |
| POST | `/books` | Create a new listing (multipart form: `title`, `author`, `description`, `suggestedPrice`, up to 3 `images`) |
| POST | `/books/:id/bid` | Place a bid (`bidderName`, `bidAmount`) |

