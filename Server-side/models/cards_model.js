let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Card_schema = new Schema({
    bussines_name: {
        type: String,
        required: true
    },
    bussines_description: {
        type: String,
        required: false
    },
    bussines_address: {
        type: String,
        required: true
    },
    bussines_phone: {
        type: String,
        required: true
    },
    bussines_number: {
        type: Number,
        required: false
    },
    bussines_image: {
        type: String,
        required: false
    },
    created_at: {
        type: Date, default: new Date()
    },
    user_id: {
        type: String,
        required: false
    },
});

exports.cards_schema = mongoose.model('cards', Card_schema);