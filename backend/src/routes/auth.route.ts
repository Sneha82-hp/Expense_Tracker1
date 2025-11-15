import express from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { loginController, registerController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";

const authRoutes = express.Router();

// ✅ Apply validation middleware
authRoutes.post("/register", validate(registerSchema), registerController);
authRoutes.post("/login", validate(loginSchema), loginController);

export default authRoutes;
