const dao = require('../dao/boatDao');

module.exports = {
    getAllBoats : async function(){
        return await dao.fetchAll();
    },
    getBoats : async function(filter){
        let boats = await dao.fetchByFilter(filter);
        return boats ? boats : "Invalid filters";
    },
    getBoat : async function(boatId){
        let boat = await dao.fetch(boatId);
        return boat ? boat : "Invalid Boat ID";
    },
    addBoat : async function(boat){
        boat.captain_available = boat.captain_available === 'Yes';
        console.log(boat)
        boat.features = boat.features.split(',');
        boat.allowed_on_boat = boat.allowed_on_boat.split(',');
        boat.cancellation_policy = boat.cancellation_policy.split(',');
        return await dao.add(boat);
    },
    deleteBoat : async function(boatId){
        return await dao.fetch(boatId) ? await dao.delete(boatId) : "Invalid Boat ID";
    },
    updateBoat : async function(boatId, update){
        return await dao.fetch(boatId) ? await dao.update(boatId, update) : "Invalid Boat ID";
    }
}