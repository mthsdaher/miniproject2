🚗 Car Management API

A RESTful API built with Node.js, Express, and MongoDB (Atlas) to manage a car inventory system.
The project follows a clean architecture and includes Swagger documentation for easy testing of CRUD operations.
📦 Technologies Used

    Node.js – Runtime environment

    Express – Web framework for Node.js

    MongoDB Atlas – Cloud-hosted NoSQL database

    Mongoose – ODM to interact with MongoDB

    Swagger UI Express – Interactive API documentation

    dotenv – Manages environment variables securely

🛠 Setup Instructions

    Clone the repository using GitHub.

    Install the required dependencies using npm.

    Create a .env file in the root directory and add the following variables:

        MONGO_URI = your MongoDB Atlas connection string

        PORT = 3000

    Start the server and access the API via your browser or Swagger interface.

The API will be running locally at: http://localhost:3000
📚 API Documentation

After starting the project, access the Swagger UI at:
http://localhost:3000/api-docs

There, all available endpoints can be tested directly from the browser interface.
Available Routes

    POST /api/cars – Create a new car

    GET /api/cars – Retrieve all cars

    PUT /api/cars/:id – Update a car by ID

    DELETE /api/cars/:id – Delete a car by ID

📁 Project Structure

    /routes

        createCars.js

        readCars.js

        updateCars.js

        deleteCars.js

    /models

        Cars.js

    app.js

    swagger.js

    .env

    README.md

✅ Features

    Full CRUD functionality

    MongoDB Atlas integration

    Modular and organized file structure

    Swagger UI for interactive API documentation and testing

    Proper validation and error handling for robust functionality

👨‍💻 Author

Developed as an academic project by a team focused on clean code, best practices, and backend fundamentals: Matheus, Vitor, and Thaian.
