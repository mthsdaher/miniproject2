import express from 'express';
import Car from '../models/Cars.js'; // Ajuste o caminho se necessário

const router = express.Router();

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ message: `Car with ID ${id} not found` });
    }

    res.status(200).json({ message: `Car with ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

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
 *         description: MongoDB ObjectID of the car to delete
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */
