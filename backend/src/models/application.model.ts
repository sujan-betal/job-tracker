import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Application = sequelize.define(
    "Application",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "applied",
        },
        appliedDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: "applied_date",
        },
        jobUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "job_url",
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        freezeTableName: true,
        tableName: "applications",
    }
);

export default Application;