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
