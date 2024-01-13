const mongoose=require("mongoose");
require('dotenv').config();

const ConnectDB=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MongoDb_URL);
        console.log("db connected successfully");
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
module.exports=ConnectDB;
