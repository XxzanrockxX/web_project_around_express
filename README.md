# Around API

REST API built with Node.js and Express to manage users and cards in an Around-style application. The project includes creation, retrieval, updating, deletion, and card likes, as well as user profile management.

## Author

Luis Philco

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

- User registration and retrieval
- Profile and avatar updates
- Card creation, listing, and deletion
- Card like system
- Data validation and HTTP error handling

## Main endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:userId` - Get a user by ID
- `POST /users` - Create a new user
- `PATCH /users/me` - Update the authenticated user's name and bio
- `PATCH /users/me/avatar` - Update the authenticated user's avatar

### Cards

- `GET /cards` - Get all cards
- `POST /cards` - Create a new card
- `DELETE /cards/:cardId` - Delete a card by ID
- `PUT /cards/:cardId/likes` - Add a like to a card
- `DELETE /cards/:cardId/likes` - Remove a like from a card

## Installation

```bash
npm install
```

## Running the project

### Production mode

```bash
npm start
```

### Development mode

```bash
npm run dev
```

## Available scripts

- `npm start` - Starts the application
- `npm run dev` - Runs the app with nodemon
- `npm run lint` - Checks the code with ESLint

## Note

This project is designed as a backend API for a visual social network, with MongoDB persistence and a modular structure based on routes, controllers, and models.
