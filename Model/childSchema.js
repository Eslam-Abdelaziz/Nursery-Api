const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        enum: ['PreKG', 'KG1', 'KG2'],
        required: true
    },
    address: {
        city: String,
        street: String,
        building: String
    },
    class: {
        type: Number,
        ref: 'Class'
    }
});

module.exports = mongoose.model('Children', ChildSchema);
