const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
//Giving users these attributes
const UserSchema = mongoose.Schema({
   /* name: {
        type: String
    },*/
    email:{
        type: String,
        required: true
    },
   /* username: {
        type: String,
        required: true
    },*/
    password: {
        type: String,
        required: true
    }
    });
    
//module.exports so that it could be used outside
//we pass it name of model and then the schema we want to pass
const User = module.exports = mongoose.model('User',UserSchema);


module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
};

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email};
    User.findOne(query, callback);
};

//hash function for password
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        if(err)
        {
           console.log("failed before hash"); 
        }
        bcrypt.hash(newUser.password, salt, (err, hash)=>{ 
            if(err){
                console.log("Failed after hash");
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};
 
module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
};
