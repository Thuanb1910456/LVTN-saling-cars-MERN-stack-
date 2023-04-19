const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connect to database successfully');
    } catch (error) {
        console.log(`Connect Failure! Error: ${error}`);
        process.exit(1);
    }
}
module.exports = { connectDB }