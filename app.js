import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();

dotenv.config({
    path: "./data/config.env"
});

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, 
    })
);

//using routes
app.use("/users", userRouter);
app.use("/task", taskRouter);


app.get("/", (req, res)=>{
    res.send("Works!");
})


// Using Error Middleware
app.use(errorMiddleware);

