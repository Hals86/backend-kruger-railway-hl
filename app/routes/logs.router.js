import express from "express";
import { testsLogs } from "../controllers/logs.controller.js";


const router = express.Router();

router.get("/", testsLogs);


export default router;