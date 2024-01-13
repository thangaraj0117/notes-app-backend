const mongoose=require("mongoose");

const noteSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User",
    },
    title:{
        type:String,
        require:[true,"please add a title"]
    },
    desc:{
        type:String,
        require:false,

    },
    text:{
        type:String,
        require:[true,"pls add a text"]
    },
},{
    timeStamps:true,
});

module.exports=mongoose.model("Note",noteSchema);