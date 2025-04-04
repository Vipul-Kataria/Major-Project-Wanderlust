const Listing=require("../models/listing.js")     //ye xhaiye cause index route ka callback mein use ho rha hai ye

module.exports.index=async (req,res)=>{
    let alllistings=await Listing.find({});
    res.render("index.ejs",{alllistings})
}

module.exports.createNewListing=async (req,res,next)=>{
    let url= req.file.path;
    let filename= req.file.filename;
    const newlisting=await new Listing(req.body.listing)
//    console.log(newlisting)
   newlisting.owner=req.user._id;
    newlisting.image={url,filename};
   await newlisting.save();
   req.flash("success","New Listing Created!");
   res.redirect("/listings")
  
}

module.exports.renderNewForm=(req,res)=>{
    console.log("ok")
    res.render("new.ejs")
}



module.exports.showListing=async (req,res)=>{
    let{id}=req.params;
    let listing=await Listing.findById(id).populate({path:"reviews",populate:"author"}).populate("owner");
    
    if(!listing){
        req.flash("error","The listing you requested for has been deleted.Sorry!")
        res.redirect("/listings")
    }
    console.log(listing);
    res.render("show.ejs",{listing})
    
    
}





module.exports.renderEditForm=async (req,res)=>{
    
    let{id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","The listing you requested for updation has been deleted.Sorry!")
        res.redirect("/listings")
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl.replace("/upload","/upload/h_300,w_250")
    res.render("edit.ejs",{listing,originalImageUrl});
}


module.exports.updateListing=async (req,res)=>{
    let url= req.file.path;
    let filename= req.file.filename;
    let{id}=req.params;
    
    // let listing=await Listing.findById(id);
    // if(!listing.owner._id.equals(res.locals.curUser._id)){
    //     req.flash("error","You dont have access to edit this listing")
    //     return res.redirect(`/listings/${id}`)
    // }


    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});  //hme req.body.listening de rha tha object toh meine use deconstruct kr lia and ab hm iski values alg alg krke update kr denge
    if(typeof req.file!="undefined"){
    listing.image={url,filename}
    await listing.save();
    }
    req.flash("success","Updated successfully")
    res.redirect("/listings")
}


module.exports.deleteListing=async (req,res)=>{
    let{id}=req.params;
    let dellist=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Successfully Deleted")
    res.redirect(`/listings`);
}