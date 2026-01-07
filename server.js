import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import "./cron/videoCron.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
