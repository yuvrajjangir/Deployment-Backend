const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
    title: String,
    body: String,
    category:{
        type: String,
        enum: ['parking', 'covid', 'maintenance'],
    },
    date:{
        type:Date,
        default:Date.now,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;