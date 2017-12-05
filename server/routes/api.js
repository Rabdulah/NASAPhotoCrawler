const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const eVer = require("../../models/email-verification");
const config = require('../../config/database');
const User = require('../../models/user');
const Collection = require('../../models/collection');

//---------------------------------------USERROUTES-------------------------------------------------------------------------------------------------//

//REGISTER
router.post('/register',(req,res,next)=>{
	let newUser = new User({
		//name: req.body.name,
		email: req.body.email,
		//username: req.body.username,
		password: req.body.password,
		__v: req.body.__v,
    usertoken: req.body.usertoken
	});
    
	// Check if a user with that username is already registered
	User.getUserByUsername(newUser.email, (error, user)=>{
	let newUser = new User({
		email: req.body.email,
		password: req.body.password
	});

	// Check if a user with that email is already registered
	User.getUserByEmail(newUser.email, (error, user)=>{
		
		// Throw error if any
		if(error) throw error;

		console.log('user email is '+newUser.email);
		// email not found
		if(!user){
			console.log('New user');
			User.addUser(newUser, (err, user)=>{
				if(err){
					res.json({
						success: false,
						message: 'Failed to register user'
					});
				}
				else{
            User.addUser(newUser, (err, user) =>{
                if(err){
                    res.json({
                        success: false,
                        msg: "Failed to register user"
                    });
                } else{
                    res.json({
                    success: true,
                    msg: "User Registered"
                    });
                    user.__v = 0;
                    eVer.verifyUser(newUser);
                }    
            });
				}
			});
		}
		// email is found - user already exists
		else{
			console.log('This email already exists');
			res.json({
					success: false,
					message: 'Email already in use'
				});
		}
	});
});
});

//AUTHENTICATE
router.post('/authenticate',(req,res,next)=>{
  const email = req.body.email;
  const password = req.body.password;
  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            email: user.email,
            __v: user.__v,
          	user: user.usertoken     
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

//Verification
router.get('/verify/:verificationToken', function(req, res) {
    var tokenData = req.params.verificationToken;
		eVer.confirmToken(tokenData, function(err) {
			if (err) {
				res.json({
				    success: false,
					error: 'Error verifying email.',
				});
			} else {
				res.json({
					success: true, 
					message: 'Youre account is now verified'
				});
			}
		});
});
//PROFILE
router.get('/profile', passport.authenticate('jwt', {session:false}),(req,res,next)=>{
    res.json({user: req.user});
});

//----------------------------------COLLECTION ROUTES-----------------------------------------------------------------------------------------------//


router.post('/collection',(req,res,next)=>{
	console.log(Object.keys(req.body));
	let newCollection = new Collection({
		email: req.body.email,
	  title: req.body.title,
	  descrip: req.body.descrip,
	  isPublic: req.body.isPublic,
	  imageList: req.body.imageList
	});
    
		
		console.log('New collection from user with email '+newCollection.email);
			Collection.addCollection(newCollection, (err, user)=>{
				if(err){
					res.json({
						success: false,
						message: 'Failed to create collection'
					});
				}
				else{
					res.json({
						success: true,
						message: 'Collection successfully created'
					});
				}
			});

});

//Get a users collection 
router.get('/collections/usercollections/:email', passport.authenticate('jwt', {session:false}),(req,res,next)=>{
	let newCollection = new User({
		email: req.params.email,
	});
	console.log('1');
	// console.log(Collection.getCollectionByEmail(newCollection.email));
		console.log('2');

	Collection.getCollectionByEmail(newCollection.email, (error, cn)=>{
		if(error){
			console.log("erooooooooooooooooooooooooooooooooooooooooooooooooooooooooooor");
			throw error;
		} 

		// console.log('looking for collections from '+newCollection.email);
		// // email not found
		if(cn){
			res.json({collection: cn});
		} else {
			res.json({
				success: false
			});
		}

    
});
});





module.exports = router;