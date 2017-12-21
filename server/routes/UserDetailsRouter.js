//Dependencies
var express = require('express');
var router = express.Router();
var UserDetails = require('../models/UserDetails');
const logger = require("../utils/logger");
var Utils = require('../utils/GenericFunctions');


router.post('/', function(req, res, next){
	UserDetails.addUser(req.body, function(err, count) {
    	if(err) {
    		logger.error("REQUEST URL: "+req.url+" , REQUEST IP:  "+ req.ip +", RESPONSE STATUS CODE: " +res.statusCode);
			logger.error("ERROR MESSAGE: "+ err);
            res.json(err);
        } else {
			res.json(req.body); //TODO: Return count for 1 & 0		
			logger.error("success MESSAGE: "+ req.body.count);
        }
    });
});



router.get('/:uname?',function(req, res, next) {	
    // logger.error("req.params.name "+ req.body.Username);
    // logger.error("req.params.pwd "+ req.body.Password);
		UserDetails.getUserByLogin(req.params.uname, function(err, rows) {
		    if(err) {
	        	logger.error("REQUEST URL: "+req.url+" , REQUEST IP:  "+ req.ip +", RESPONSE STATUS CODE: " +res.statusCode);
				logger.error("ERROR MESSAGE: "+ err);
	        	res.json(err);
	        } else {
				res.json(rows);			
	        }
	    });
	
});

router.post('/login', function(req, res) {
    var username, password;
    if (!Utils.empty(req.body.username) && !Utils.empty(req.body.password)) {
        username = req.body.username;
        password = req.body.password;
    } 
	
    console.log("username: " + username + ", password: " + password);

    var userObj = {};

    UserDetails.checkLoginDetails(username, password)
    	.then(results => {
    		console.log(results);
            if(results.length === 0) {
            	throw new Error("No User Found");
            } else {
            	userObj = results[0];
            	return userObj;
            }
    	})
    	.then(results => {
    		console.log("userObj: ", userObj);    			            		
	        console.log(userObj);
	        res.json(userObj);
    	})
    	.catch(error => {
    		console.log(error.message);
    		// Return empty arry indicating No User Found
	        res.json([]);
    	})
})


//Return router
module.exports = router;