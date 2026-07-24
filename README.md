# Ecommerce API Backend

A robust Node.js backend for an Ecommerce application, providing RESTful APIs for managing users, products, categories, shopping carts, orders, and payments.

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Documentation:** [Swagger UI](https://swagger.io/)
- **Testing:** [Jest](https://jestjs.io/) & [Supertest](https://github.com/ladjs/supertest)
- **Code Quality:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- **Media Storage:** [Cloudinary](https://cloudinary.com/)

---

## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB (Running locally or an Atlas connection string)
- A [Cloudinary](https://cloudinary.com/) account for image uploads.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd ecommerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   - Create a `.env` file in the root directory:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and fill in your actual credentials. **Never commit your `.env` file to version control.**
   - Ensure your `MONGO_URI` is pointing to your MongoDB instance (e.g., `mongodb://localhost:27017/ecommerce` for local development).

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000` (or the port specified in your `.env`).

---

## 📁 Project Structure

```text
src/
├── config/         # Environment variables and configuration (DB, Cloudinary, Swagger)
├── controllers/    # Route controllers (request handling logic)
├── docs/           # Swagger documentation files
├── middlewares/    # Custom Express middlewares (auth, error handling)
├── models/         # Mongoose schemas and models
├── routes/         # Express routes mapping to controllers
├── services/       # Business logic layer (separated from controllers)
├── tests/          # Jest unit and integration tests
├── utils/          # Utility classes and helper functions
├── validators/     # Input validation schemas (e.g., Joi/Zod)
├── app.js          # Express app configuration
└── server.js       # Server initialization and DB connection
```

---

## 🧪 Testing and Linting

We maintain code quality using Jest, ESLint, and Prettier. Please ensure all checks pass before submitting a Pull Request.

- **Run all tests:**
  ```bash
  npm run test
  ```
- **Check for linting errors:**
  ```bash
  npm run lint
  ```
- **Auto-format your code:**
  ```bash
  npm run format
  ```

---

## 📖 API Documentation

The API uses Swagger for documentation. Once the server is running, you can interact with the API documentation by visiting:

👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

---

## 🤝 Contributing Guidelines

1. **Branching Strategy:** 
   - Create a new branch for each feature or bug fix (e.g., `feature/user-auth` or `bugfix/cart-calculation`).
2. **Commit Messages:** 
   - Use clear and descriptive commit messages.
3. **Pull Requests:** 
   - Before opening a PR, run `npm run format`, `npm run lint`, and `npm test` to ensure your code is clean and passes all tests.
   - Request a review from at least one other team member.
