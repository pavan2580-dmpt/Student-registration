const mongoose = require("mongoose")

const StudentInfo = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    registerNo:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    motherName:{
        type:String,
        required:true
    },

})


module.exports = mongoose.model("StudentInfo",StudentInfo);