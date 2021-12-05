const reviewModel = require('../models/review');

module.exports = {
    add : async function(review){
        try{
            let newReview = new reviewModel(review);
            await newReview.save();
        }catch(err){
            console.log(`Error occured while saving review.\n`, err);
        }
    }
}