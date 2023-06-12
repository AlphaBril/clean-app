import express from "express";
import userRoutes from "./modules/user/user";
import authRoutes from "./modules/auth/auth";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.static("public"));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "1mb" }));
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

export default app;
