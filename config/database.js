const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;