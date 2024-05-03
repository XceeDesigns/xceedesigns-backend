const mongoose = require('mongoose');

const connectDB = async (DB_URL) => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to database", error.message);
    }
}

module.exports = connectDB;