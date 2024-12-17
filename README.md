# MERN Jobs Tracker

A full-stack MERN application for tracking job applications with features tailored for both regular users and admins.

## Features

- **User/Admin Authentication**: Secure login and role-based access.
- **Add Jobs**: Add job details including position, company, location, status, and job type.
- **Track Jobs**: View and query all jobs in the "All Jobs" section.
- **Job Stats**: Gain insights into your job applications with visualized statistics.
- **Profile Management**: Update your profile information.
- **Admin Panel**: Access an admin page to view the current users and total jobs.

## Usage


### 1. Setup MongoDB
- Create a MongoDB database using [MongoDB Atlas](https://www.mongodb.com/atlas/database) or a local MongoDB instance.
- Obtain your MongoDB URI.

### 2. Environment Variables
Create a `.env` file in the root of your project and populate it with the following variables:

```
NODE_ENV=development
PORT=5100
MONGO_URL=your_mongodb_uri
JWT_SECRET=abc123
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret
```

Replace the placeholders with your actual values.

### 3. Install Dependencies
Run the following command to install the required dependencies for both the client and server:

```
npm run setup-project
```

### 4. Run the Application
Start the development environment with the following command:

```
npm run client | npm run server
```

This will start both the client (React frontend) and the server (Node.js backend).

### 5. Build & Deploy
To build and deploy the application, use the following command:

```
npm run setup-production-app
node server.js
```

### 6. Seed Database with Sample Jobs
To populate your database with sample job data, run:

```
node populate.js
```

## Tech Stack

- **Frontend**: React, Styled Components
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas or local instance)
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: Cloudinary
