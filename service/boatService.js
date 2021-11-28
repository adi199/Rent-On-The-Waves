const dao = require('../dao/boatDao');

module.exports = {
    getAllBoats : async function(){
        return await dao.fetchAll();
    },
    getBoat : async function(boatId){
        let boat = await dao.fetch(boatId);
        return boat ? boat : "Invalid Boat ID";
    },
    addBoat : async function(boat){
        return await dao.add(boat);
    },
    deleteBoat : async function(boatId){
        return await dao.fetch(boatId) ? await dao.delete(boatId) : "Invalid Boat ID";
    },
    updateBoat : async function(boatId, update){
        return await dao.fetch(boatId) ? await dao.update(boatId, update) : "Invalid Boat ID";
    }
}