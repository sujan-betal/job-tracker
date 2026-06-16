import express from "express";
import { 
    register, 
    login, 
    addApplication, 
    getProfile, 
    getAllApplications, 
    getDashboardStats, 
    getRecentApplications, 
    updateApplication, 
    deleteApplication ,
    uploadDocument,
    getDocuments,
    uploadProfileImage,
    getContacts,
    addContact,
    deleteContact,
    updateContact,
} from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validations/auth.validation.js";
import customErrorHandler from "../utils/customErrorHandler.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createApplicationValidation, updateApplicationValidation } from "../validations/auth.validation.js";
import { upload } from "../middlewares/upload.middleware.js";



const router = express.Router();

console.log("✅ Auth routes file loaded!");

// User Routes (Full path: /api/user/...)
router.post("/register", registerValidation, customErrorHandler, register);
router.post("/login", loginValidation, customErrorHandler, login);
router.get("/profile", authenticate, getProfile);
router.post("/profile/image", authenticate, upload.single("image"), uploadProfileImage);

// Application Routes (Full path: /api/applications/...)
router.get("/applications", authenticate, getAllApplications);
router.get("/applications/stats", authenticate, getDashboardStats);
router.get("/applications/recent", authenticate, getRecentApplications);
router.post("/applications/add", authenticate, createApplicationValidation, customErrorHandler, addApplication);
router.put("/applications/:id", authenticate, updateApplicationValidation, customErrorHandler, updateApplication);
router.delete("/applications/:id", authenticate, deleteApplication);

// Legacy support for the specific frontend constant ADD_APP_ALT
router.post("/add", authenticate, createApplicationValidation, customErrorHandler, addApplication); 

router.post(
    "/document/upload", 
    authenticate,           
    upload.single("file"),  
    uploadDocument          
);

router.get(
    "/documents",
    authenticate,
    getDocuments
);

// Contact Routes
router.get("/contacts", authenticate, getContacts);
router.post("/contacts", authenticate, addContact);
router.put("/contacts/:id", authenticate, updateContact);
router.delete("/contacts/:id", authenticate, deleteContact);

export default router;
