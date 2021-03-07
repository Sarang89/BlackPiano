let MONGOOSE = require('mongoose');

let USER_SCHEMA = new  MONGOOSE.Schema({
    Name: String,
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    CreatedAt: Number,
    CreatedBy: String,
    Status: String
});

module.exports = MONGOOSE.model('User', USER_SCHEMA); 
