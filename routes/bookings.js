var express = require('express');
var router = express.Router();
var boatService = require('../service/boatService');
var bookingService = require('../service/bookingService');

/*
    required format : 
        {
            boat : String,
            hours : Number,
            start_time : Number
            date : Date
        }
*/
router.post('/book', async function(req,res,next){
    try{
        let data = req.body;
        let boat = await boatService.getBoat(data.boat);
        data['base_rate'] = boat.base_rate;
        await bookingService.addBooking(data);
        res.json("Done");
    }catch(err){
        res.status(400).json({
            message : 'Failed to add booking.',
            errors : [err]
        });
    }
});

router.get('/', async function(req,res,next){
    try{
        let bookings = await bookingService.getAllBookings();
        res.json(bookings);
    }catch(err){
        res.status(400).json({
            message : 'Failed to retrive bookings.',
            errors : [err]
        });
    };
});

module.exports = router;