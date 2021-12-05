const boatModel = require('../models/boat');

module.exports = {
    addReview : async function(review){
        let boat = await boatModel.findOne({_id : review.boat});
        if(boat.reviews.length > 3){
            boat.reviews.pop()
        }
        boat.reviews.push({'name' : review.reviewer_name, 'rating' : review.stars, 'date' : review.date, 'review' : review.review});
        await boat.save();
        console.log(`Added review to boat with ID ${boat._id}`);
    }
}