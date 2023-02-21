# Fear of Monkey

## [Live Demo](https://mern-ecommerce-app-pqqo.onrender.com/)

## Table of Contents:

- [About The App](#about-the-app)
- [Admin Permissions](#admin-permissions)
- [Technologies](#technologies)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)
- [Possible Future Additions](#possible-future-additions)

## About The App:

Fear of Monkey is an ecommerce store for a fake clothing brand. I built this app using the MERN stack.

## Admin Permissions:

To perform all CRUD operations on products, users, and orders, sign in with:

Username: `admin@gmail.com` and Password: `123456`

Admin-only pages can then be selected from the header.

## Technologies:

**Client:**

- React.js

- React Bootstrap

- MUI

- Redux

- Axios

- React Router

- Google Charts

**Server:**

- Node.js

- Express.js

- Mongoose

- jsonwebtoken

**Database:**

- MongoDB

**Additional Technologies:**

- Paypal Payment System

- Stripe Payment System

- Cloudinary Image Hosting Service

## Environment Variables:

To run this project locally, you will need to add the following environment variables to your .env file.
Setting up accounts for MongoDB, Paypal, Stripe, and Cloudinary will be necessary.

`MONGODB_URI`

`JWT_SECRET`

`PAYPAL_CLIENT_ID`

`STRIPE_SECRET_KEY`

`STRIPE_PUBLISHABLE_KEY`

`CLOUDINARY_URL`

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

## Run Locally:

Clone the project

```bash
  git clone https://github.com/jaredmates/mern-ecommerce-app.git
```

Go to the project directory

```bash
  cd mern-ecommerce-app
```

Install server dependencies

```bash
  npm install
```

Install client dependencies

```bash
  npm run install-client
```

Start the server and client

```bash
  npm run dev
```

## Possible Future Additions:

- Recaptcha for security
- Forgot password
- Add size option for the products: small, medium, large, x-large
- Add reviews
- Refactor code to work with Redux slices
- Refactor code to use accesstokens and refreshtokens for authorization
- User Login System with Google
