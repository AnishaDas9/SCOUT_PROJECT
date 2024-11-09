import { User } from "../models/user.model.js";
import { Salesmanager } from "../models/salesmanager.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import wrapper from "../utils/Wrapper.js";
import { error } from "../utils/errorMiddleware.js";
import dotenv from 'dotenv'

dotenv.config();

const login = wrapper(
    async(req,res)=>{
        const {username, password, role} = req.body;

        let user;
        if(role == 'admin' || role == 'HR'){
            user = await User.findOne({username});
        }
        else if(role == 'salesmanager'){
            user = await Salesmanager.findOne({username});
        }
        else{
            throw new error("invalid role",401);
        }
        
        if(!user){
            throw new error("User doesn't exist",401);//go to catch block and then to error middleware:
        }

        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new error("Invalid Password",401);
        }

        const token = jwt.sign({id:user._id, role},process.env.JWT_SECRET);

        res.status(200)
        .cookie("user", token, {
            maxAge: 2*24*60*60*1000,//2 days
            secure: true,
            httponly:true
        })
        .json({
            message:"User loggedin successfully"
        })
    }
)


const makeadmin = wrapper(async(req,res)=>{
    const {username, password, role} = req.body; 

    const admin = new User({
        username,
        password,
        role
    })

    await admin.save();

    res.status(200).json({message:"admin created successfully",admin});

})



export {login, makeadmin};