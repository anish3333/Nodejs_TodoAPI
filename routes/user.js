import express from "express";
import { register, login, getMyProfile, logout } from "../controllers/user.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();


router.get("/me", isAuth, getMyProfile);

router.get("/logout", logout);


router.post("/new", register);

router.post("/login", login);


export default router;