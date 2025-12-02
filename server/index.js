import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "https://previsa-mn-frontend.vercel.app", // Vercel frontend URL
  methods: ["GET","POST","PUT","DELETE"]
}));

app.use(express.json());

// API маршрутууд
// app.use("/api/auth", authRoutes);
// app.use("/api/payments", paymentRoutes);

app.listen(3001, () => console.log("Server running on port 3001"));