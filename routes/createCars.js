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

    // Create a new car document using MongooseF
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

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - make
 *               - model
 *               - year
 *               - color
 *               - price
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               color:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Car created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
