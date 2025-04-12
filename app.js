// Using Express for handling HTTP requests.
import express from 'express';

// Using Mongoose to interact with MongoDB.
import mongoose from 'mongoose';

// Using "dotenv" package for loading the environment variable from the .env file
// this variable contains the MongoDB connection URI
import dotenv from 'dotenv';

import createCarsRoute from './routes/createCars.js';
import readCarsRoute from './routes/readCars.js';
import updateCarsRoute from './routes/updateCars.js';
import deleteCarsRoute from './routes/deleteCars.js';

dotenv.config(); // Load environment variables from .env file
const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON request bodies
const mongoURI = process.env.MONGO_URI; // MongoDB connection URI from environment variables

/* 
If MONGO_URI is not defined, log an error and stop the process.
It is a basic needed check to ensure our app doesn't run without a database connection string.
*/
if (!mongoURI) {
    console.error('MONGO_URI is not defined in environment variables!');
    // Exit the process with a non-zero status code (failure)
    // If the MongoDB connection fails, stop the app with an error code (1)
    // This indicates the process ended with a failure, not a normal exit.
    process.exit(1);
}

// Connect to MongoDB using Mongoose
async function connectToMongoDB() {
    try {
        // Connect to MongoDB using the connection URI
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas successfully!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        // Exit the process with a non-zero status code (failure)
        process.exit(1);
    }
}
// Call the function to onnect to MongoDB
connectToMongoDB();

app.use('/api/cars', createCarsRoute); // Route for creating cars
app.use('/api/cars', readCarsRoute); // Route for reading cars
app.use('/api/cars', updateCarsRoute); // Route for updating cars
app.use('/api/cars', deleteCarsRoute); // Route for deleting cars

app.get('/', (req, res) => {
    res.send('Welcome to the Car Management API!');
});

// Health Check with Status (More detailed response with status and timestamp):
/* 
- More advanced version of the health check includes:
    > an explicit HTTP status (200 for OK) 
    > a status and timestamp.
This can be helpful for monitoring and debugging, especially in production environments
*/
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Healthy', timestamp: new Date() });
});

/*
- Health Check with Status (More detailed response with status and timestamp):
Link: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
*/
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Healthy', timestamp: new Date() });
});

// Define the port (use the one from the environment or default to 3000)
const port = process.env.PORT || 3000;

// Start the Express server: Simple Version or Advanced Version

// Simple Version:
/* 
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
}); 
*/

// Or adding the full structure with error handling:
app.listen(port, () => {
    console.log(`Application URL: http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Server loading error:', err);
    process.exit(1); // Exit with code "1" for errors for any issue
});