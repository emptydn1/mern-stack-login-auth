var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var chuyenthanhobjectid = require('mongodb').ObjectID;

var postSchema = new Schema({
    user: {
        type: Schema.Types.Object,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'posts' });

module.exports = mongoose.model('Post', postSchema);