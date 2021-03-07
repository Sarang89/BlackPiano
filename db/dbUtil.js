const MONGOOSE = require('mongoose');
const DB_URL = process.env.DB_URL;


async function dbConnect(){
    try {
        let connection = await MONGOOSE.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        let DB = MONGOOSE.connection;
        DB.on('error', console.error.bind(console, 'MongoDB connection error:'));
        return connection;    
    } catch (error) {
        throw error;        
    }
}

module.exports = {
    DB: dbConnect
}