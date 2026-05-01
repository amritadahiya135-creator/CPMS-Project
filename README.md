# Cloud-Based Professor Management System (CPMS)

A robust, cloud-native academic management platform built with Node.js, Express, IBM Cloudant, Vanilla JS, and Docker.

## System Architecture
- **Frontend**: Stateless, Single-Page Application (SPA) built purely with Vanilla JS, HTML, and premium CSS glassmorphism.
- **Backend**: Strict layered architecture (Routes → Controllers → Services → Models) running on Node.js/Express.
- **Database**: IBM Cloudant (NoSQL Document Store). Uses a single-database strategy with `type` indexes.
- **Security**: JWT-based authentication, bcrypt password hashing, and Role-Based Access Control (RBAC).
- **Deployment**: Fully containerized using Docker and Docker Compose.

## How to Run Locally

### 1. Configure Environment
1. Open the `backend/.env` file.
2. Ensure you add your actual IBM Cloudant credentials:
   ```env
   CLOUDANT_URL=https://your-cloudant-url.cloudant.com
   CLOUDANT_API_KEY=your_actual_api_key
   ```

### 2. Run via Docker (Recommended)
You must have Docker Desktop installed and running.
Run the following command from the root `cadproject` directory:
```bash
docker-compose up --build
```
- **Frontend App**: `http://localhost:80` (or simply `http://localhost`)
- **Backend API**: `http://localhost:5000/api/v1/health`

### 3. API Testing (Postman)
1. Open Postman.
2. Click **Import** and select the `cpms_postman_collection.json` file located in the root directory.
3. Run the **Authentication > Register Admin** request.
4. Run the **Authentication > Login** request (this automatically extracts and saves the JWT for subsequent requests).
5. You can now run all other secure endpoints!
