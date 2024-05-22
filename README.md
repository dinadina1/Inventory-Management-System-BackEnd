# Inventory Management System -BackEnd

<p>Postman API Documentation: https://documenter.getpostman.com/view/33767617/2sA3JM7gqC</p>
<br>
<p>Render Base URL: https://inventory-qxcd.onrender.com</p>

<br>

## Table of Contents
<ol>
  <li>Project Overview</li>
  <li>Features</li>
  <li>Tech Stack</li>
  <li>Setup and Installation</li>
  <li>Project Structure</li>
  <li>API Endpoints</li>
  <li>Authentication</li>
  <li>Middleware</li>
  <li>Usage</li>
</ol>

<br>

## Project Overview

<p>The Inventory Management System backend is built with Node.js and Express.js, providing RESTful APIs for managing inventory data. The backend supports CRUD operations, user authentication, role-based access control, and inventory tracking.</p>

<br>

## Features

<ul>
  <li>User authentication with JWT.</li>
  <li>Role-based access control (Admin and User roles).</li>
  <li>CRUD operations for inventory products.</li>
  <li>Stock tracking and alerts for low inventory.</li>
  <li>Management of purchase orders and Vendors.</li>
  <li>Reporting and analytics on inventory data.</li>
</ul>

<br>

## Tech Stack

<ul>
  <li><strong>Backend:</strong> Node.js, Express.js, nodemailer, exceljs, dotenv, cookie-parser, cors.</li>
  <li><b>Database:</b> MongoDB, Mongoose</li>
  <li><b>Authentication:</b> JWT, Bcrypt</li>
</ul>

<br>

## Setup and Installation
### Prerequisites

<ul>
  <li>Node.js</li>
  <li>npm</li>
  <li>MongoDB</li>
</ul>

<br>

## Installation

<ol>
  <li>Clone the repository:</li>

  ```
git clone https://github.com/dinadina1/Inventory-Management-System-BackEnd
```

<li>Navigate to the project directory:</li>

```
cd inventory-management-backend
```

<li>Install dependencies:</li>

```
npm install
```

<li>Set up environment variables:</li>
<p>Create a .env file in the root directory and add the following variables:</p>

```
PORT=3500
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

<li>Start the development server:</li>

```
npm start
```

</ol>

<br>

## Project Structure

```
inventory-management-backend/
├── controllers/
├── middleware/
├── model/
├── routes/
├── utils/
├── .env
├── app.js
├── server.js
└── package.json

```
<ul>
  <li><b>controllers/:</b> Handle the business logic for different routes.</li>
  <li><b>middlewares/:</b> Custom middleware functions.</li>
  <li><b>models/:</b> Mongoose models for MongoDB collections.</li>
  <li><b>routes/:</b> Define API endpoints.</li>
  <li><b>utils/:</b> Utility functions and helpers.</li>
  <li><b>app.js:</b> Main application setup.</li>
  <li><b>server.js:</b> Entry point to start the server.</li>
</ul>

<br>

## API Endpoints

<p>Refer to the <a href="https://documenter.getpostman.com/view/33767617/2sA3JM7gqC" target="_blank">API Documentation</a> for detailed information on available endpoints.</p>

<br>

## Authentication

<ul>
  <li><b>JWT:</b></b> Used for secure authentication.</li>
  <li><b>Bcrypt:</b> Used for password hashing.</li>
</ul>

<br>

## Middleware

<ul>
  <li><b>Auth Middleware:</b> Protect routes and ensure users are authenticated.</li>
  <li><b>Admin Middleware:</b> Ensure users have the correct roles to access specific routes.
</li>
</ul>

<br>

## Usage

<ol>
  <li><b>User Authentication:</b> Register and log in to obtain a JWT.</li>
  <li><b>Manage Inventory:</b> Use CRUD endpoints to manage inventory products.</li>
  <li><b>Track Stock:</b> Monitor stock levels and receive alerts.</li>
  <li><b>Manage Orders:</b> Track and manage purchase orders and suppliers.</li>
    <li><b>Generate Reports:</b> Access analytics on inventory data.</li>
</ol>




