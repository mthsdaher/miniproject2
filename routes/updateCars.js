import express from "express"; // Import express
import Car from "../models/Cars.js"; // Import the Car model

const router = express.Router(); // Create an Express Router instance

router.put("/:car_id", async (req, res) => {
  try {
    // Extract the car ID from the request parameters
    const { car_id } = req.params;

    // Extract updated car data from the request body
    const { make, model, year, color, price } = req.body;

    // Validate that all required fields are provided
    if (!make || !model || !year || !color || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Attempt to find and update the car with the given ID
    const updatedCar = await Car.findOneAndUpdate(
      { car_id },
      { make, model, year, color, price }, // New data to update
      { new: true } // Return the updated document
    );

    // If the car is not found, respond with a 404 error and a message
    if (!updatedCar) {
      return res
        .status(404)
        .json({ message: `Car with ID ${car_id} not found` });
    }

    // If the car was successfully updated, return the updated car document:
    res.status(200).json(updatedCar);
  } catch (error) {
    // Handle any errors that might occur during the update process
    res.status(500).json({ message: error.message });
  }
});

export default router; // Export the router to be used in other parts of the application

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the car to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */
