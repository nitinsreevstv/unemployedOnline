import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

dotenv.config();

const app = express();

// middleware 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

// Log environment variables for debugging
console.log('PORT:', process.env.PORT);
console.log('MongoDB URI:', process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    });
});
