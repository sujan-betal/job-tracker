import User from "../models/user.model.js";

declare global {
    namespace Express {
        interface Request {
            user: any; // Using any temporarily to avoid circular or strict typing issues with Sequelize instance
        }
    }
}