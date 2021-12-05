const {reviewModel} = require('../models/review');

module.exports = {
    getAvgRating : async function(boatId){
        try{
            let rating =  await reviewModel.aggregate([
                {$group : {boat_id : boatId, avg_rating : {$avg : "stars"}}},
                { $project : {avg_rating : 1}}
            ]);
            return Object.keys(rating).length === 0 ? 0 : rating.avg_rating;
        }catch(err){
            console.log(`Error occured while fetching avg rating for boat with ID ${boatId}.\n`, err);
        }
        return 0;
    }
}