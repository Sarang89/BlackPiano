let MONGOOSE = require('mongoose');

let PAGE_SCHEMA = new  MONGOOSE.Schema({
    Title: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true
    },
    Keywords: Array,
    CreatedAt: Number,
    CreatedBy: String,
});

module.exports = MONGOOSE.model('Page', PAGE_SCHEMA); 