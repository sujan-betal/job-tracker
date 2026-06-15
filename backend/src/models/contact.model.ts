import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Contact = sequelize.define(
    "Contact",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id",
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "name",
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "role",
        },
        company: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "company",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true,
            },
            field: "email",
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "phone",
        },
        linkedIn: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "linkedin",
        },
    },
    {
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        freezeTableName: true,
        tableName: "contacts",
    }
);

export default Contact;
