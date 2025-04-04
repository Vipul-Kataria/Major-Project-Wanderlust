const express=require("express");
const router=express.Router({mergeParams:true});
// requiring utils files
const wrapAsync=require("../utils/wrapasync.js")
const ExpressError=require("../utils/expresserror.js")
const {listingSchema,reviewSchema}=require("../schema.js")
const Review=require("../models/review.js")
const Joi = require('joi');

const Listing=require("../models/listing.js");


const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js")


// SARE ROUTES KE ANDR KA ASYNC WALA SAMAN
const reviewController=require("../controllers/review.js")
//REVIEWS
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))




//DELETE REVIEW
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))


module.exports=router;