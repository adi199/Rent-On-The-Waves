const mongoose = require('mongoose');

const schema = mongoose.Schema({
    first_name : String,
    middle_name : String,
    last_name : String,
    email_id : String,
    password : String,
    phone_no : Number
});

schema.methods.getName = function(){
    return `${this.first_name} ${this.middle_name} ${this.last_name}`;
}

const model = mongoose.model('user', schema);

module.exports = {userModel : model};