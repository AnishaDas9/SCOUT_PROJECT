import mongoose from "mongoose";

const salaryschema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usertype'
    },
    usertype:{
        type:String,
        enum:["labour","salesmanager"],
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    month:{
        type: Date,
        required: true
    }
},{timestamps: true})

export const Salary = mongoose.models.Salary || mongoose.model("Salary", salaryschema);