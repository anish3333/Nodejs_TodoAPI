import { User } from "../models/user.js";
import { sendCookie } from "../utils/features.js";
import bcrypt from 'bcrypt';
import ErrorHandler from "../middlewares/error.js";


export const register = async(req, res, next)=>{
    try {
        const {name, email, password} = req.body;

        let user = await User.findOne({email});

        if(user) return next(new ErrorHandler("User already exists", 404));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({name, email, password: hashedPassword});

        sendCookie(user, res,  201, "Registered Successfully");
    } catch (error) {
        next(error);
    }
    
};


export const login = async(req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user) return next(new ErrorHandler("Incorrect Email", 404));

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return next(new ErrorHandler("Incorrect Password", 404));

        sendCookie(user, res,  200, `Welcome back, ${user.name}`);
    } catch (error) {
        next(error);
    }
    

};

export const logout = (req, res, next)=>{
    res.status(200).cookie("token", "", {

        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
        success: true,
        message: "Logged out"
    })
};


export const getMyProfile = (req, res)=>{
    res.status(200).json({
        success: true,
        user: req.user
    })
};