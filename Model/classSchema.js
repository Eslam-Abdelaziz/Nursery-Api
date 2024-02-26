const mongoose = require("mongoose");
const childSchema = require("./childSchema");
const AutoIncrement = require("mongoose-sequence")(mongoose)

const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    children: [{
        type: Number,
        ref: 'Children'
    }]
});

// childSchema.plugin(AutoIncrement, {id:"child_id", inc_field: "id"});
module.exports = mongoose.model('Class', ClassSchema);
