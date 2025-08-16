{
  /*Just initialize the file by running npm init -y */
}
import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";


// Initialize express
const app = express();
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controller/webhook.js";

// Connect to DB
await connectDB(); 

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", function rootHandler(req, res) {
  res.send("API Working");
});

app.post('/webhooks',clerkWebhooks)



// Port
const PORT = process.env.PORT || 5000;

// Sentry error handler
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


