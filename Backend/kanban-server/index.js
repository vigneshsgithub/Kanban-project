import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import tasksRoutes from "./routes/task.routes.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

await mongoose.connect(process.env.MONGO_URL);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/users", userRoutes);
app.use("/payment", paymentRoutes);
app.use("/tasks", tasksRoutes);

const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});