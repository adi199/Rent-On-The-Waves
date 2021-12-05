const {bookingModel} = require('../models/booking');

module.exports = {
    async insert(booking){
        let newBooking = new bookingModel(booking);
        await newBooking.save();
    },
    async findAll(){
        return await bookingModel.find();
    }
}