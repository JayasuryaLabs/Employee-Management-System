const mongoose = require("mongoose");
require('dotenv').config({ path: './config.env' }); // Specify the path to your config file

const connect = async () => {
    try {
        // mongodb connection
        const uri = process.env.MONGO_URI || "mongodb://localhost:27017/EMP"; // Use the URI from the env file or fallback to a default
        console.log("Mongo URI:", uri); // Log the URI

        const con = await mongoose.connect(uri);

        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connect;
