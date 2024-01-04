
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public'
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    allowComments: {
        type: Boolean,
        default: false
    },
    file: {
        type: String,
        default: ''
    },
    createdBy: {
        type: String, 
        required: true
    },
});

module.exports = mongoose.model('post', PostSchema);

