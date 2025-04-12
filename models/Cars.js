// Import mongoose to define the schema and model
import mongoose from 'mongoose';

const carsSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1886,
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
});

// Create the Model (with the standard collection name behavior => cars):
const Cars = mongoose.model('Cars', carsSchema);

export default Cars;