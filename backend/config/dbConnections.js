// const { connection } = require("mongoose");
const mongose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected",connect.connection.host, connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;