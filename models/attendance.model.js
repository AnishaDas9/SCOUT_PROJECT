import mongoose from "mongoose";

const attendanceschema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usertype'
    },
    usertype:{
        type:String,
        enum:["labour","salesmanager"],
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    status:{
        type:String,
        enum:['present', 'absent', 'halfday'],
        required:true
    }

},{timestamps: true})

export const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", attendanceschema);