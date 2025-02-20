import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { swaggerUi, specs } from './swagger.js';

// After setting up your API routes...



dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use(errorHandler); // Enable JSON parsing
export default app;
