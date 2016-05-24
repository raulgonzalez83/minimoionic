/**
 * Created by Oriol on 15/4/16.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Student', {
    name: String,
    address: String,
    phones: {
        home: Number,
        work: Number    }
});