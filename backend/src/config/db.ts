import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        dialect: "mysql",
        logging: console.log,

        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

export const connectDB = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("✅ MySQL connected successfully");

        // ⚠️ Only for development
        if (process.env.NODE_ENV !== "production") {
            await sequelize.sync({ alter: true });
            console.log("🔄 Models synced");
        }
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        throw error;
    }
};