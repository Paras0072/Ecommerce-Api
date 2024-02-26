 ECommerce API developed using Node.js, Express, Sequelize, and PostgreSQL. 
# E-Commerce API

Welcome to the E-Commerce API! This API is designed to provide the backend functionality for an e-commerce platform, allowing users to manage products, categories, carts, and orders.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Authentication](#authentication)
- [Models](#models)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites
Make sure you have the following installed before running the API:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation
1. Clone the repository:
   git clone https://github.com/your-username/e-commerce-api.git
Install dependencies:

npm install

### Configuration
Configure your PostgreSQL database settings in config/config.js.

### Usage
##  Endpoints
The API provides the following endpoints:

# Products

GET /products/:categoryId  : Get a list of all products of specific category.

GET /products/:productId   : Get details of a specific product.

# Categories

GET /categories: Get a list of all categories.

# Cart

POST    /cart/:userId/:productId                 : For adding product into cart

Get     /cart/viewcart/:userId                   : For viewing the cart

Patch   /cart/updatequantity/:userId/:productId  : For updating the cart

Delete  /cart/removefromcart/:userId/:productId' : For removing from cart
 

# Order

POST   /:userId"                   : For placing the order

GET    /orderhistory/:userId"      : For getting Order history

GET    /orderdetails/:orderId"     : For getting Order Details



## Authentication
Authentication is required for certain endpoints. Use your preferred authentication method (JWT, OAuth, etc.) and secure sensitive endpoints.

### Models
The API uses the following Sequelize models:

User
Category
Product
Cart
Order
OrderProducts
Ensure to check the models and associations for database structure details.

### Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

### License
This project is licensed under the MIT License.
This README provides a starting point for users and contributors to understand the project 
