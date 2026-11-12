# Daily Water Intake Tracker (AquaTrack)

A responsive, full-stack web application built with **React.js, Node.js, and Express.js** (with local JSON file persistence) to help users monitor daily water intake, maintain healthy hydration habits, and achieve daily hydration goals.

---

## Features

- **User Authentication**: Secure registration, login, logout, password hashing with `bcryptjs`, and JWT-based protected routes.
- **Interactive Dashboard**: Displays daily water goal, consumed amount, remaining quantity, glasses consumed, hydration progress percentage, and an animated circular progress ring.
- **Quick & Custom Water Logging**: Quick-add presets (`150 ml`, `250 ml`, `500 ml`) and custom quantity input with persistent storage and duplicate submission protection.
- **Editable Daily Goal & Auto Daily Reset**: Customize your daily goal anytime; daily totals automatically reset at midnight while preserving all historical records.
- **Water Intake History**: Filterable history grouped by day showing date, time, quantity, daily total, and goal achievement status.
- **Analytics & Reports**: Interactive **Chart.js** visualizations for daily timeline, weekly intake, and 30-day monthly trends, plus average daily intake, best hydration day, goal completion percentage, and streak tracking.
- **Hydration Reminders**: Enable/disable reminders, configure custom intervals, and trigger browser notifications + in-app reminder banners.
- **User Profile & Settings**: Update name, email, daily goal, password, and notification preferences.

---

## Technology Stack

### Frontend
- React.js (Vite)
- JavaScript (ES6+)
- Tailwind CSS & CSS3
- Axios
- Chart.js & `react-chartjs-2`
- React Router DOM
- Lucide React Icons

### Backend & Persistence
- Node.js & Express.js
- Local JSON File Data Store (`backend/data/db.json`) — zero external database setup required
- JSON Web Tokens (`jsonwebtoken`)
- Password Encryption (`bcryptjs`)
- CORS & Dotenv

---

## Project Structure

```text
daily-water-intake-tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── analyticsController.js
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── waterController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── WaterIntake.js
│   ├── routes/
│   │   ├── analyticsRoutes.js
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── waterRoutes.js
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── tokenUtils.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── styles.css
│   │   │   └── WaterIcons.js
│   │   ├── components/
│   │   │   ├── AlertMessage.js
│   │   │   ├── AppLayout.js
│   │   │   ├── CircularProgress.js
│   │   │   └── ProtectedRoute.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── ReminderContext.js
│   │   ├── pages/
│   │   │   ├── AnalyticsPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── HistoryPage.js
│   │   │   ├── LandingPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── ProfilePage.js
│   │   │   ├── RegisterPage.js
│   │   │   └── SettingsPage.js
│   │   ├── services/
│   │   │   ├── analyticsService.js
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── dateHelper.js
│   │   │   ├── userService.js
│   │   │   └── waterService.js
│   │   ├── App.js
│   │   └── main.js
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## Environment Variables

### Backend (`backend/.env`)
```env
PORT=8000
DATA_FILE=./data/db.json
JWT_SECRET=daily_water_tracker_super_secret_jwt_key_2026
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000/api
```

---

## REST API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login & receive JWT |
| `GET` | `/api/auth/profile` | Private | Get logged-in user profile |

### Water Intake & Daily Goal
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/water/add` | Private | Add water intake entry |
| `GET` | `/api/water/today` | Private | Get today's entries & summary |
| `GET` | `/api/water/history` | Private | Get grouped daily history |
| `DELETE` | `/api/water/:id` | Private | Delete a water intake entry |
| `GET` | `/api/water/goal` | Private | Get user's daily goal |
| `PUT` | `/api/water/goal` | Private | Update user's daily goal |

### Analytics
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/analytics/weekly` | Private | Last 7 days consumption |
| `GET` | `/api/analytics/monthly` | Private | Last 30 days consumption |
| `GET` | `/api/analytics/summary` | Private | Average, best day, streak & completion rate |

### User Profile
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `PUT` | `/api/user/profile` | Private | Update name, email, goal & reminder settings |
| `PUT` | `/api/user/password` | Private | Change account password |

---

## Installation & Running Locally

### Prerequisites
- **Node.js** (v18+ recommended)

### 1. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Run Backend & Frontend Together (Recommended)
From the project root:
```bash
npm run dev
```

Or run them separately:

**Backend:**
```bash
cd backend
npm run dev
```
The API server starts on `http://localhost:8000` and automatically creates `backend/data/db.json` for persistent storage.

**Frontend (new terminal):**
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.
