
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        console.log("Protect Middleware - Token from cookies:", token);

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};
