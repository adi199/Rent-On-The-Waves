const mongoose = require('mongoose');
const boatHelper = require('../helper/boatHelper');

const schema = mongoose.Schema({
    boat : {type : mongoose.ObjectId, ref : 'boat'},
    reviewer_name : String,
    starts : Number,
    review : String,
    date : Date
});

schema.post('save', async function(){
    console.log(`New review added for boat with ID ${this.boat}.`);
    boatHelper.addReview(this);
});

const model = mongoose.model('review', schema);

module.exports = {reviewModel : model};