const userDao = require('../dao/userDao')

module.exports = {
    isUserExisting : async function(email, password) {
        let user = await userDao.findUserByEmailAndPassword(email, password);
        return user != null;
    },
    addUser : async function(user) {
        if(! await this.isEmailExisting(user.email_id)){
            return await userDao.save(user);
        }
        return "Email ID already in use.";
    },
    fetchAllUsers : async function() {
        let users = await userDao.findAll({});
        return users;
    },
    isEmailExisting : async function(email) {
        if(await userDao.findByEmailId(email)){
            console.log(await userDao.findByEmailId(email));
            return true;
        }
        return false;
    },
    addToCart : async function(item, emailId){
        let user = await userDao.findByEmailId(emailId);
        user.cart.push(item);
        user.save();
    },
    clearCart : async function(item, emailId){
        let user = await userDao.findByEmailId(emailId);
        user.cart = [];
        user.save();
    },
    deleteFromCart : async function(item, emailId){
        let user = await userDao.findByEmailId(emailId);
        for(var i=0;i<user.cart.length;i++){
            if(user.cart[i].boat == item.boat){
                user.cart.splice(i, 1);
            }
        }
        user.save();
    }
}