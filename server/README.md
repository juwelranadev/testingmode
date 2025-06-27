# iTonzi Backend Server

A Node.js/Express backend server for the iTonzi application with TypeScript, MongoDB, and JWT authentication.

## Features

- 🔐 JWT Authentication
- 📊 MongoDB Database with Mongoose
- 🛡️ Security middleware (Helmet, CORS, Rate Limiting)
- 📝 Request validation
- 🗂️ File upload support
- 📋 Comprehensive logging
- 🧪 Testing setup with Jest

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Business logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── middlewares/     # Custom middlewares
│   ├── utils/           # Utility functions
│   ├── services/        # Database services
│   ├── app.ts           # Express app setup
│   └── server.ts        # Entry point
├── .env                 # Environment variables
├── package.json
└── tsconfig.json
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp env.example .env
```

3. Update `.env` with your configuration

4. Start development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Payments
- `GET /api/payments` - Get user payments
- `POST /api/payments/withdraw` - Request withdrawal
- `POST /api/payments/deposit` - Process deposit

## Environment Variables

See `env.example` for all required environment variables.

## Database Models

- **User**: User accounts and profiles
- **Task**: Available tasks and user completions
- **Payment**: Payment transactions
- **Notification**: User notifications
- **Settings**: Application settings

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation
- SQL injection protection (MongoDB)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request 