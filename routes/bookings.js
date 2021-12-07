var express = require('express');
const { render } = require('../app');
var router = express.Router();
var boatService = require('../service/boatService');
var bookingService = require('../service/bookingService');
var userService = require('../service/userService')

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
        console.log(boat.base_rate)
        data['base_rate'] = boat.base_rate;
        if(boat.booked_dates){
            boat.booked_dates.append(data.date);
        }
        else{
            boat.booked_dates = [data.date];
        }
        let user = await userService.fetchUser(req.session.emailId);
        data['user'] = user._id;
        await bookingService.addBooking(data);
        res.json("Done");
    }catch(err){
        console.log(err)
        res.status(400).json({
            message : 'Failed to add booking.',
            errors : [err]
        });
    }
});

router.get('/', async function(req,res,next){
    try{
        let user = await userService.fetchUser(req.session.emailId);
        console.log(user);
        let bookings = await bookingService.getAllBookings(user._id);
        res.render('bookings.ejs', {bookings : bookings});
    }catch(err){
        res.status(400).json({
            message : 'Failed to retrive bookings.',
            errors : [err]
        });
    };
});

module.exports = router;