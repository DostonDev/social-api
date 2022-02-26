const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    descr:{
        type: String,
        max:200
    }
},
{timestamps:true}
)

module.exports = mongoose.model("User",userSchema)