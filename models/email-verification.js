var uuid = require('uuid');

var Token = require('./token');
var User = require('./user');

module.exports.verifyUser = function(user) {
	// create verification token
	var newToken = new Token({
	    tokenData: uuid(),
		userId: user._id
	});
	
	newToken.save();
	console.log(newToken.tokenData);
	User.sendEmail(user, newToken.tokenData);
	User.getUserByEmail(user.email, (err, cuser) =>{
		if(err){
		    console.log("error");
		} else{
		    cuser.usertoken = newToken.tokenData;
		    cuser.save();
		    console.log(cuser.usertoken);
		    console.log(cuser.email);
		}
	});
};

module.exports.reVerifyUser = function(idOfUser) {
	// create verification token
	User.getUserByEmail(idOfUser.email, (err, cuser) =>{
		if(err){

		} else{
			console.log(cuser.email);
			console.log(cuser.usertoken);
			User.sendEmail(cuser, cuser.usertoken);
		}
	});
};

module.exports.confirmToken = function(tokenData, callback) {
	
	Token.findOne({tokenData: tokenData}).exec(function(err, tok) {
		if (err) {
			User.findById(tok.userId).exec(function(err, user) {
				if (err || !user) {
					return callback(new Error('User does not exist'));
				}
				user.__v = 1;
				user.save(callback);
			});
			return callback(err);
		}
		else {
			console.log(tok);
			User.findById(tok.userId).exec(function(err, user) {
				if (err || !user) {
					return callback(new Error('User does not exist'));
				}
				user.__v = 1;
				user.save(callback);
			});
		}
	});
};