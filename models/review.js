const mongoose=require("mongoose");
let {Schema}=mongoose;

let reviewSchema=new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
        
    },
    createdAt:{
        type:Date,
        default:Date.now()                     //ye kya krega hm na date pass ni krenge jb bhi review dalenge jisse ki ye exact tb ki date la dega jb reviw dala smat work
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

let Review=mongoose.model("Review",reviewSchema);

module.exports=Review;