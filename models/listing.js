const mongoose=require("mongoose");
let {Schema}=mongoose;
const Review=require("./review.js")



const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String,
        },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});


//Mongoose middleware  ki agr listing udd jae puri to uske review bhi uss jae pure jo bhi uss listing ke the
listingSchema. post("findOneAndDelete", async (listing)=>{
    if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } }) ;
    }})

const Listing=mongoose.model("Listing",listingSchema)
module.exports=Listing;
