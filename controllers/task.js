import { Task } from "../models/tasks.js"
import ErrorHandler from "../middlewares/error.js";

export const newTask = async (req, res, next)=>{
    try {
        const {title , description} = req.body
    
        await Task.create({
            title,
            description,
            user: req.user,
        })
    
        res.status(201).json({
            success: true,
            message: "task created successfully",
        })
    } catch (error) {
        next(error);
    }
};

export const getMyTask = async(req, res, next) => {
    try {
        const userid = req.user._id // comes from isAuth

        const tasks = await Task.find({user: userid})
    
        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error);
    }

};


export const updateState = async(req, res, next) => {

try {
    const task = await Task.findById(req.params.id);

    if(!task) return next(new ErrorHandler("Task Does not Exist", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
        success: true,
        message: "Updated Successfully"
    })
} catch (error) {
    next(error);
}

};


export const deleteTask = async(req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);

        if(!task) return next(new ErrorHandler("Task Does not Exist", 404));
    
        await task.deleteOne();
    
        res.status(200).json({
            success: true,
            message: "Deletion Successful"
        })
    } catch (error) {
        next(error);
    }

};