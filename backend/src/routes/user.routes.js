import { Router } from "express";
import { handleregister } from "../controllers/user.controllers.js";
import upload from "../middlewares/uploadimg.middleware.js";
import { handlelogin } from "../controllers/user.controllers.js";
const router = Router();

// router.route("/register",upload.single("photo")).post(handleregister);
router.post("/register",upload.single("photo"),handleregister);

router.post("/login",handlelogin);



export default router;
