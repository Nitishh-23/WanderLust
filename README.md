# WanderLust 🌍

**Live Site:** [https://wanderlust-6nod.onrender.com/listings](https://wanderlust-6nod.onrender.com/listings)

---

## Overview

<img width="1918" height="944" alt="image" src="https://github.com/user-attachments/assets/8717e2ad-88f0-4029-a4c1-0cf259b94960" />




**WanderLust** is a full-stack travel accommodation web application where users can explore and view various listings of stays across different locations. Built with EJS templating and the Express.js framework, the project demonstrates end-to-end functionality of a listing platform, from database modeling to frontend rendering.

---

## Features

🏕️ View Listings: Explore a wide range of stay listings with pricing, images, descriptions, and locations.

➕ Add New Listings: Any registered user can create new listings with details like title, image, price, location, and description.

📝 Edit/Delete Listings: Listings are editable and removable using dynamic routes and secure forms.

📷 Image Uploads: Multiple image support using Cloudinary.

🗺️ Location Tagging: Listings include a textual location field input by the user (without map integration).

🔒 Authentication System: Includes secure user registration, login, and session management with Passport.js. Visitors can sign up or log in to access protected routes.

💬 Review System: Users can leave reviews with star ratings and comments on listings.

🔁 AJAX Integration: The site handles AJAX API requests smoothly for review deletion and dynamic page updates.
---

## Technologies Used

| Layer       | Tech Stack                                      |
| ----------- | ----------------------------------------------- |
| Frontend    | HTML, CSS, Bootstrap, EJS (Embedded JavaScript) |
| Backend     | Node.js, Express.js                             |
| Database    | MongoDB, Mongoose                               |
| Cloud/Image | Cloudinary for media uploads                    |
| Auth        | Passport.js, express-session            |
| Hosting     | Render (App), MongoDB Atlas (DB)                |

---

## Installation & Setup

### Prerequisites

* Node.js (v20 or above)
* MongoDB Atlas account
* Cloudinary  API credentials

### Environment Variables

Create a `.env` file in the root directory with the following:

```env
DB_URL=your_mongodb_atlas_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
MAPBOX_TOKEN=your_mapbox_access_token
SECRET=your_cookie_secret
```

### Steps to Run Locally

1. **Clone the Repository**

```bash
git clone https://github.com/Nitishh-23/WanderLust.git
cd WanderLust
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start the Server**

```bash
npm start
```

5. **Visit the App** Open your browser and go to:

```
http://localhost:8080/listings
```

---

## Folder Structure

```bash
WanderLust/
├── models/            # Mongoose schema definitions
├── public/            # Static files (Bootstrap, client-side JS, images)
├── routes/            # Modular route definitions for listings, users, reviews
├── controllers/       # Logic for handling routes and middleware
├── middleware/        # Custom middleware (authentication, validation, etc.)
├── utils/             # Utility functions (e.g. ExpressError, catchAsync)
├── views/             # EJS templates for rendering pages
├── node_modules/      # Project dependencies
├── app.js             # Entry point for Express application
├── package.json       # Project metadata and dependencies
├── cloudinary/        # Cloudinary config and upload setup
├── public/scripts/    # Custom frontend JavaScript
├── public/styles/     # Custom CSS and Bootstrap overrides
└── .env               # Environment config (not tracked)
```

---

#🔍 Filter icons and search bar are currently for display only and open for contributions

---

## License

Licensed under the **MIT License**.

---

## Author

**Nitish Agrawal**
[GitHub](https://github.com/Nitishh-23) 

---

✨ *Happy exploring with WanderLust!* ✨
