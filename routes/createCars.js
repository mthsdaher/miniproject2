import express from "express";
import Car from "../models/Cars.js"; // Import the Car model

const router = express.Router(); // Create an Express Router instance

router.post("/", async (req, res) => {
  try {
    // Extract car data from the request body
    const { make, model, year, color, price } = req.body;

    // Validate that all required fields are provided
    if (!make || !model || !year || !color || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new car document using Mongoose
    const newCar = new Car({
      make,
      model,
      year,
      color,
      price,
    });

    // Save the new car document to the database
    const savedCar = await newCar.save();

    // Respond with the created car document and a success message
    res.status(201).json(savedCar);
  } catch (error) {
    // Handle any errors that might occur during the creation process
    res.status(500).json({ message: error.message });
  }
});

export default router; // Export the router to be used in other parts of the application
