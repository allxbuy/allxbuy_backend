const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/alxbuy' || process.env.MONGODB_URI;
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