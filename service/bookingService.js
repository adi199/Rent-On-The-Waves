const dao = require('../dao/bookingDao');

module.exports = {
    getAllBookings : async function(){
        return await dao.findAll();
    },
    addBooking : async function(booking){
        return await dao.insert(booking);
    }
}