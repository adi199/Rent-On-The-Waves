const db = require('mongoose');

CONNECTION_STRING = 'mongodb+srv://admin:admin%40123456@boat-rental-cluster.sxpak.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

class Database{
    constructor(){
        this.connect();
    }

    connect(){
        db.connect(CONNECTION_STRING)
            .then(() => console.log('Database connected succesfully.'))
            .catch((err) => console.log('Error occured while connecting to database.\n', err));
    }
}

module.exports = {Database};