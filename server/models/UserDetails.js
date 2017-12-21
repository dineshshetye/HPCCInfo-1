//reference of dbconnection.js
var mysql_pool = require('../DBConnection');

// REST API calls for tbl_userdetails
var UserDetails = {
		addUser: function(userDetails, callback) {
			return mysql_pool.query("Insert into User (FirstName,LastName,UserName,Password,Email,IsDeleted,CreatedDate,ModifiedDate)values(?,?,?,?,?, 0,?, ?)", 
				[userDetails.fname,
                    userDetails.lname,
                    userDetails.uname,
                    userDetails.password,
                    userDetails.emailid,
                    userDetails.dateupdated,
                    userDetails.datemodified], callback);
        },
        getUserByLogin: function(loginDetails, callback) {
            if(loginDetails.includes('&')){
                res = loginDetails.split("&");              
            }
			return mysql_pool.query("select * from User where UserName = ? and Password= ? and IsDeleted=0", [res[0],res[1]], callback);
        },

        checkLoginDetails: function(username, encrypted_pwd) {
			return new Promise( (resolve, reject) => {
				mysql_pool.query(" SELECT username,Email FROM " +
								 " User WHERE UserName = ? AND Password = ? AND IsDeleted = 0",
						 		 [ username, encrypted_pwd ], (error, result) => {
					if(error) {
						return reject(error);
					}

					return resolve(result);
				});
			});
		}
        

};

module.exports = UserDetails;