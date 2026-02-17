import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    image: String, // optional, for card image
});

export default mongoose.model('Menu', menuSchema);
