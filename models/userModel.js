const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        min:8,
    },
},{
    timeStamps:true,
})
module.exports=mongoose.model("User",userSchema);