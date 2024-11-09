import express from "express";
import { saveUser, getAllUsers, sendWelcomeEmail, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/all-users", getAllUsers);

router.post("/", saveUser);

router.post("/send-email", sendWelcomeEmail);
//trabajamos ruta para borrado logico oct 25 2024
router.delete("/:ID", deleteUser)

export default router;