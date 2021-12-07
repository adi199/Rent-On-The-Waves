const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
    first_name : String,
    middle_name : String,
    last_name : String,
    email_id : String,
    password : String,
    phone_no : Number,
    cart : [{
        boat : {type : mongoose.ObjectId, ref : 'boat'},
        hours : String,
        total_price : Number,
        date : Date
    }]
});

schema.methods.getName = function(){
    return `${this.first_name} ${this.middle_name} ${this.last_name}`;
}

schema.pre('save', async function(){
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const model = mongoose.model('user', schema);

module.exports = {userModel : model};