import Reservation from "../models/reservation.model.js";

export const reservation = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            date,
            time,
            numberOfGuests,
            specialRequests,
        } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !date || !time || !numberOfGuests) {
            return res.status(400).json({
                message: 'All fields are required: name, email, phone, date, time, number of guests'
            });
        }

        // Check for existing reservation at same date/time
        const existing = await Reservation.findOne({
            email: email,
            date: date,
            time: time,
            status: { $ne: 'cancelled' }, // ignore cancelled reservations
        });

        if (existing) {
            return res.status(400).json({
                message: 'You already have a reservation at this date and time.'
            });
        }

        // Create new reservation
        const newReservation = new Reservation({
            name,
            email,
            phone,
            date,
            time,
            numberOfGuests,
            specialRequests: specialRequests || '',
            status: "pending",

        });

        await newReservation.save();

        res.status(201).json({
            message: 'Reservation created successfully',
            reservation: newReservation,
        });

    } catch (error) {
        console.log('Reservation error:', error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}