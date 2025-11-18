# Modern Portfolio Website

A full-stack portfolio website built with Spring Boot backend, PostgreSQL database, and React frontend with Claude.ai-inspired theme.

## Architecture

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: PostgreSQL
- **ORM**: JPA/Hibernate
- **API**: REST with full CRUD operations

### Frontend
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Theme**: Claude.ai-inspired design with dark/light mode

## Features

### Portfolio Pages
- **Home**: Personal information and bio
- **Projects**: Showcase of projects with tags, images, and links
- **Experience**: Professional work experience with responsibilities and achievements
- **Academics**: Educational background and publications
- **Certifications**: Professional certifications
- **Skills**: Technical and soft skills with proficiency levels

### Admin Panel
- Add, edit, and delete projects
- Manage work experiences
- Update academic records and certifications
- Modify skills and proficiency levels
- Real-time updates reflected on portfolio pages

### Theme
- Light/Dark mode toggle
- Theme preference persisted in localStorage
- Claude.ai-inspired clean, professional design
- Fully responsive layout

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+
- Node.js 18+ and npm
- Git

## Setup Instructions

### 1. Database Setup

```bash
# Install PostgreSQL (if not already installed)
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL service
sudo service postgresql start

# Create database
sudo -u postgres psql
CREATE DATABASE portfolio_db;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO postgres;
\q
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run

# The backend will start on http://localhost:8080
# Initial data from the old portfolio will be automatically loaded
```

The backend provides the following REST API endpoints:

- `GET/POST /api/personal-info` - Personal information
- `GET/POST/PUT/DELETE /api/projects` - Projects
- `GET/POST/PUT/DELETE /api/experiences` - Work experience
- `GET/POST/PUT/DELETE /api/academics` - Academic records
- `GET/POST/PUT/DELETE /api/skills` - Skills

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev

# The frontend will start on http://localhost:5173
```

### 4. Access the Application

- **Portfolio**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **API Documentation**: http://localhost:8080/api

## Development

### Backend Development

The backend is structured as follows:

```
backend/
├── src/main/java/com/portfolio/
│   ├── entity/          # JPA entities
│   ├── repository/      # Data repositories
│   ├── service/         # Business logic
│   ├── controller/      # REST controllers
│   ├── config/          # Configuration and data initialization
│   └── PortfolioApplication.java
└── src/main/resources/
    └── application.properties
```

### Frontend Development

The frontend is structured as follows:

```
frontend/
├── src/
│   ├── api/             # API service layer
│   ├── components/      # React components
│   │   ├── ui/          # UI components (Button, Card, Input)
│   │   └── layout/      # Layout components (Header, Sidebar, Footer)
│   ├── contexts/        # React contexts (Theme)
│   ├── pages/           # Page components
│   │   ├── portfolio/   # Portfolio pages
│   │   └── admin/       # Admin panel
│   ├── types/           # TypeScript type definitions
│   ├── lib/             # Utility functions
│   └── index.css        # Global styles and theme
└── package.json
```

## Building for Production

### Backend

```bash
cd backend
mvn clean package
java -jar target/portfolio-backend-1.0.0.jar
```

### Frontend

```bash
cd frontend
npm run build
# Build output will be in frontend/dist
```

Deploy the `dist` folder to any static hosting service.

## Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Database connection
spring.datasource.url=jdbc:postgresql://localhost:5432/portfolio_db
spring.datasource.username=postgres
spring.datasource.password=postgres

# Server port
server.port=8080
```

### Frontend Configuration

Edit `frontend/src/api/portfolioApi.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

Change this to your production API URL when deploying.

## Data Migration

The application automatically migrates data from your existing portfolio on first startup. The data initialization service (`DataInitializer.java`) loads all your existing:

- Personal information
- Projects (4 items)
- Work experiences (3 items)
- Academic records (9 items)
- Skills (18 items)

## Technologies Used

### Backend
- Spring Boot Web
- Spring Data JPA
- PostgreSQL Driver
- Lombok
- Jackson (JSON processing)

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- TanStack React Query
- Axios
- Lucide React (icons)
- React Hook Form
- Zod (validation)

## Troubleshooting

### Database Connection Issues

If you get database connection errors:

1. Ensure PostgreSQL is running: `sudo service postgresql status`
2. Verify database exists: `sudo -u postgres psql -l`
3. Check credentials in `application.properties`

### Port Already in Use

If port 8080 or 5173 is already in use:

- Backend: Change `server.port` in `application.properties`
- Frontend: Vite will automatically try the next available port

### CORS Issues

CORS is configured to allow all origins (`*`). For production, update the `@CrossOrigin` annotations in controllers to specify your frontend domain.

## License

© 2024 StarT3Tech. All rights reserved.

## Support

For issues and questions, please open an issue on the GitHub repository.
