const mongoose = require('mongoose');
const { schema } = require('./classSchema');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    // _id: {type: Schema.Types.ObjectId},
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    class: {
        type: Number,
        ref: 'Class'
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);
