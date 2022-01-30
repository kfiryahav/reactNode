const mongoose = require('mongoose');

// here you can change to your local db
mongoose.connect({}, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(' mongoDB is connected!');
});

module.exports = db;
