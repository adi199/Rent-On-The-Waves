var express = require('express');
var router = express.Router();
var boatService = require('../service/boatService');

/*
    GET Request
    returns list of boats
    format : [{
        title : String,
        location : String,
        hours : String,
        captain_available : Boolean,
        base_rate : Number,
        avg_rating : Number,
        no_of_passengers : Number
    }]
*/
router.get('/', async function(req, res, next){
    res.json(await boatService.getAllBoats());
});

/*
    POST Request
    Adds new boat to the database
    Required input : {
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
    }
*/
router.post('/add', async function(req, res,next){
    res.json(await boatService.addBoat(req.body))
})

module.exports = router;