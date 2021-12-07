var express = require('express');
const { render } = require('../app');
var router = express.Router();
var boatService = require('../service/boatService');

router.use(function(req,res,next){
    let session = req.session;
    if(session.emailId){
        return next();
    }
    res.redirect('/login');
})

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

router.get('/add', function(req, res,next){
    res.render('addNewBoat');
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

router.post('/:boatId/update', async function(req,res,next){
    try{
        let data = req.body;
        console.log(req.files)
        if(req.files.length > 0){
            data['image'] = req.files[0].originalname;
        }
        else{
            delete data['image'];
        }
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
        await boatService.updateBoat(req.params.boatId, data);
        res.json('success');
    }catch(err){
        console.log(err);
        res.status(400).json({
            message : 'Failed to update the boat.',
            errors : [err]
        });
    }
});

router.get('/admin', async function(req,res,next){
    let boats = await boatService.getAllBoats();
    res.render('admin/boatListing', {boats : boats});
})

router.get('/:boatId/delete', async function(req, res, next){
    try{
        await boatService.deleteBoat(req.params.boatId);
        res.json("Success");
    }catch(err){
        res.status(400),json({
            message : "Failed to delete boat.",
            errors : [err]
        })
    }
});

router.get('/:boatId/update', async function(req, res, next){
    try{
        let boats = await boatService.getBoat(req.params.boatId);
        if(boats.length > 0){
            return res.render('admin/updateBoat', {boat : boats[0]});
        }
        res.status(404).json({ message : "Invalid boat ID." });
    }catch(err){
        res.status(400).json({
            message : "Failed to delete boat.",
            errors : [err]
        })
    }
});

router.get('/:boatId/detail',  async function(req,res,next){
    let boat = await boatService.getBoat(req.params.boatId);
    if(!boat){
        return res.status(400).json({errors : 'Incorrect boat Id.'});
    }
    res.render('boatDetail', {boat : boat[0]});
});

module.exports = router;