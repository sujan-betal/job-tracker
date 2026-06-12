// src/models/document.model.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Document = sequelize.define(
    "Document",
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
        applicationId: {
            type: DataTypes.INTEGER,
            allowNull: true,         // optional — kis application se linked hai
            field: "application_id",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,        // e.g. "Resume_Backend_v2.pdf"
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,        // resume, cover_letter, transcript
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,        // Cloudinary URL
        },
        publicId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "public_id",      // Cloudinary public_id (delete ke liye)
        },
        format: {
            type: DataTypes.STRING,  // pdf, png, jpg
            allowNull: true,
        },
    },
    {
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        freezeTableName: true,
        tableName: "documents",
    }
);

export default Document;