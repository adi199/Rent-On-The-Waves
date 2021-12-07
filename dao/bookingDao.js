const {bookingModel} = require('../models/booking');

module.exports = {
    async insert(booking){
        let newBooking = new bookingModel(booking);
        await newBooking.save();
    },
    async findAll(userId){
        return await bookingModel.find({user : userId});
    }
}