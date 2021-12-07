const {boatModel} = require('../models/boat');

module.exports = {
    fetchAll : async function(){
        try{
            let boats = await boatModel.find({deleted : false});
            return boats;
        }catch(err){
            console.log("Error occured while fetching boats.\n", err);
        }
        return [];
    },
    fetch : async function(boatId){
        try{
            return await boatModel.find({_id : boatId});
        }catch(err){
            console.log(`Error occured while fetching boat with ID ${boatId}.\n`, err);
        }
        return null;
    },
    fetchByFilter : async function(filter){
        try{
            console.log(filter)
            return await boatModel.find(filter);
        }catch(err){
            console.log(`Error occured while fetching boat with ID ${boatId}.\n`, err);
        }
        return null;
    },
    add : async function(boat){
        try{
            let newBoat = new boatModel(boat);
            await newBoat.save();
            console.log("Added new boat.");
            return true;
        }catch(err){
            console.log('Error occured while adding new boat.\n', err);
        }
        return false;
    },
    delete : async function(boatId){
        try{
            let boat = await boatModel.findOne({'_id' : boatId});
            boat.deleted = true;
            boat.save();
            console.log(`Deleted boat with ID ${boatId}`);
            return true;
        }catch(err){
            console.log(`Error occured while deleting boat with id ${boatId}`, err);
        }
        return false;
    },
    update : async function(boatId, update){
        try{
            await boatModel.updateOne({_id : boatId}, update);
            return true;
        }catch(err){
            console.log("Error occured while updating the boat document.\n", err);
        }
        return false;
    }
}