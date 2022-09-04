const mongoose = require("mongoose");

module.exports = connection = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${process.env.DB}`)
        console.log("connected to database.");
    } catch (error) {
        console.log(error, "could not connect database.");
    }
};