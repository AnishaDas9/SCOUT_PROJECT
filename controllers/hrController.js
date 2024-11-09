import { Salesmanager } from "../models/salesmanager.model.js";
import { Labour } from "../models/labour.model.js";
import { Attendance } from "../models/attendance.model.js";
import { Salary } from "../models/salary.model.js";
import wrapper from "../utils/Wrapper.js";
import { error } from "../utils/errorMiddleware.js";


const salesmanagerattendance = wrapper(async(req, res)=>{
    const {role, id} = req.user;
    if(role != 'HR'){
        throw new error("Only HR can do this action",401);
    }

    const {userid, year, month} = req.query;
    if(!userid || !year || !month){
        throw new error("Please provide complete details:")
    }
    const currentyear = new Date().getFullYear();//give current year
    if(year > currentyear){
        throw new error("Give a valid year",401);
    }
    //year validation also: todo
    if(month<1 || month>12){
        throw new error("Please provide a valid month",401);
    }
    const user = await Salesmanager.findOne({_id:userid});
    if(!user){
        throw new error("This is not a valid salesmanager",401);
    }

    const firstdateofmonth = new Date(year, month-1, 1);//javascript take month as 0-indexed:
    const lastdateofmonth = new Date(year, month, 0);//0th date of next month is last date of previous month:

    const attendances = await Attendance.find({
        userid,
        date:{$gte:firstdateofmonth, $lte:lastdateofmonth}
    }).sort({date:1}).select('date status');

    let totalday = 0;
    const attendance = attendances.map(({date, status})=>{
            switch (status){
                case 'present':
                    totalday += 1;
                    break;
                case 'halfday':
                    totalday += 0.5;
                    break;
                default:
                    break;
            }

            return {
                date,
                status
            }
    })

    res.status(200).json({message:"Salesmanager Attendance fetched successfully",attendance,totalday});

})


const makesmattendance = wrapper(async(req, res)=>{
    
    const {role, id} = req.user;
    if(role != 'HR'){
        throw new error("Only HR can do this action",401);
    }

    const {date, userid, status} = req.body;
    if(!date || !userid || !status){
        throw new error("Please provide complete information:",401);
    }

    const sm = await Salesmanager.findOne({_id: userid});
    if(!sm){
        throw new error("This is not a valid salesmanager",401);
    }

    const attendance = new Attendance({
        userid,
        usertype:'salesmanager',
        date,
        status
    })

    await attendance.save();
    res.status(200).json({message:"Attendance saved", attendance});
})

const makelabourattendance = wrapper(async(req, res)=>{

    const {role, id} = req.user;
    if(role != 'HR'){
        throw new error("Only HR can do this action",401);
    }

    const {date, userid, status} = req.body;
    if(!date || !userid || !status){
        throw new error("Please provide complete information:",401);
    }

    const labour = await Labour.findOne({_id: userid});
    if(!labour){
        throw new error("This is not a valid Labour",401);
    }

    const attendance = new Attendance({
        userid,
        usertype:'labour',
        date,
        status
    })

    await attendance.save();
    res.status(200).json({message:"Attendance saved", attendance});
})


const salesmanagersalary = wrapper(async(req, res)=>{

    const {role, id} = req.user;
    if(role != 'HR'){
        throw new error("Only HR can do this action",401);
    }

    const {salaryperday, userid, year, month} = req.query;

    if(!userid || !salaryperday || !year || !month){
        throw new error("Please provide complete details:")
    }
    const currentyear = new Date().getFullYear();//give current year
    if(year > currentyear){
        throw new error("Give a valid year",401);
    }
    if(salaryperday<1){
        throw new error("salary should be positive only",401);
    }
    if(month<1 || month>12){
        throw new error("Please provide a valid month",401);
    }
    const user = await Salesmanager.findOne({_id:userid});
    if(!user){
        throw new error("This is not a valid salesmanager",401);
    }

    const firstdateofmonth = new Date(year, month-1, 1);//javascript take month as 0-indexed: so if we want 11 then we have to pass 10
    const lastdateofmonth = new Date(year, month, 0);//0th date of next month is last date of previous month:

    const attendances = await Attendance.find({
        userid,
        date:{$gte:firstdateofmonth, $lte:lastdateofmonth}
    }).sort({date:1}).select('status');

    let totalday = 0;
    attendances.forEach(({status})=>{
            switch (status){
                case 'present':
                    totalday += 1;
                    break;
                case 'halfday':
                    totalday += 0.5;
                    break;
                default:
                    break;
            }
    })

    const totalsalary = (totalday * salaryperday);
    const salarymonth = new Date(year, month);
    const salary = new Salary({
        userid,
        usertype:'salesmanager',
        amount:totalsalary,
        month:salarymonth
    })

    await salary.save();
    res.status(200).json({message:"Salesmanager salary fetched successfully",salary});

})


const labourattendance = wrapper(async(req, res)=>{

    const {role, id} = req.user;
    if(role != 'HR'){
        throw new error("Only HR can do this action",401);
    }

    const {userid, year, month} = req.query;
    if(!userid || !year || !month){
        throw new error("Please provide complete details:")
    }
    const currentyear = new Date().getFullYear();//give current year
    if(year > currentyear){
        throw new error("Give a valid year",401);
    }
    //year validation also: todo
    if(month<1 || month>12){
        throw new error("Please provide a valid month",401);
    }
    const user = await Labour.findOne({_id:userid});
    if(!user){
        throw new error("This is not a valid Labour",401);
    }

    const firstdateofmonth = new Date(year, month-1, 1);//javascript take month as 0-indexed:
    const lastdateofmonth = new Date(year, month, 0);//0th date of next month is last date of previous month:

    const attendances = await Attendance.find({
        userid,
        date:{$gte:firstdateofmonth, $lte:lastdateofmonth}
    }).sort({date:1}).select('date status');

    let totalday = 0;
    const attendance = attendances.map(({date, status})=>{
            switch (status){
                case 'present':
                    totalday += 1;
                    break;
                case 'halfday':
                    totalday += 0.5;
                    break;
                default:
                    break;
            }

            return {
                date,
                status
            }
    })

    res.status(200).json({message:"Labour Attendance fetched successfully",attendance,totalday});

})
const laboursalary = wrapper(async(req, res)=>{

    const {role, id} = req.user;
    if(role != 'HR'){
        throw new error("Only HR can do this action",401);
    }

    const {salaryperday, userid, year, month} = req.query;
    if(!userid || !salaryperday || !year || !month){
        throw new error("Please provide complete details:")
    }
    const currentyear = new Date().getFullYear();//give current year
    if(year > currentyear){
        throw new error("Give a valid year",401);
    }
    if(salaryperday<1){
        throw new error("salary should be positive only",401);
    }
    if(month<1 || month>12){
        throw new error("Please provide a valid month",401);
    }
    const user = await Labour.findOne({_id:userid});
    if(!user){
        throw new error("This is not a valid Labour",401);
    }

    const firstdateofmonth = new Date(year, month-1, 1);//javascript take month as 0-indexed:
    const lastdateofmonth = new Date(year, month, 0);//0th date of next month is last date of previous month:

    const attendances = await Attendance.find({
        userid,
        date:{$gte:firstdateofmonth, $lte:lastdateofmonth}
    }).sort({date:1}).select('status');

    let totalday = 0;
    attendances.forEach(({status})=>{
            switch (status){
                case 'present':
                    totalday += 1;
                    break;
                case 'halfday':
                    totalday += 0.5;
                    break;
                default:
                    break;
            }
    })

    const totalsalary = (totalday * salaryperday);
    const salarymonth = new Date(year, month);
    const salary = new Salary({
        userid,
        usertype:'labour',
        amount:totalsalary,
        month:salarymonth
    })

    await salary.save();

    res.status(200).json({message:"Labour salary fetched successfully",salary});

})


const getlabours = wrapper(async(req, res)=>{

    const {role, id} = req.user;
    if(role != 'HR'){
        throw new error("Only HR can do this action",401);
    }

    const labours = await Labour.find().populate('salesmanager','username');

    res.status(200).json({message:"All labour fetched successfully",labours});

})
const getsalesmanagers = wrapper(async(req, res)=>{

    const {role, id} = req.user;
    if(role != 'HR'){
        throw new error("Only HR can do this action",401);
    }

    const salesmanager = await Salesmanager.find();

    res.status(200).json({message:"All Salesmanger fetched successfully",salesmanager});

})

export {salesmanagerattendance, salesmanagersalary, labourattendance, laboursalary, getlabours, getsalesmanagers, makelabourattendance, makesmattendance}
