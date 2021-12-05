const dao = require('../dao/reviewDao');

module.exports = {
    addReview : async function(review){
        await dao.add(review);
    }
}