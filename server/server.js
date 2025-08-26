{
  /*Just initialize the file by running npm init -y */
}
import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// Initialize express
const app = express();
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controller/webhook.js";
import { clerkMiddleware } from "@clerk/express";

// Connect to DB
await connectDB();
await connectCloudinary();

// Middlewares
app.use(cors({
  origin: [
    "https://job-hive-client.vercel.app", // your deployed frontend
    "http://localhost:5173"               // local dev, optional
  ],
  credentials: true, // if you use cookies or auth headers
}));

app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get("/", function rootHandler(req, res) {
  res.send("API Working");
});

{
  /* These are the Endpoints of the website */
}
app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Sentry error handler
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
