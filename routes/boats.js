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
    try{
        let boats = await boatService.getAllBoats()
        res.render('boatsListing', {boats : boats});   
    }catch(err){
        res.status(400).json({
            message : 'Failed to retrive Boats.',
            errors : [err]
        });
    }
});

router.post('/', async function(req, res, next){
    try{
        let boats = await boatService.getBoats(req.body);
        res.json(boats);
    }catch(err){
        res.status(400).json({
            message : 'Failed to retrive Boats.',
            errors : [err]
        });
    }
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
    let data = req.body;
    data['image'] = req.files[0].originalname;
    data['specification'] = {
        year : data.year,
        make : data.make,
        capacity : data.capacity,
        boat_type : data.boat_type,
        model : data.model,
        length : data.length
    }
    delete data['year']
    delete data['make']
    delete data['capacity']
    delete data['boat_type']
    delete data['model']
    delete data['length']
    res.json(await boatService.addBoat(data));
});

router.get('/add', function(req, res,next){
    res.render('addNewBoat');
})

router.get('/:boatId/detail',  async function(req,res,next){
    let boat = await boatService.getBoat(req.params.boatId);
    if(!boat){
        return res.status(400).json({errors : 'Incorrect boat Id.'});
    }
    res.render('boatDetail', {boat : boat[0]});
})

module.exports = router;