import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { sequelize } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully");
    console.log("✅ Database connected");

    await sequelize.sync({ alter: false });
    console.log("🔄 Models synced");
    console.log("✅ Models synced");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server start error:", error);
    process.exit(1);
  }
};

startServer();