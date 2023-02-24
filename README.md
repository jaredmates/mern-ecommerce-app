# Fear of Monkey

## [Live Demo](https://mern-ecommerce-app-pqqo.onrender.com/)

## Table of Contents:

- [Description](#description)
- [Features](#features)
- [Admin Log In](#admin-log-in)
- [Technologies](#technologies)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)
- [Possible Future Additions](#possible-future-additions)

## Description

Fear of Monkey is a fully functional online store that allows users to browse and purchase clothing products. I built this full-stack E-commerce application using the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- Responsive Design

- React for displaying UI components

- Redux to manage application's state

- Express middleware to handle requests and routes

- Mongoose schemas to model the application data

- Authentication using Json Web Tokens

- Password encryption using Bcrypt library

- Protected Admin/User routes in both front-end and back-end

- Remain logged-in while page refreshed with Json Web Tokens and Local Storage

- Inventory Management System

- Admin CRUD operations for products, users, and orders

- Admin dashboard utilizing Google Charts

- Email order confirmation after transaction processed

- Media storage using Multer library and Cloudinary service

- Users can sign up for an account and sign into already existing accounts

- Users can add items to the shopping Cart

- Users can increase/decrease the quantity of an item in the shopping Cart

- Users can remove items from the shopping Cart

- Users can pay for their items using Stripe or Paypal, two secure and widely-used payment processing platforms

- Users can update their profile information

- App deployed using Render service

## Admin Log In:

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
