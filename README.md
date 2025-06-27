# iTonzi - Earn TON by Completing Tasks

A full-stack web application that allows users to earn TON cryptocurrency by completing various tasks, watching ads, and referring friends.

## 🚀 Features

### Frontend (React + TypeScript + Vite)
- **Modern UI/UX** with Tailwind CSS
- **Responsive Design** for mobile and desktop
- **Real-time Updates** with WebSocket support
- **Task Management** with progress tracking
- **Payment System** with TON wallet integration
- **Referral System** with leaderboards
- **Admin Panel** for task and user management
- **Notification System** for real-time updates

### Backend (Node.js + Express + TypeScript + MongoDB)
- **RESTful API** with comprehensive endpoints
- **JWT Authentication** with role-based access
- **MongoDB Database** with Mongoose ODM
- **Security Features** (Helmet, CORS, Rate Limiting)
- **File Upload** support
- **Comprehensive Logging** with Winston
- **Input Validation** with express-validator
- **Error Handling** with custom middleware

## 📁 Project Structure

```
src/
├── server/                    # Backend server
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # Express routes
│   │   ├── middlewares/      # Custom middlewares
│   │   ├── utils/            # Utility functions
│   │   ├── services/         # Database services
│   │   ├── app.ts            # Express app setup
│   │   └── server.ts         # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── env.example
├── src/                      # Frontend application
│   ├── admin/               # Admin panel components
│   ├── Airdrop/             # Airdrop features
│   ├── FooterButton/        # Footer components
│   ├── pages/               # Page components
│   ├── services/            # API services
│   └── Updates/             # Update components
├── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API communication
- **React Router** for navigation

### Backend
- **Node.js** with TypeScript
- **Express.js** web framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Winston** for logging
- **express-validator** for validation
- **Helmet** for security headers

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd src
```

2. **Install all dependencies**
```bash
npm run install:all
```

3. **Set up environment variables**
```bash
# Copy backend environment file
cp server/env.example server/.env

# Edit server/.env with your configuration
```

4. **Start the development servers**
```bash
# Start both frontend and backend
npm run dev:full

# Or start them separately:
npm run dev          # Frontend only
npm run server:dev   # Backend only
```

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/itonzi

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### User Endpoints
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)

### Task Endpoints
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create task (admin)
- `PUT /api/tasks/:id` - Update task (admin)
- `DELETE /api/tasks/:id` - Delete task (admin)
- `POST /api/tasks/:id/complete` - Complete task

### Payment Endpoints
- `GET /api/payments` - Get user payments
- `POST /api/payments/withdraw` - Request withdrawal
- `POST /api/payments/deposit` - Process deposit

### Admin Endpoints
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/settings` - Get system settings
- `PUT /api/admin/settings` - Update system settings

## 🗄️ Database Models

### User
- Basic info (email, username, password)
- Balance and earnings tracking
- Referral system
- Role-based permissions

### Task
- Task details and requirements
- Reward amounts
- Completion tracking
- Categories and difficulty levels

### Payment
- Transaction history
- Withdrawal/deposit tracking
- TON wallet integration
- Status management

### Notification
- User notifications
- System announcements
- Real-time updates

### Settings
- Application configuration
- System parameters
- Public/private settings

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `npm run server:dev` - Start backend development server
- `npm run server:build` - Build backend for production
- `npm run server:start` - Start production backend

**Full Stack:**
- `npm run dev:full` - Start both frontend and backend
- `npm run install:all` - Install all dependencies

### Code Structure

The application follows a modular architecture:

- **Frontend**: Component-based with hooks and context
- **Backend**: MVC pattern with service layer
- **Database**: Mongoose schemas with validation
- **API**: RESTful endpoints with JWT authentication

## 🚀 Deployment

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist/` folder to your hosting service

### Backend Deployment
1. Build the backend: `npm run server:build`
2. Set production environment variables
3. Deploy to your server (Heroku, DigitalOcean, AWS, etc.)

### Database Setup
1. Set up MongoDB (local or cloud)
2. Configure connection string in environment variables
3. Run database migrations if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@itonzi.com or create an issue in the repository.

---

**iTonzi** - Earn TON by completing tasks! 🚀 