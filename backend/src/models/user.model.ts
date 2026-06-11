import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "name",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
            validate: {
                isEmail: true,
            },
            field: "email",
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "password",
        },
    },
    {
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        freezeTableName: true,
        tableName: "users",
    }
);

export default User;
