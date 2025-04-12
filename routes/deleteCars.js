import express from 'express';
import Car from '../models/Cars.js'; // Import the Car model

const router = express.Router(); // Create an Express Router instance

router.delete('/:car_id', async (req, res) => {
    try{
        // Extract the car ID from the request parameters
        const { car_id } = req.params;

        // Attempt to find and delete the car with the given ID
        const deletedCar = await Car.findOneAndDelete({ car_id });

        // If the car is not found, respond with a 404 error and a message
        if (!deletedCar) {
            return res.status(404).json({ message: `Car with ID ${car_id} not found` });
        }

        // If the car was successfully deleted, return a success message:
        res.status(200).json({ message: `Car with ID ${car_id} deleted successfully` });
    } catch (error) {
        // Handle any errors that might occur during the deletion process
        res.status(500).json({ message: error.message });
    }
});

export default router; // Export the router to be used in other parts of the application

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */
