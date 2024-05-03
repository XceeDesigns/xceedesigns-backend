const mongoose = require('mongoose');

const connectDB = async (DB_URL) => {
    try {
        mongoose.connect("mongodb+srv://xceedesigns:ee1bQcTcuGYj1rCj@xceedesigns.4qdrpfu.mongodb.net/Xceed");
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to database", error.message);
    }
}

module.exports = connectDB;