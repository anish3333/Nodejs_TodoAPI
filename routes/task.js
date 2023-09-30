import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { deleteTask, getMyTask, newTask, updateState } from "../controllers/task.js";


const router = express.Router();

router.post("/new", isAuth, newTask)

router.get("/my", isAuth, getMyTask)

router
    .route("/:id")
    .put(isAuth, updateState)
    .delete(isAuth, deleteTask)

export default router;
