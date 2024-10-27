# Pharmaceutical Product Management App Frontend

A Vue.js frontend application built with Vite for managing pharmaceutical research products. The application provides functionality to view, search, add, edit, and delete pharmaceutical products.

## Related Repositories

- Backend: [PharmaceuticalAppBackend](https://github.com/StylianosNikopoulos/PharmaceuticalAppBackend.git)

## Prerequisites

- Node.js 
- npm 
- Docker (optional, for containerized deployment)

## Local Development Setup

1. Clone the repository
```bash
git clone https://github.com/StylianosNikopoulos/PharmaceuticalAppFrontend.git
cd PharmaceuticalAppFrontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Docker Setup Using Docker Compose

1. Create the required Docker network:
```bash
docker network create app-mynetwork
```

2. Build the Docker image and run the container:
```bash
docker-compose up --build
```

## Application Routes

- `/`: Home page with product listing and search
- `/products/:id`: Detailed view of a specific product
- `/products/edit/:id`: Update a specific product
- `/products/add`: Add new product form
