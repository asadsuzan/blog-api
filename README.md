# Blog Project Backend

## Overview

The Blog Project is a backend application built for a blogging platform. It allows users to write, update, and delete blogs while enabling admins to manage users and their blogs. The project includes secure authentication, role-based access control, and a public API for reading blogs with search, sort, and filter functionalities.

---

## Features

### User Roles

#### Admin:

- Can delete any blog.
- Can block any user.
- Cannot update any blog.

#### User:

- Can register and log in.
- Can create blogs (only when logged in).
- Can update and delete their own blogs.
- Cannot perform admin actions.

### Authentication & Authorization

#### Authentication:

- Users must log in to perform write, update, and delete operations.

#### Authorization:

- Role-based access control to differentiate Admin and User actions.

### Blog API (Public):

- Includes blog title, content, author details, and other necessary information.
- Supports search, sorting, and filtering functionalities.

---

## Technologies Used

- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**

---

## Models

### User Model:

```typescript
{
  name: string; // Full name of the user.
  email: string; // Email for authentication and communication.
  password: string; // Securely stored password.
  role: 'admin' | 'user'; // Default role is "user".
  isBlocked: boolean; // Default is false.
  createdAt: Date; // Timestamp when the user is created.
  updatedAt: Date; // Timestamp of the last update.
}
```

### Blog Model:

```typescript
{
  title: string; // Blog title.
  content: string; // Main body of the blog post.
  author: ObjectId; // Reference to the User model.
  isPublished: boolean; // Default is true.
  createdAt: Date; // Timestamp when the blog is created.
  updatedAt: Date; // Timestamp of the last update.
}
```

---

## API Endpoints

### 1. Authentication

#### 1.1 Register User

**POST** `/api/auth/register`

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### 1.2 Login User

**POST** `/api/auth/login`

Request Body:

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

---

### 2. Blog Management

#### 2.1 Create Blog

**POST** `/api/blogs`

Requires Authorization: `Bearer <token>`

Request Body:

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

#### 2.2 Update Blog

**PATCH** `/api/blogs/:id`

Requires Authorization: `Bearer <token>`

Request Body:

```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

#### 2.3 Delete Blog

**DELETE** `/api/blogs/:id`

Requires Authorization: `Bearer <token>`

#### 2.4 Get All Blogs (Public)

**GET** `/api/blogs`

Query Parameters:

- `search`: Search by title or content.
- `sortBy`: Sort by fields like `createdAt` or `title`.
- `sortOrder`: `asc` or `desc`.
- `filter`: Filter by author ID.

Example:

```
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&author=authorId
```

---

### 3. Admin Actions

#### 3.1 Block User

**PATCH** `/api/admin/users/:userId/block`

Requires Authorization: `Bearer <admin_token>`

#### 3.2 Delete Blog

**DELETE** `/api/admin/blogs/:id`

Requires Authorization: `Bearer <admin_token>`

---

## Error Handling

Consistent error responses are implemented for:

- **Validation Errors**
- **Authentication Errors**
- **Authorization Errors**
- **Not Found Errors**
- **Internal Server Errors**

Example Error Response:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Additional details" }
}
```

---

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/asadsuzan/blog-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd blog-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     DB_URI=<your_mongo_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```

5. Start the server:

   ```bash
   npm run dev
   ```

6. The server will run at `http://localhost:5000`.

---

## Future Enhancements

- Add pagination for the blog listing API.
- Implement a frontend for the blogging platform.
- Add email notifications for blog updates.

---

### 🌐 Deployment

The API is deployed and live on Vercel, making it accessible for testing and integration.

**Base URL:**  
🌍 [https://blog-api-assignment-3.vercel.app](https://blog-api-assignment-3.vercel.app)

#### 🔎 Live API Endpoints

**Health Check**

- **Endpoint:** `/status`
- **Method:** `GET`

**Example Request:**

```bash
curl https://blog-api-assignment-3.vercel.app/status
```

Response:

```javascript
OK;
```

## License
