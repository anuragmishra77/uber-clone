# Backend API Documentation

## User Registration

### Endpoint
- Method: POST
- URL: /users/register

### Description
This endpoint registers a new user in the system. It accepts the user's full name, email, and password, hashes the password, creates a new user record, and returns a JWT token.

### Required Request Body
The request body must be in JSON format.

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "123456"
}
```

### Required Fields
- fullname.firstname: required, minimum 3 characters
- fullname.lastname: optional but recommended, minimum 3 characters if provided
- email: required, must be a valid email address
- password: required, minimum 6 characters

### Example Request
```bash
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "123456"
}
```

### Success Response body
#### Status: 201 Created

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "hashed_password"
  }
}
```

### Error Responses
#### Status: 400 Bad Request
Returned when validation fails or required data is missing.

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long"
    }
  ]
}
```

### Notes
- The password is hashed before being stored.
- A JWT token is returned on successful registration.
- The endpoint uses validation rules for the request body.

---

## User Login

### Endpoint
- Method: POST
- URL: /users/login

### Description
This endpoint logs in an existing user by verifying the provided email and password. On success, it returns a JWT token and the authenticated user details.

### Required Request Body
The request body must be in JSON format.

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Required Fields
- email: required, must be a valid email address
- password: required, minimum 6 characters

### Example Request
```bash
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

### Success Response body
#### Status: 200 OK

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

### Error Responses
#### Status: 401 Unauthorized
Returned when the provided email does not exist.

```json
{
  "error": "Invalid email or password"
}
```

#### Status: 400 Bad Request
Returned when the password is incorrect or validation fails.

```json
{
  "error": "Invalid email or password"
}
```

### Notes
- The login endpoint checks the stored password against the submitted password.
- A JWT token is returned on successful login.
- The endpoint validates the email and password format.
