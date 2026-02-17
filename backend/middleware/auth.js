import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const optionalAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("Token from cookies:", token);

        if (!token) {
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded);

        const user = await User.findById(decoded.userId).select('-password');
        console.log("User found:", user);

        if (user) {
            req.user = user; // Attach user info to request
        }
    } catch (error) {
        console.log("Auth middleware error:", error.message);
    }
    next();
};
