import { Router } from "express";
import { forgetpassword ,forgetseted,changepassword} from "../controllers/forget.controllers.js";

const router = Router();
router.post("/forgetpassword",forgetpassword);
router.post("/forgetpasswordseted",forgetseted);
router.post("/changepassword",changepassword);



export default router;
