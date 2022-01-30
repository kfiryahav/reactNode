let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const user_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bussiness: {
        type: Boolean,
        required: false
    },
    created_at: {
        type: Date, default: new Date()
    },
    cards: {
        type: Array,
        required: false
    }
});

exports.user_model = mongoose.model('users', user_schema);