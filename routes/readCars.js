import express from "express";
import Car from "../models/Cars.js"; // Import the Car model
import e from "express";

const router = express.Router(); // Create an Express Router instance

router.get("/", async (req, res) => {
  try {
    // Fetch all cars from the database
    const cars = await Car.find(); // Mongoose method "find()" returns all cars

    // If no cars are found, return a 404 status with a message
    if (cars.length === 0) {
      return res.status(404).json({ message: "No cars found" });
    }

    // Respond with the list of cars in JSON format
    res.status(200).json(cars);
  } catch (error) {
    // Handle any errors that might occur during the fetching process
    res.status(400).json({ message: error.message });
  }
});

export default router; // Export the router to be used in other parts of the application
