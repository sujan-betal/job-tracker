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
        logging: false,
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("Database Connected successfully to MySQL!");
    } catch (error) {
        console.error("Database connection failed:", error);
        // Let's not call process.exit(1) so the dev server doesn't crash repeatedly during setup if DB isn't running yet
    }
};