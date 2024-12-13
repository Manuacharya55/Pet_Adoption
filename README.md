# Pet Adoption Platform

A full-stack web application for pet adoption, built with React and Node.js. The platform allows users to browse pets, manage adoption processes.

## Tech Stack

### Frontend:

- **React** (`^18.3.1`): JavaScript library for building user interfaces.
- **@mui/material** (`^6.2.0`): Material-UI components for a responsive and modern design.
- **@mui/icons-material** (`^6.2.0`): Material icons for intuitive UI.
- **axios** (`^1.7.9`): HTTP client for API requests.
- **react-router-dom** (`^7.0.2`): Routing library for navigation.
- **react-toastify** (`^10.0.6`): For showing toast notifications.
- **swiper** (`^11.1.15`): For creating responsive sliders.

### Backend:

- **Node.js**: JavaScript runtime for server-side development.
- **Express** (`^4.21.2`): Fast and lightweight web framework.
- **bcrypt** (`^5.1.1`): For password hashing.
- **cloudinary** (`^2.5.1`): Image and file management.
- **cors** (`^2.8.5`): Middleware for enabling cross-origin requests.
- **dotenv** (`^16.4.7`): For environment variable management.
- **jsonwebtoken** (`^9.0.2`): For secure authentication.
- **mongoose** (`^8.8.4`): MongoDB object modeling.
- **multer** (`^1.4.5-lts.1`): Middleware for handling file uploads.
- **nodemailer** (`^6.9.16`): For sending emails.

### Database:

- **MongoDB**: NoSQL database for data storage.

## Features

### User Features:

- Browse available pets with profiles.
- Register and log in with secure authentication.
- Save favorite pets to a wishlist.
- Apply for pet adoption.
- Receive email notifications about adoption status.

### Shopkeeper Features:

- Add, edit, or delete pet profiles.
- Manage adoption requests.
- Upload pet images to Cloudinary.

## Installation

### Prerequisites:

- Node.js installed on your machine.
- MongoDB database instance.
- Cloudinary account for image management.

### Environment Variables:

Create a `.env` file in the `server` directory with the following variables:

```env
MONGO_URI=your_mongo_uri
PORT=your_port
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
NODEMAILER_USER=your_email_user
NODEMAILER_PASSWORD=your_email_password

## Backend Setup

1. **Navigate to the `server` directory:**
   ```bash
   cd server
2. **Install all dependencies:**
   ```bash
   npm i 
3. **To run server:**
   ```bash
   cd server
   node index.js
4. **To run client:**
   ```bash
   cd client
   npm run dev

