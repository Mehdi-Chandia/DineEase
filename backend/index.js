import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db.js'
import userRoute from "./routes/user.route.js";
import reservationRoute from "./routes/reservation.route.js";
import cookieParser from 'cookie-parser';
import menuRoutes from './routes/menu.route.js';
import orderRoute from "./routes/order.route.js";
import cors from "cors";

const app = express()

dotenv.config()
dbConnection()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//routes
app.use("/api/user",userRoute)
app.use("/api",reservationRoute)
app.use('/api/menu', menuRoutes);
app.use("/api",orderRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
