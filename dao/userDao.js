const {userModel} = require('../models/user');
const bcrypt = require('bcrypt');
const { NotExtended } = require('http-errors');

module.exports = {
    findUserByEmailAndPassword : async function(email, password) {
        let user = await userModel.findOne({ email_id : email});
        if(user){
            console.log(password);
            if(await bcrypt.compare(password, user.password)){
                return user;
            }
        }
        return null;
    },
    save : async function(user) {
        try{
            let newUser = new userModel(user);
            await newUser.save();
            console.log(`New user ${newUser.getName()} added.`);
            return true;
        }catch(err){
            console.log("Error occured while adding new user.\n", err);
            return false;
        }
    },
    findAll : async function() {
        let users = []
        try{
            users = await userModel.find();
            console.log(`Fetched ${users.length} records from User Collection.`);
        }catch(err){
            console.log("Error occured while fetching records from User collection.\n", err);
        }
        return users;
    },
    findByEmailId : async function(targetEmailId) {
        return await userModel.findOne({ email_id : targetEmailId});
    }
}