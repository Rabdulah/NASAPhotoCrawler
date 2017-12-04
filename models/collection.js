const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
//Giving users these attributes
const CollectionSchema = mongoose.Schema({
    email: String,
    title: String,
    descrip: String,
    isPublic: String,
    imageList: [String]
    });
    
const Collection = module.exports = mongoose.model('Collection',CollectionSchema);

module.exports.getCollectionByEmail = function(email, callback){
    const query = {email: email};
    Collection.findOne(query, callback);
};

module.exports.addCollection = function(newCollection, callback){
    console.log(newCollection);
            newCollection.save(callback);
};