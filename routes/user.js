const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js")
const wrapAsync=require("../utils/wrapasync.js")
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");


// ROUTES ASYNC CALLBACKS
const usersController=require("../controllers/users.js")


router.route("/signup")
.get(usersController.renderSignupForm)
.post(wrapAsync(usersController.signup))


router.route("/login")
.get(usersController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect:"login", failureFlash: true,}) ,usersController.login)

// router.get("/signup",usersController.renderSignupForm)

// router.post("/signup",wrapAsync(usersController.signup))

// LOGIN ROUTE 

// router.get("/login",usersController.renderLoginForm)


// router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect:"login", failureFlash: true,}) ,usersController.login)

// LOGOUT ROUTE

router.get("/logout",usersController.logout)

module.exports=router;


