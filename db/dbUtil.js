const MONGOOSE = require('mongoose');
const DB_URL = process.env.DB_URL;
const USER = require('../domain/domUser');

const ADMIN = {
    Name: "Admin",
    Email: "admin@blackpiano.com",
    Password: "bLACKpIANO"
};

async function dbConnect(){
    try {
        let connection = await MONGOOSE.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        USER.createUser(ADMIN);
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