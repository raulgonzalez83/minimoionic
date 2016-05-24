/**
 * Created by Oriol on 15/4/16.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Subject', {
    name: String,
    students: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    }]
});

