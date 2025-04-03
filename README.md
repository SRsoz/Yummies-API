# Yummies
Yummies is a REST API where users can discover different dishes and their recipes. This API allows users to register, authenticate, and manage recipes.

## Feel free to visit the deployed page:
https://yummies-vlth.onrender.com

## Installation and setup
If you want to test the API locally:
* Clone the repository from GitHub
* Install dependencies: npm install
Run project: npm run dev

The server will run on http://localhost:5000 if no other port is chosen in the .env file.

Be sure to setup the following:
* Node.js 
* MongoDB
* A .env file with the following variables:
```json
MONGO_URI="mongodb+srv://Username:Password@cluster0.g8iv2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
PORT=5000
JWT_SECRET=recipe
```

## Object modelling
### User model
```json
{
  "_id": "ObjectId",
  "username": "string",
  "email": "string",
  "password": "string (hashed)",
  "createdAt": "Date"
}
```

### Recipe model
```json
{
  "_id": "ObjectId",
  "title": "string",
  "ingredients": ["string"],
  "instructions": "string",
  "image": "string (URL)",
  "author": "ObjectId (User Reference)",
  "createdAt": "Date"
}
```
## Resorce URI:s
### Authentication (Users)

| Method | Endpoint               | Function                   |
|-------|------------------------|-------------------------------|
| POST  | /api/users/register    | Register a new user   |
| POST  | /api/users/login       | Log in and get an JWT-token |

### Users - Admin functions

| Method  | Endpoint         | Function                     |
|--------|-----------------|----------------------------------|
| GET    | /api/users      | Get all users (admin only) |
| DELETE | /api/users/:id  | Delete a user (admin only) |

### Recept (Recipes)

| Method  | Endpoint            | Function                                     |
|--------|---------------------|--------------------------------------------------|
| GET    | /api/recipes        | Get all recipes                              |
| GET    | /api/recipes/:id    | Get a specific recipe                      |
| POST   | /api/recipes        | Create a new recipe |
| PUT    | /api/recipes/:id    | Update a recipe |
| DELETE | /api/recipes/:id    | Delete a recipe |

## Resorce representations
## HTTP methods and examples

To try the curl -x examples in the deployed version, replace the http with:
https://yummies-vlth.onrender.com

#### Register User
```json
curl -X POST http://localhost:5000/api/users/register \
     -H "Content-Type: application/json" \
     -d '{"username":"john", "email":"john@example.com", "password":"password123"}'
```
#### Login User
```json
curl -X POST http://localhost:5000/api/users/login \
     -H "Content-Type: application/json" \
     -d '{"email":"john@example.com", "password":"password123"}'
```
#### Get All Recipes
```json
curl -X GET http://localhost:5000/api/recipes
```
#### Get Recipe By Id
```json
curl -X GET http://localhost:5000/api/recipes/{recipeId}
```
#### Create A Recipe
```json
curl -X POST http://localhost:5000/api/recipes \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"title": "Pasta Carbonara", "ingredients": ["Pasta", "Eggs", "Bacon"], "instructions": "Cook pasta..."}'
```
#### Update A Recipe
```json
curl -X PUT http://localhost:5000/api/recipes/{recipeId} \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"title": "Updated Recipe"}'
```
#### Delete A Recipe
```json
curl -X DELETE http://localhost:5000/api/recipes/{recipeId} \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
### Status codes and error handling

This document outlines the status codes used in the API and their corresponding error handling mechanisms. The API follows standard HTTP response codes to indicate success or failure.

### Status codes used

#### 2xx Success

**200 OK**: Request was successful (GET, PUT, DELETE requests).

 **201 Created**: A new resource was successfully created (e.g., `registerUser`, `createRecipe`).

#### 4xx Client Errors

 **400 Bad Request**: The request was malformed or contained invalid data.  
  _Example_: Trying to register an email that is already in use.
  
 **401 Unauthorized**: Authentication is required but failed or was not provided.  
  _Example_: User attempting to update a recipe without authorization.
  
 **403 Forbidden**: The user does not have permission to perform this action.  
  _Example_: Non-admin users attempting to delete other users.
  
 **404 Not Found**: The requested resource does not exist.  
  _Example_: Attempting to fetch, update, or delete a non-existent recipe or user.

#### 5xx Server Errors

- **500 Internal Server Error**: A generic error for unexpected server-side failures.  
  _Example_: Database connection failure or unhandled exceptions.

### Authentication Middleware

 **authenticateUser**  

   `401 Unauthorized`: No token provided or token is invalid.
  
**authorizeAdmin**  
 `403 Forbidden`: User is not an admin.

### Conclusion

This documentation ensures consistency in API error handling and response codes, helping developers understand and troubleshoot responses effectively. By adhering to these guidelines, we can improve the clarity and reliability of the API's error-handling behavior.