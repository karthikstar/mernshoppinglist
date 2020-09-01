// when uysing mongoose, we want to create a model - a model of the data aka the fields we want
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema 
const ItemSchema = new Schema ({
    name : {
        type: String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    }
});

module.exports = Item = mongoose.model('item',ItemSchema);



