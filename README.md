# ✈️ WanderLust

Welcome to WanderLust, your ultimate travel companion! Explore hidden gems, share your experiences, and connect with fellow travelers. With secure authentication, seamless content management, and intuitive design, planning your next adventure has never been easier.

Whether you’re a globe-trotting veteran or embarking on your first journey, WanderLust brings the world to your fingertips.

---

## 🔧 Tech Stack

```
🟢 Node.js   | 🚂 Express.js   | 🍃 MongoDB
✏️ EJS       | 🎟️ Passport.js | 🧪 Joi
```

## Features (Phase 1 & 2)

* **User Management**

  * Registration, login, logout with secure session management
  * Role-based authorization: only listing owners or review authors can modify their content

* **Listings CRUD**

  * Create, Read, Update, Delete travel destinations
  * Rich data model: title, images, description, location, price, geometry (GeoJSON)

* **Reviews**

  * Add and delete reviews on listings
  * Cascade deletion: reviews auto-removed when parent listing is deleted

* **Data Relationships**

  * Mongoose models for `User`, `Listing`, `Review` with proper references
  * Virtuals & middleware to maintain referential integrity

* **Validation & Error Handling**

  * Joi schemas for request validation (`schema.js`)
  * Async route wrapper (`utils/wrapAsync.js`) and global error handler

* **Authentication & Authorization**

  * Passport.js with `passport-local-mongoose`
  * Session stored in MongoDB via `connect-mongo`
  * Flash messages for user feedback

* **Database & Security**

  * MongoDB with Mongoose ODM
  * Environment-based configuration (via `.env`)
  * Input sanitization with `express-mongo-sanitize`
  * HTTP headers hardening with `helmet`
  * Secure cookies (`httpOnly`, `sameSite`)

## Tech Stack

* Backend: Node.js, Express.js
* Database: MongoDB, Mongoose
* Authentication: Passport.js (`passport-local`)
* Validation: Joi
* Templating: EJS (ejs-mate)
* Sessions: express-session, connect-mongo
* Security: helmet, express-mongo-sanitize, xss-clean
* Styling: CSS (Phase 2 basics)

## Coding & Commit Guidelines

1. **Branching**: `feature/YourFeature`, `fix/YourFix`, `docs/YourDocs`
2. **Commits**:

   * Use present tense: `Add user login flow`
   * Reference issues where relevant: `Add geocoding (#42)`
3. **Code Style**: Follow existing JS conventions; avoid console.logs in production; indent with 2 spaces.
4. **Pull Requests**:

   * Title: Brief description
   * Include screenshots for UI changes
   * Ensure all tests pass

## Project Structure

```
WanderLust/
├─ models/           # Mongoose models (User, Listing, Review)
├─ routes/           # Express routes (listings.js, reviews.js, users.js)
├─ utils/            # Helpers (wrapAsync, error classes)
├─ middleware.js     # Auth & validation middleware
├─ schema.js         # Joi validation schemas
├─ app.js            # App entry point & config
├─ public/css/       # Stylesheets
├─ views/            # EJS templates
├─ .env.example      # Environment variable template
├─ package.json      # Dependencies & scripts
└─ README.md         # Project overview & docs
```

## Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/Nitishh-23/WanderLust.git
   cd WanderLust
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Environment Variables**

   * Copy `.env.example` to `.env`
   * Configure:

     ```env
     DB_URL=mongodb://localhost:27017/wanderlust
     SECRET=yourSessionSecret
     ```
4. **Run the App**

   ```bash
   npm run dev
   ```
5. **Access**
   [http://localhost:3000](http://localhost:3000)

## Phase 3 Roadmap

* Deployment

  * Docker & Docker Compose
  * CI/CD with GitHub Actions
* Maps & Geocoding

  * Integrate Mapbox for interactive maps
  * Auto-geocode addresses into GeoJSON
* Enhanced UI/UX

  * Migrate to Tailwind CSS
  * Responsive, mobile-first design
  * Client-side form validation
* Additional Features

  * Search, filter, & pagination
  * Image uploads via Cloudinary
  * User profiles & avatars

## Contributing

1. Fork the project
2. Branch: `git checkout -b feature/YourFeature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/YourFeature`
5. Open a Pull Request

## License

MIT License

---

*Phase 3 in progress — deployment, maps, and UI enhancements coming soon!*
