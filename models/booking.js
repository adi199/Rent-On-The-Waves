const mongoose = require('mongoose');
const reviewHelper = require('../helper/ratingsHelper')

const schema = mongoose.Schema({
    user : String,
    boat : String,
    start_time : String,
    hours : Number,
    date : Date,
    base_rate : Number,
    total_cost : Number
});

//Runs after each document saves
schema.pre('save', async function(){
    this.total_cost = this.base_rate*this.hours;
    this.date = (new Date()).toLocaleDateString("en-US");
});

schema.post('save', async function(){
    console.log(`New booking by User ${this.user} for boat ${this.boat}.`);
})

schema.post('find', async function(docs){
    console.log(`Retrived ${docs.length} documents from Bookings Collection.`);
})

const model = mongoose.model('booking', schema);

module.exports = {bookingModel : model};