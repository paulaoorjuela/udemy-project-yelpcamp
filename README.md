# YelpCamp

A full-stack web application where users can create, view, and review campgrounds. This project is part of the Udemy course on web development and covers authentication, authorization, and CRUD operations.

## 🚀 Features

- User authentication (sign up, login, logout)

- Create, edit, and delete campgrounds

- Add reviews to campgrounds

- Image uploads

- Map integration (using Mapbox)

- Responsive design

## 🛠 Technologies Used

- **Frontend:** EJS, Bootstrap

- **Backend:** Node.js, Express.js

- **Database:** MongoDB (Mongoose ORM)

- **Authentication:** Passport.js

- **Cloud Storage:** Cloudinary (for image uploads)

- **Geolocation API:** MapTiler Cloud

## 📌 Installation & Setup

### Prerequisites

- **Node.js** and npm installed

- **MongoDB** installed and running locally or using a cloud database (MongoDB Atlas)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/paulaoorjuela/udemy-project-yelpcamp.git
    cd yelpcamp

2. Install dependencies:
    ```bash
    npm install

3. Create a .env file in the root directory and add the following environment variables:
    ```bash
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    API_SECRET=your_cloudinary_secret
    API_KEY=your_cloudinary_key
    MAPTILER_API_KEY=your_maptiler_token
    DB_URL=mongodb://localhost:27017/yelpcamp  # or your MongoDB Atlas connection string
    SECRET=your_session_secret

4. Seed the database with sample data (optional):
    ```bash
    node seeds/index.js

5. Start the server:
    ```bash
    npm run dev

6. Open the app in your browser:
    ```bash
    http://localhost:3000

## 🌍 Deployment

To deploy the app, you can use platforms like:

- **Vercel** (for backend hosting)

- **MongoDB Atlas** (for database hosting)

**Ensure that your environment variables are correctly set up**

## 💡 Contributions & Issues
Feel free to submit a pull request or report any issues in the repository!