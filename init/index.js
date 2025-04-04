const mongoose=require("mongoose");
main()
.then(()=>{console.log("connection successful")})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderLust');
}

const Listing=require("../models/listing.js");

let initData=require("./data.js");  


async function initDB(){
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({ ...obj, owner:"67eab2b43b4989f26ee91d23"}))
    await Listing.insertMany(initData.data)         //as hmne export krte waqt data.js mein use as a object pass kiya tha n now i want to access the key jo use ki hai while deconstructing
    console.log("data sent")
};

initDB();