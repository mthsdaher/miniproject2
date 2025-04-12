import express from 'express';
import Car from '../models/Cars.js';

const router = express.Router();

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { make, model, year, color, price } = req.body;

    if (!make || !model || !year || !color || !price) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { make, model, year, color, price },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: `Car with ID ${id} not found` });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

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