const pool = require('./sqlConnect.js');// this is where the connection is made.
//const test = 
exports.login = function(username, password, callback){//pass in what we need.
    pool.query('SELECT * FROM login WHERE username = ? AND password = ?;',[username,password], function(err, results){//Server name will be table name, first check if user has posted anything. Use results if found
        if(err){
            console.log(err);
        };
        if(results == null){
            callback("UNF");
        }else{
            callback(results);
        };
    });
};
exports.adduser = function(username, password, callback){
    pool.query('SELECT * FROM login WHERE username = ?;',[username,password], function(err, results){
        if(err){
            console.log(err);
            callback(err);
        }else if(results == null){
            poo.query('INSERT INTO login (username,password) VALUES (?,?)',[username,password], function(err,results){
                if(err){
                    console.log(err)
                    callback(err)
                }else{
                    callback("NUA");
                };
            });
        }else{
            callback("UAE");
        };
    });
};
/*
Here we are exporting checkLogin so that it can be used by other files.
We are passing in username and password.
We call for a connection from the pool by using pool.query, we then have the query we want to exacute.
if there is an error it will throw it, otherwise it will return us the results.
*/