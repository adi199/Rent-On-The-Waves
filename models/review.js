const mongoose = require('mongoose');

const schema = mongoose.Schema({
    boat_id : String,
    reviewer_name : String,
    starts : Number,
    review : String,
    date : Date
});

const model = mongoose.model('review', schema);

module.exports = {reviewModel : model};