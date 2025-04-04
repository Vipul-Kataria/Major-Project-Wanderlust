const Listing=require("../models/listing.js");
const Review=require("../models/review.js")



module.exports.createReview=async (req,res)=>{
    
    let {id}=req.params;
    let listing=await Listing.findById(id);                                                              //pehle nikalo listing jisme review stor hona chaiye
    let newReview=new Review(req.body.review);                                                           //yani jo hmne form mein bhara vo access kra and use review model mein ghuseda
    newReview.author=req.user._id;

    listing.reviews.push(newReview) ;                                                                         //yha hmne jo listing nikali thi id vo review model ke sath reviews wale array mein dal di

    await newReview.save();
    await listing.save();                                                                                   //existing chiz mein agr aap kuch nya store krao toh call krna pdta hai save ko us ciz ke lie

    console.log("new review is saved")
    req.flash("success","Review Successfully Posted")
    res.redirect(`/listings/${listing.id}`)
}


module.exports.deleteReview=async (req,res,next)=>{
    
    let{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId }});                                           //hme krna hai ki listing jisme review dla hua hai uski jo array hai reviews naam ki usme se reviewId wala review delete ho jae for ths we use mongo pull  ...toh isme pehle id pass ki taki vo uss listing mein phunche jiske reviews wale array mein jhankna haithen pull kiya
    await Review.findByIdAndDelete(reviewId) ;                                                                    //hence Review model se id use nrke accees kr lia vo review jo del krna hai 
    console.log("deleted")
    req.flash("success","Review Successfully Deleted")
    res.redirect(`/listings/${id}`)
   
}