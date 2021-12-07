const dao = require('../dao/bookingDao');

module.exports = {
    getAllBookings : async function(userId){
        return await dao.findAll(userId);
    },
    addBooking : async function(booking){
        return await dao.insert(booking);
    }
}