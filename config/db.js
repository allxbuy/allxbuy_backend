const mongoose = require('mongoose');
const dbURI =  process.env.MONGODB_URI || "mongodb://localhost:27017/alxbuy";
const connectDB = async () => {

    try{
        await mongoose.connect(dbURI);
        console.log('MongoDB connected');
    }
    catch(err){
        console.error(err.message);
    }
}
module.exports = connectDB;