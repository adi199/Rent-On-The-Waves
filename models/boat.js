const mongoose = require('mongoose');
const reviewHelper = require('../helper/ratingsHelper')

const schema = mongoose.Schema({
    title : String,
    no_of_passengers : Number,
    base_rate : String,
    max_hours_available : Number,
    detail : String,
    captain_available : Boolean,
    owner : String,
    avg_rating : String,
    location : String,
    reviews : [{name : String, rating : String, date : Date, review : String}],
    specification : {
        year : String,
        make : String,
        capacity : Number,
        boat_type : String,
        model : String,
        length : Number
    },
    features : [String],
    allowed_on_boat : [String],
    cancellation_policy : [String],
    security_deposit : String,
    captain_info : String,
    image : String,
    booked_dates : [],
    deleted : {
        type : Boolean,
        default : false
    }
});

//Runs after each document saves
schema.pre('save', async function(){

    //Setting average rating
    this.avg_rating = await reviewHelper.getAvgRating(this._id);
});

schema.post('update', function(){
    console.log(`Boat with ID ${this._id} updated.`);
})

schema.post('find', function(docs){
    console.log(`Retrived ${docs.length} documents from boat collection.`);
})

const model = mongoose.model('boat', schema);

module.exports = {boatModel : model};