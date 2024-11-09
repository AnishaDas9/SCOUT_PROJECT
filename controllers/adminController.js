import { Salesmanager } from "../models/salesmanager.model.js";
import {Labour} from '../models/labour.model.js'
import wrapper from "../utils/Wrapper.js";
import bcrypt from 'bcryptjs'


const getlocation = wrapper(async(req, res)=>{

    const {role} = req.user;
    if(role != 'admin'){
        throw new error("Only Admin can do this operation:",401);
    }

    const labours = await Labour.find().select('name location').populate('salesmanager','username');

    const location = labours.map(({salesmanager, name, location})=>{
        return {
            salesmanager: salesmanager.username,
            labour: name,
            location
        }
    })

    res.status(200)
    .json({message:"location fetched successfully", location})
})

const makesalesmanager = wrapper(async(req, res)=>{

    const {role} = req.user;
    if(role != 'admin'){
        throw new error("Only Admin and Salesmanager can do this action",401);
    }

    const {username, password, location} = req.body;

    const isexist = await Salesmanager.findOne({username});
    if(isexist){
        throw new error("Salesmanager already exist",401);
    }

    const hashpassword = await bcrypt.hash(password, 10);//hashed by 10 rounds

    const salesmanager = new Salesmanager({
        username,
        password:hashpassword,
        location
    })
    await salesmanager.save();

    res.status(200)
    .json({message:"Salesmanager has created successfully",salesmanager})
})

const deletesalesmanager = wrapper(async(req, res)=>{

    const {role} = req.user;
    if(role != 'admin'){
        throw new error("Only Admin and Salesmanager can do this action",401);
    }

    const {username} = req.query;

    const user = await Salesmanager.findOne({username});
    if(!user){
        throw new error("Salesmanager not found",401);
    }

    await Salesmanager.deleteOne({username});
    res.status(200)
    .json({message:"Salesman deleted successfully"})
})

// const addlabour = wrapper(async(req, res)=>{

// })

const deletelabour = wrapper(async(req, res)=>{

    const {role} = req.user;
    if(role == 'HR'){
        throw new error("Only Admin and Salesmanager can do this action",401);
    }

    const {labour_id} = req.query;

    const user = await Labour.findOne({_id:labour_id});
    if(!user){
        throw new error("Labour not found",401);
    }

    await Labour.deleteOne({_id:labour_id});
    res.status(200)
    .json({message:"Labour deleted successfully"})
})

const getsalesmanagers = wrapper(async(req, res)=>{

    const {role} = req.user;
    if(role != 'admin'){
        throw new error("Only Admin and Salesmanager can do this action",401);
    }

    const salesmanagers = await Salesmanager.find().select('-password');

    res.status(200).json({message:"salesmanager fetched successfully",salesmanagers})
})

const getlabours = wrapper(async(req, res)=>{

    const {role} = req.user;
    if(role == 'HR'){
        throw new error("Only Admin and Salesmanager can do this action",401);
    }

    const labours = await Labour.find();

    res.status(200).json({message:"Labours fetched successfully",labours})
})




export {getlocation, makesalesmanager, deletesalesmanager, deletelabour, getlabours, getsalesmanagers}