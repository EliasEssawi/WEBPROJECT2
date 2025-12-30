/**
 * Project: Exclusive Drop API
 * Developer: Ilya ZeldnerBahaaElias
 */

import express, { Request, Response, NextFunction } from "express";
import mongoose, { Document, Schema } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { register, login } from "./controllers/authController";

dotenv.config();
const app = express();

// MIDDLEWARE
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Cache-Control", "no-store");
  next();
});

// DATABASE
const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  console.error("❌ CRITICAL: MONGO_URI is missing from .env!");
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ DB STATUS: Connected Successfully"))
    .catch((err: Error) =>
      console.error("❌ DB CONNECTION ERROR:", err.message)
    );
}

// RATE LIMITER (POST ONLY)
const buyActionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many attempts. Please wait 1 minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post("/api/register", buyActionLimiter, register);
app.post("/api/login", buyActionLimiter, login)

// Listen on 127.0.0.1 to perfectly match Vite's proxy target
const PORT = 5000;
app.listen(PORT, "127.0.0.1", () => {
  console.log('🚀 BACKEND ACTIVE: http://127.0.0.1:${PORT} ');
});
//ELias Commit added