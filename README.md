# Betting Website

A modern betting platform built with Angular for the frontend and Spring Boot for the backend.

!!! Backend not fully implemented !!!

## Features

- User authentication (login, register, profile management)
- Live match tracking with real-time updates
- Betting slip functionality
- Match cards with odds and betting options
- Responsive design for all devices
- User profile and settings management
- Ticket history and management

## Project Structure

```
betting_website/
├── frontend/               # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # UI components
│   │   │   ├── services/    # Angular services
│   │   │   ├── models/      # Data models
│   │   │   └── shared/      # Shared components and utilities
│   │   ├── assets/          # Static assets
│   │   └── environments/    # Environment configurations
│   ├── package.json         # Frontend dependencies
│   └── angular.json         # Angular configuration
│
└── backend/                # Spring Boot backend application
    ├── src/
    │   ├── main/
    │   │   ├── java/        # Java source code
    │   │   └── resources/   # Application properties
    │   └── test/            # Test files
    └── pom.xml              # Maven dependencies
```

## Requirements

### Frontend Requirements

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Angular CLI (v15.x or higher)

### Backend Requirements

- Java JDK 17 or higher
- Maven 3.8.x or higher
- Spring Boot 3.x

## Installation and Setup

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   ng serve
   ```

4. Access the application at `http://localhost:4200`

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Build the application:
   ```
   mvn clean install
   ```

3. Run the application:
   ```
   mvn spring-boot:run
   ```

4. The API will be available at `http://localhost:8080`

## Development

### Frontend Development

- The frontend is built with Angular and uses Angular Material for UI components
- SCSS is used for styling with a modular approach
- Services are used for API communication and state management
- Components are organized by feature

### Backend Development

- The backend is built with Spring Boot
- RESTful API endpoints for all functionality
- JWT authentication for secure access
- Database integration for persistent storage

## Environment Configuration

### Frontend Environment

Create a `.env` file in the frontend directory with the following variables:

```
API_URL=http://localhost:8080/api
```

### Backend Environment

Configure the application properties in `src/main/resources/application.properties`:

```
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/betting_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
jwt.secret=your_jwt_secret
jwt.expiration=86400000
```

## Testing

### Frontend Testing

```
cd frontend
ng serve
```

### Backend Testing

```
cd backend
mvn test
```

## Deployment

### Frontend Deployment

1. Build the production version:
   ```
   cd frontend
   ng build --prod
   ```

2. Deploy the contents of the `dist` folder to your web server

### Backend Deployment

1. Build the JAR file:
   ```
   cd backend
   mvn clean package
   ```

2. Run the JAR file:
   ```
   java -jar target/betting-website-0.0.1-SNAPSHOT.jar
   ```
