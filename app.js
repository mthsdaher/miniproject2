// Using Express for handling HTTP requests.
import express from 'express';

// Using Mongoose to interact with MongoDB.
import mongoose from 'mongoose';

// Using "dotenv" package for loading the environment variable from the .env file
// this variable contains the MongoDB connection URI
import dotenv from 'dotenv';

// Using "swagger-ui-express" for serving Swagger UI documentation
import { swaggerSpec, swaggerUi } from './swagger.js';
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const port = process.env.PORT; // Port for the server to listen on
app.listen(port, () => {
    console.log(`Application URL: http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Server loading error:', err);
    process.exit(1); // Exit with code "1" for errors for any issue
});