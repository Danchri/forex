# ForexClass - Crypto & Forex Education Platform

A full-stack web application offering crypto and forex courses with premium Telegram signal access.

## Features

- **Course Management**: Comprehensive crypto and forex courses
- **User Authentication**: Secure registration and login system
- **Subscription System**: Monthly subscriptions for premium content
- **Telegram Integration**: Automatic access to private Telegram channels
- **Payment Processing**: Secure payment handling with automatic subscription management

## Tech Stack

### Backend
- Django 4.2+
- Django REST Framework
- PostgreSQL
- Celery (for background tasks)
- Redis (for caching and task queue)
- Telegram Bot API

### Frontend
- React 18
- Vite
- React Router
- Axios
- Tailwind CSS
- React Query

## Project Structure

```
forexclass/
├── backend/                 # Django backend
│   ├── forexclass/         # Main Django project
│   ├── apps/               # Django apps
│   │   ├── users/          # User management
│   │   ├── courses/        # Course management
│   │   ├── payments/       # Payment processing
│   │   └── telegram_bot/   # Telegram integration
│   ├── requirements.txt
│   └── manage.py
├── frontend/               # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml      # Development environment
└── README.md
```

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL
- Redis

### Backend Setup
1. Navigate to backend directory
2. Create virtual environment: `python -m venv venv`
3. Activate virtual environment: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Run migrations: `python manage.py migrate`
6. Create superuser: `python manage.py createsuperuser`
7. Start server: `python manage.py runserver`

### Frontend Setup
1. Navigate to frontend directory
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Environment Variables

Create `.env` files in both backend and frontend directories with the required environment variables.

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/forexclass
REDIS_URL=redis://localhost:6379/0
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHANNEL_ID=your-private-channel-id
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

## Development

- Backend runs on http://localhost:8000
- Frontend runs on http://localhost:5173
- Admin panel available at http://localhost:8000/admin

## License

MIT License
