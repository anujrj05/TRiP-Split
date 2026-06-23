import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRoute from "./route/user.route.js";
import createtripRoute from "./route/trip.route.js";
import transactionroute from "./route/transaction.route.js";
import { connectDB, isMongoConfigured } from "./db/connect.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

app.get("/health", async (req, res) => {
  let databaseConnected = false;
  let databaseError = null;

  if (isMongoConfigured()) {
    try {
      await connectDB();
      databaseConnected = true;
    } catch (error) {
      databaseError = error.message;
    }
  } else {
    databaseError = "MongoDBURI environment variable is not set";
  }

  res.status(200).json({
    status: "ok",
    message: "Backend is running",
    mongoUriConfigured: isMongoConfigured(),
    databaseConnected,
    databaseError,
    timestamp: new Date().toISOString(),
  });
});

const withDB = (router) => async (req, res, next) => {
  try {
    await connectDB();
    router(req, res, next);
  } catch (error) {
    console.error("Database connection error:", error.message);
    res.status(503).json({
      message:
        "Backend is running but database is unavailable. Check MongoDBURI and Atlas network access.",
      detail: error.message,
    });
  }
};

app.use("/user", withDB(userRoute));
app.use("/trip", withDB(createtripRoute));
app.use("/transaction", withDB(transactionroute));

export default app;
