const express=require("express");
const router=express.Router();
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage})

//wrap async validatelisting review model
const wrapAsync=require("../utils/wrapasync.js")
const ExpressError=require("../utils/expresserror.js")
const {listingSchema,reviewSchema}=require("../schema.js")

// datass
const Listing=require("../models/listing.js");
const Joi = require('joi');

//LOGIN CHECKING MIDDLEWARE
const {isLoggedIn,isOwner,validatelisting}=require("../middleware.js");


//BRING ROUTES INNER CALLBACKS
const listingController=require("../controllers/listing.js")



//Create
router.get("/new",isLoggedIn,(listingController.renderNewForm)) 

router.route("/")
.get(wrapAsync(listingController.index))
// .post( upload.single("listing[image]"),(req,res)=>{res.send(req.file)})
.post(isLoggedIn,upload.single("listing[image]"),validatelisting,wrapAsync(listingController.createNewListing))


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))



// INDEX
// router.get("/",wrapAsync(listingController.index))



// SHOW
// router.get("/:id",wrapAsync(listingController.showListing))

// Creating NEW 
// router.post("/",isLoggedIn,validatelisting,wrapAsync(listingController.createNewListing))


// EDIT AND UPDATE
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))


// router.put("/:id",isLoggedIn,isOwner,wrapAsync(listingController.updateListing))


// DELETE 

// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))

module.exports=router;