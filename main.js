const checkLogin = query.checkLogin;
const register = query.register;
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const query = require('./js/querys');

const hostname = '127.0.0.1';
const port = 3000;

// Object creation
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// Setup express
app.set("port", port);
app.use(express.static(__dirname + "/public"));

io.on('connection', function(socket){
    console.log("new user");

    socket.on('send message',function(msg, sender){
      console.log("message: ", msg, sender);
      io.emit('recive message', msg, sender);
    });
    socket.on('login', function(usr, pass, callback){
      //check login with SQL
      console.log(usr," ", pass);
      checkLogin(usr, pass, function(error, results){//calls checkLogin from querys.js passing usr and pass, then storeing the return in results
        if (results[0] == null){
          callback(results);
        }else{
          console.log("the results are :", results[0].username);
          //console.log(util.inspect(results, false, null, true));
          callback(results[0].username);
        };
      }); 
    });
    socket.on('register', function(usr, email, pass, callback){
      register(usr, email, pass, function(err, results){
          callback(results);
      }
      )
    })
});
io.on('disconect', function(socket){
console.log("player disconnected");
});

app.get("/login", function(req,res){
  let loginDetails = JSON.parse(req.headers.user);

  query.login(loginDetails.username, loginDetails.password, function(results){
      if(results.length === 0){
          res.sendStatus(400).send(); // Bad request, no login found
      } else {
          console.log("the results are :", results[0].username);
          //console.log(util.inspect(results, false, null, true));
          res.send(results[0].username);
      }
  });
  
});

app.post("/register", function(req, res){
  let registerDetails = req.body;
  query.adduser(registerDetails, function(callback){
      if(callback == "UAE"){
        res("UAE");
        console.log("user already exisits");
      }else if(callback == "NUA"){
      console.log("Sucessfully Registered!")
      res("User registered");
      }else{
        console.log(callback);
        res("err")
      };
  });
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });  