# Yummies
Yumcraft is a rest-API where users can find different dishes and recipes for them.

## Object modelling
### User
_id: ObjectId (unique ID)<br>
username: String<br>
email: String<br>
password: String (hashed)<br>
createdAt: Register date<br>

### Recipes
_id: ObjectId (unique ID)<br>
title: String (the recipes title)<br>
ingredients: Array<br>
instructions: String<br>
image: String (URL to image)<br>
author: ObjectId (referens to the user who made recipe)<br>
createdAt: Date (date for the created recipe)<br>

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
| POST   | /api/recipes        | Create a new recipe (admin only) |
| PUT    | /api/recipes/:id    | Update a recipe (admin only) |
| DELETE | /api/recipes/:id    | Delete a recipe (admin only) |

## Resorce representations
## HTTP methods

| Operation        | Method  | Endpoint             | Description                                    |
|-----------------|--------|----------------------|------------------------------------------------|
| Register User   | POST   | /api/users/register  | Register a new user                            |
| Login           | POST   | /api/users/login     | Generate a JWT token                          |
| Get all recipes | GET    | /api/recipes        | Retrieve all recipes                          |
| Get a recipe    | GET    | /api/recipes/:id    | Retrieve a specific recipe                    |
| Add a recipe    | POST   | /api/recipes        | Create a new recipe (requires admin) |
| Update recipe   | PUT    | /api/recipes/:id    | Update a recipe (requires admin)     |
| Delete recipe   | DELETE | /api/recipes/:id    | Delete a recipe (requires admin)     |
