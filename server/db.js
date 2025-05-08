const mongoose=require('mongoose');
require('dotenv').config();
const mongoURL=process.env.MONGO_URL;

const connectToMongo = async()=>{
    try{
    await mongoose.connect(mongoURL);
    console.log("DB Connected Successfully");
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
}
module.exports=connectToMongo;