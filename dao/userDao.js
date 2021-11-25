const {userModel} = require('../models/user');

module.exports = {
    findUserByEmailAndPassword : async function(targetEmail, targetPassword) {
        userModel.findOne({ email_id : targetEmail , password : targetPassword})
            .then((result) => {
                console.log(result);
                return result;
            })
            .catch((err) => {
                console.log("Error occurred while fetching the user records.\n", err);
                return NaN;
            })
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