import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";

// Import routes
import UserRoutes from './routes/user.routes.js';
import QuizRoutes from './routes/quiz.routes.js';

dotenv.config();

// connect database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Calling routes
app.use("/api/user", UserRoutes);
app.use("/api/quiz", QuizRoutes)

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//create port
const PORT = process.env.PORT || 9000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`)
);
