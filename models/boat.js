const mongoose = require('mongoose');
const reviewHelper = require('../helper/ratingsHelper')

const schema = mongoose.Schema({
    title : String,
    no_of_passengers : Number,
    booking_options : [{hours : Number, price : Number}],
    detail : String,
    captain_available : Boolean,
    owner : String,
    reviews : [{name : String, rating : String, date : Date, review : String}],
    location : String,
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
    captain_info : String
});

schema.virtual('avg_rating').get(async function(){
    return await reviewHelper.getAvgRating(this._id);
});

schema.virtual('hours').get(function(){
    if(this.booking_options.length > 1){
        this.booking_options.sort((a,b) => a.hours > b.hours ? 1 : -1);
        return `${this.booking_options[0].hours}-${this.booking_options[this.booking_options.length-1].hours} Hours`;
    }
    return `${this.booking_options.hours} Hours`;
})

schema.virtual('base_rate').get(function(){
    this.booking_options.sort((a,b) => a.price > b.price ? 1 : -1);
    return `${this.booking_options.price}/Hours`;
})

const model = mongoose.model('boat', schema);

module.exports = {boatModel : model};