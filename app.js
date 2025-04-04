if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const dbUrl=process.env.ATLASDB_URL;
// CREATING REQUIRE REQUESTS
// express
const express=require ("express");
const app=express();
const port=8080;

//EXPRESS SESSION FOR STATEFUL PROCTOCOL
const session=require("express-session");
const MongoStore = require('connect-mongo');   //production phase mein jane se pehle must use

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600,
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expiry:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000
    }
};
app.use(session(sessionOptions));


//USING FLASH TO MY PROJECTS
const flash=require("connect-flash")
app.use(flash())

//PASSPORT
const User=require("./models/user.js")
const passport=require("passport")
const LocalStratergy=require("passport-local")
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// datass
const Listing=require("./models/listing.js");

const methodOverride=require("method-override");
app.use(methodOverride("_method"))

//mongoose
// const MONGO_URL='mongodb://127.0.0.1:27017/wandLuster'   //nt using further

const mongoose=require("mongoose");
main()
.then(()=>{console.log("connection successful")})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
}


// ejsmate
const ejsMate=require("ejs-mate");  
app.engine("ejs",ejsMate);


//ejs
const path=require("path")
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//SERVING STATIC FILES
app.use(express.static(path.join(__dirname,"public")))
    


// requiring utils files
const wrapAsync=require("./utils/wrapasync.js")
const ExpressError=require("./utils/expresserror.js")


//review model
const Review=require("./models/review.js")


//JOI
const Joi = require('joi');
const {listingSchema,reviewSchema}=require("./schema.js")


//LINES FOR CONNECT_FLASH
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curUser=req.user;
    next();
})


//REQUIRING API CALL FILES EXPRESS ROUTER
const listingRouter=require("./routes/listing.js");
app.use("/listings",listingRouter);
const reviewRouter=require("./routes/reviews.js")
app.use("/listings/:id/review",reviewRouter)
const userRouter=require("./routes/user.js")
app.use("/",userRouter)


//USING MULTER
const {storage}=require("./cloudConfig.js")
const multer  = require('multer')
const upload = multer({ storage })

//_______________________________________________________________________________________
// API'S




//PASSPORT ROUTES FOR ADDING A USER DEMO TO USER>JS
app.get("/demouser",async (req,res)=>{
    let fakeUser=new User({
        email:"student@gmail.com",
        username:"delta"
    });
    let registeredUser=await User.register(fakeUser,"HelloWorld");
    res.send(registeredUser)

})


app.listen(port,(req,res)=>{
    console.log("app is listening at port 8080")
})






app.get("/testlisting",wrapAsync(async (req,res)=>{
    let newlisting=new Listing({
        title:"villa at moutain",
        description:"at the mountain a cave experience",
        price:1500,
        location:"Shimla,Himachal Pradesh",
        country:"India",

    })

    await newlisting.save();
    res.send("success")
}))





app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
}
)

app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}=err;
    res.status(status).render("error.ejs",{message})
    // res.status(status).send(message);
})


