# Environment Variable Configuration Guide

This project uses `.env` files to manage configuration for both backend and frontend. This approach keeps sensitive credentials secure and makes deployment easier.

## Quick Start

### Backend Configuration

```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

### Frontend Configuration

```bash
cd frontend
cp .env.example .env
# Edit .env with your API URL (usually only needed for production)
```

---

## Backend (.env)

### Location
`backend/.env`

### Available Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `DB_URL` | PostgreSQL database URL | `jdbc:postgresql://localhost:5432/portfolio_db` | `jdbc:postgresql://db.example.com:5432/portfolio_db` |
| `DB_USERNAME` | Database username | `postgres` | `portfolio_user` |
| `DB_PASSWORD` | Database password | `postgres` | `your_secure_password` |
| `SERVER_PORT` | Backend server port | `8080` | `8080` |
| `SPRING_PROFILES_ACTIVE` | Active Spring profile | `dev` | `prod` |

### Example Backend .env

```bash
# Development
DB_URL=jdbc:postgresql://localhost:5432/portfolio_db
DB_USERNAME=postgres
DB_PASSWORD=postgres
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=dev
```

```bash
# Production
DB_URL=jdbc:postgresql://prod-db.example.com:5432/portfolio_db
DB_USERNAME=portfolio_user
DB_PASSWORD=SuperSecurePassword123!
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

---

## Frontend (.env)

### Location
`frontend/.env` (development)
`frontend/.env.production` (production)

### Available Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api` | `https://api.example.com/api` |
| `VITE_APP_NAME` | Application name | `Portfolio` | `My Portfolio` |

### Example Frontend .env

```bash
# Development (frontend/.env)
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Portfolio
```

```bash
# Production (frontend/.env.production)
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_APP_NAME=Portfolio
```

---

## Important Notes

### Security

1. **Never commit `.env` files to git**
   - Both `.env` files are in `.gitignore`
   - Only `.env.example` files are committed as templates

2. **Use strong passwords**
   - Especially for production databases
   - Use password managers or secret management tools

3. **Rotate credentials regularly**
   - Change database passwords periodically
   - Update `.env` files accordingly

### Environment-Specific Files

#### Backend
- `.env` - Used for all environments
- `.env.example` - Template file (committed to git)

#### Frontend (Vite)
- `.env` - Development environment (ignored by git)
- `.env.local` - Local overrides (ignored by git)
- `.env.production` - Production environment (ignored by git)
- `.env.production.local` - Production local overrides (ignored by git)
- `.env.example` - Template file (committed to git)

### Vite Environment Variables

In Vite (frontend), environment variables must be prefixed with `VITE_` to be exposed to the client:

✅ Correct: `VITE_API_BASE_URL`
❌ Incorrect: `API_BASE_URL`

### Loading Order

#### Backend (Spring Boot with spring-dotenv)
1. `.env` file in project root
2. System environment variables (override .env)
3. Command-line arguments (override everything)

#### Frontend (Vite)
1. `.env` - Loaded in all cases
2. `.env.local` - Loaded in all cases, ignored by git
3. `.env.[mode]` - Only loaded in specified mode (e.g., `.env.production`)
4. `.env.[mode].local` - Only loaded in specified mode, ignored by git

---

## Deployment

### Docker Compose

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    env_file:
      - ./backend/.env
    ports:
      - "8080:8080"

  frontend:
    build: ./frontend
    env_file:
      - ./frontend/.env.production
    ports:
      - "80:80"
```

### Cloud Platforms

#### Heroku
```bash
heroku config:set DB_URL=jdbc:postgresql://...
heroku config:set DB_USERNAME=username
heroku config:set DB_PASSWORD=password
```

#### AWS Elastic Beanstalk
Add environment variables in the EB console or `.ebextensions/env.config`

#### Google Cloud Run
```bash
gcloud run deploy --set-env-vars="DB_URL=jdbc:postgresql://..."
```

#### Azure App Service
Set environment variables in the Azure Portal under Configuration

---

## Troubleshooting

### Backend can't connect to database

1. **Check `.env` file exists:**
   ```bash
   cd backend
   ls -la .env
   ```

2. **Verify variables are set correctly:**
   ```bash
   cat .env
   ```

3. **Test database connection:**
   ```bash
   psql -h your-host -p 5432 -U your-username -d portfolio_db
   ```

### Frontend can't connect to backend

1. **Check `.env` file exists:**
   ```bash
   cd frontend
   ls -la .env
   ```

2. **Verify VITE_API_BASE_URL is correct:**
   ```bash
   cat .env
   ```

3. **Ensure environment variable has VITE_ prefix:**
   - ✅ `VITE_API_BASE_URL`
   - ❌ `API_BASE_URL`

4. **Restart the development server after changing .env:**
   ```bash
   npm run dev
   ```

### Variables not being loaded

**Backend:**
- Ensure `spring-dotenv` dependency is in `pom.xml`
- Check `.env` file is in the `backend/` directory
- Try running with explicit system variables

**Frontend:**
- Restart Vite dev server after changing `.env`
- Check variable names have `VITE_` prefix
- Run build and check: `npm run build`

---

## Best Practices

1. **Use `.env.example` as documentation**
   - Keep it updated with all required variables
   - Don't include real credentials

2. **Different configs for different environments**
   - Development: local database
   - Staging: test database
   - Production: production database

3. **Document all variables**
   - Add comments in `.env.example`
   - Explain what each variable does

4. **Validate environment variables**
   - Check required variables exist on startup
   - Fail fast if configuration is missing

5. **Use secrets management in production**
   - AWS Secrets Manager
   - Azure Key Vault
   - HashiCorp Vault
   - Google Secret Manager

---

## Example: Complete Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd visiofolio-v2

# 2. Setup backend
cd backend
cp .env.example .env
nano .env  # Edit with your database credentials
mvn clean install
mvn spring-boot:run

# 3. Setup frontend (in new terminal)
cd ../frontend
cp .env.example .env
nano .env  # Edit if needed (usually defaults are fine)
npm install
npm run dev

# 4. Access application
# Frontend: http://localhost:5173
# Backend:  http://localhost:8080
# Admin:    http://localhost:5173/admin
```

---

## Migration from Old Setup

If you were using direct configuration or system environment variables:

### Backend
1. Create `backend/.env` file
2. Move your database credentials from `application.properties` or system env to `.env`
3. Keep `application.properties` with placeholders only

### Frontend
1. Create `frontend/.env` file
2. Move your API URL from `portfolioApi.ts` to `.env` as `VITE_API_BASE_URL`
3. The code now reads from `import.meta.env.VITE_API_BASE_URL`

---

## Security Checklist

- [ ] `.env` files are in `.gitignore`
- [ ] No credentials committed to git
- [ ] `.env.example` files have no real credentials
- [ ] Production uses strong passwords
- [ ] Database user has minimal required permissions
- [ ] SSL/TLS enabled for production database connections
- [ ] Environment variables validated on startup
- [ ] Secrets rotated regularly
- [ ] Access logs monitored for unauthorized access

---

For more details on external database configuration, see `backend/EXTERNAL-DB-CONFIG.md`.
