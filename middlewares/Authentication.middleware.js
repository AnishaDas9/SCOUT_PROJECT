import { error } from "../utils/errorMiddleware.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const authenticate_token = (req, res, next)=>{

    const token = req.cookies.user;

    if(!token){
        next(new error("Unauthorized user: login is necessary..",401));
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
    next();
}

export default authenticate_token;