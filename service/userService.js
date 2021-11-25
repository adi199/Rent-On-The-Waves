const userDao = require('../dao/userDao')

module.exports = {
    isUserExisting : function(email, password) {
        let user = userDao.findUserByEmailAndPassword(email, password);
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
    }
}