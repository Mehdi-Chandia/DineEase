import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    // REMOVED: user field (no authentication needed)
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true, // Made required
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
        trim: true,
    },
    numberOfGuests: {
        type: Number,
        required: true,
        min: 1,
    },
    specialRequests: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
