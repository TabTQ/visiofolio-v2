# External PostgreSQL Database Configuration

The Spring Boot backend is fully compatible with external PostgreSQL databases. Here's how to configure it:

## Method 1: Environment Variables (Recommended)

Set these environment variables before starting the application:

```bash
# Linux/Mac
export DB_URL="jdbc:postgresql://your-db-host:5432/portfolio_db"
export DB_USERNAME="your_username"
export DB_PASSWORD="your_password"

# Then run the application
cd backend
mvn spring-boot:run
```

```bash
# Windows (PowerShell)
$env:DB_URL="jdbc:postgresql://your-db-host:5432/portfolio_db"
$env:DB_USERNAME="your_username"
$env:DB_PASSWORD="your_password"

# Then run the application
cd backend
mvn spring-boot:run
```

## Method 2: Direct Configuration File Edit

Edit `backend/src/main/resources/application.properties`:

```properties
# Replace localhost with your external database host
spring.datasource.url=jdbc:postgresql://your-db-host:5432/portfolio_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Method 3: Command Line Arguments

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.arguments="\
--spring.datasource.url=jdbc:postgresql://your-db-host:5432/portfolio_db \
--spring.datasource.username=your_username \
--spring.datasource.password=your_password"
```

## Examples of External Database URLs

**Local Network Database:**
```
jdbc:postgresql://192.168.1.100:5432/portfolio_db
```

**Remote Server:**
```
jdbc:postgresql://db.example.com:5432/portfolio_db
```

**Cloud Database (AWS RDS):**
```
jdbc:postgresql://myinstance.abc123.us-east-1.rds.amazonaws.com:5432/portfolio_db
```

**Docker Container:**
```
jdbc:postgresql://postgres-container:5432/portfolio_db
```

## Database Setup

Make sure your PostgreSQL database is set up:

```sql
-- Connect to PostgreSQL as admin
CREATE DATABASE portfolio_db;
CREATE USER portfolio_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;

-- If using PostgreSQL 15+, also grant schema privileges
\c portfolio_db
GRANT ALL ON SCHEMA public TO portfolio_user;
```

## Connection Pool Settings (Optional)

For external databases, you may want to add connection pool settings to `application.properties`:

```properties
# HikariCP Configuration
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.max-lifetime=1800000
```

## SSL/TLS Connection (Optional)

For secure connections to external databases:

```properties
spring.datasource.url=jdbc:postgresql://your-db-host:5432/portfolio_db?sslmode=require
# Or for development with self-signed certificates:
spring.datasource.url=jdbc:postgresql://your-db-host:5432/portfolio_db?sslmode=require&sslrootcert=/path/to/ca.crt
```

## Firewall and Network Configuration

Ensure:
1. PostgreSQL is configured to accept remote connections (edit `postgresql.conf`):
   ```
   listen_addresses = '*'
   ```

2. PostgreSQL allows connections from your application server (edit `pg_hba.conf`):
   ```
   host    portfolio_db    portfolio_user    <app-server-ip>/32    md5
   ```

3. Firewall allows connections on port 5432:
   ```bash
   # Linux (ufw)
   sudo ufw allow from <app-server-ip> to any port 5432

   # Or allow from anywhere (less secure)
   sudo ufw allow 5432/tcp
   ```

4. Restart PostgreSQL:
   ```bash
   sudo systemctl restart postgresql
   ```

## Verification

Test the connection before running the application:

```bash
# Using psql
psql -h your-db-host -p 5432 -U your_username -d portfolio_db

# Using telnet (to check network connectivity)
telnet your-db-host 5432
```

## Production Recommendations

1. **Use environment variables** instead of hardcoding credentials
2. **Enable SSL/TLS** for database connections
3. **Use a dedicated database user** with limited privileges
4. **Set up connection pooling** for better performance
5. **Configure appropriate timeout values** for your network latency
6. **Use a strong password** and rotate it regularly
7. **Implement IP whitelisting** in PostgreSQL and firewall
8. **Monitor database connections** and performance

## Troubleshooting

**Connection Refused:**
- Check if PostgreSQL is running on the external server
- Verify firewall rules allow connections
- Check PostgreSQL is listening on the correct network interface

**Authentication Failed:**
- Verify username and password
- Check `pg_hba.conf` allows connections from your IP
- Ensure the user has proper database permissions

**Timeout:**
- Increase connection timeout in application.properties
- Check network connectivity between application and database
- Verify no network issues or firewalls blocking the connection

## Docker Compose Example

If using Docker Compose with external PostgreSQL:

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - DB_URL=jdbc:postgresql://external-db-host:5432/portfolio_db
      - DB_USERNAME=portfolio_user
      - DB_PASSWORD=secure_password
    depends_on:
      - postgres

  postgres:
    image: postgres:16
    environment:
      - POSTGRES_DB=portfolio_db
      - POSTGRES_USER=portfolio_user
      - POSTGRES_PASSWORD=secure_password
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```
