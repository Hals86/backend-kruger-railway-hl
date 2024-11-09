//cada uno de estos servicios se usa en postman parra realizar el proceso correspondiente, ej ({{host}}/auth/login || {{host}}/auth/register
import express from "express";
import { register, login, forgotPassword, resetPassword } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/register", register);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword)

export default router;