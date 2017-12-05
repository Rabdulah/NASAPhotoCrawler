const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const nodemailer = require('nodemailer');
const xoauth2 = require("xoauth2");
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
    },
        __v: {
        type: Number
    },
    usertoken: {
        type: String
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

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            type: 'OAuth2',
            user: 'ramziabdullahi@gmail.com',
            clientId: '946126135269-3m1v4dtec9u3q9eemlfnqgtjh826berf.apps.googleusercontent.com',
            clientSecret: 'LAg0j90V4VzL8HuNxKyqi-bd',
            refreshToken: '1/Ln0Hgem8G9C3UtecvdNEA8gPB98w6Q3CM41vvBdHUUXVLIY1UfzmH2J-8aGdiH0s'
      
    }
});

module.exports.sendEmail = function(user, verificationTokenData){
    var verificationUrl = "https://lab5-rabdulah.c9users.io:8081/api/verify/" + verificationTokenData;
    var emailBody = '<p>Hey, <br/>Verify your email by clicking the following link: <a href="' + 
        verificationUrl + '" target="_blank"> Click me</a></p>';
    
    var mailOptions = {
        from: 'Ramzi <RamziAbdullahi@gmail.com>',
        to: "ramziabdullahi@gmail.com",
        subject: 'Nasa Pictures',
        html: emailBody
    }
    
    transport.sendMail(mailOptions, (err, res) => {
        if(err){
            console.log(err); return false;
        } else {
            console.log("Email sent"); return true;
        }
    }); 
}