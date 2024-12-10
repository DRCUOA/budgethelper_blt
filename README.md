# Personal Budget Tracker - A Complete Guide

## What is this app?

This is a personal budget tracking application that helps you manage your money. Think of it as your digital financial diary where you can:
- Track your income and expenses
- See where your money goes with beautiful charts
- Import your bank statements
- Get insights about your spending habits

## How does it work?

### For Users
1. Create an account with your email
2. Add your income (salary, freelance work, etc.)
3. Record your expenses (rent, groceries, etc.)
4. Import transactions from your bank's CSV files
5. View charts and reports about your spending
6. Track your savings progress

### Under the Hood
The app is split into two main parts:

#### Frontend (What you see)
- Built with Vue 3 (a modern JavaScript framework)
- Uses Pinia for managing data across screens
- Shows beautiful charts with Chart.js
- Styled with Tailwind CSS for a clean look

#### Backend (The engine)
- Runs on Node.js with Express
- Uses SQLite database (perfect for personal projects)
- Handles user accounts and data securely
- Processes CSV imports

## Want to Work on This Project?

### Setting Up Your Development Environment

1. Install the basics:
   ```bash
   # Install Node.js from nodejs.org
   # Install Git from git-scm.com
   ```

2. Get the code:
   ```bash
   git clone https://github.com/your-username/budget-tracker.git
   cd budget-tracker
   npm install
   ```

3. Set up your database:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. Start the development servers:
   ```bash
   # Start backend
   npm run server
   
   # In a new terminal, start frontend
   npm run dev
   ```

### Adding New Features

Want to add something new? Here are some ideas:
1. Recurring transactions
2. Budget goals and alerts
3. Multiple currency support
4. Expense sharing between users
5. Mobile app version

## Deploying to Production

### Frontend Deployment (Netlify - Free Tier)

1. Sign up at netlify.com
2. From your dashboard:
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Environment variables:
     - VITE_API_URL: Your backend URL

### Backend Deployment (Railway - Free Tier)

1. Sign up at railway.app
2. From your dashboard:
   - Click "New Project" → "Deploy from GitHub"
   - Connect your repository
   - Add environment variables:
     - JWT_SECRET: Your secret key
     - CLIENT_URL: Your Netlify URL
   - The app will auto-deploy

### Alternative Backend Hosting (Render - Free Tier)

1. Sign up at render.com
2. Create a new Web Service:
   - Connect your GitHub repo
   - Select the branch to deploy
   - Set build command: `npm install`
   - Set start command: `npm run server`
   - Add environment variables (same as Railway)

### Database Options

For small to medium projects:
- Stick with SQLite (included in the app)
- Store data file in `/data` directory

For scaling up:
1. Supabase (Free PostgreSQL database)
   - Sign up at supabase.com
   - Create new project
   - Get connection string
   - Update Prisma configuration

2. PlanetScale (Free MySQL database)
   - Sign up at planetscale.com
   - Create database
   - Get connection string
   - Update Prisma configuration

## Common Issues & Solutions

1. "Can't connect to database"
   - Check your database URL in .env
   - Ensure migrations are run
   - Verify database permissions

2. "Authentication failed"
   - Check JWT_SECRET in environment variables
   - Ensure cookies are enabled
   - Verify CORS settings match your domains

3. "Charts not showing"
   - Clear browser cache
   - Check for JavaScript console errors
   - Verify data is being loaded correctly

## Getting Help

1. Check the issues on GitHub
2. Common problems:
   - Database connection issues
   - CORS errors in development
   - Environment variable misconfigurations

## Contributing

Want to help? Great! Here's how:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for new features
5. Submit a pull request

Remember to:
- Follow the existing code style
- Add comments to complex logic
- Update documentation
- Test thoroughly

## Learning Resources

1. Vue 3: vuejs.org/guide
2. Express: expressjs.com/guide
3. Prisma: prisma.io/docs
4. Tailwind CSS: tailwindcss.com/docs

Happy coding! 🚀