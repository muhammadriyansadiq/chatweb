import { Router } from "express";
import { handletodo,handletododel,handletodoget, handletodoput } from "../controllers/todo.controllers.js";
const router = Router();



router.post("/userdashboard",handletodo);
router.get("/userdashboard",handletodoget);
router.put("/userdashboard/:id",handletodoput);
router.delete("/userdashboard/:id",handletododel);


export default router;
