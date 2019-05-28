let socket = io();

function sendMsg(){
    msgSend = document.getElementById("chatbox").value;
    socket.emit('send message', msgSend, username);
    document.getElementById("chatbox").value = ""
};
socket.on('recive message', function(msg, sender){
  console.log("message recived :", msg, sender);
  var node = document.createElement("LI");
  var textnode = document.createTextNode(sender + ": " + msg);
  node.appendChild(textnode);
  document.getElementById("chatin").appendChild(node);
});

document.getElementById("login").addEventListener("click", login);

function login(){
  var loginDetails = {
    "username": document.getElementById("usernamebox").value,
    "password": document.getElementById("passwordbox").value
  }
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/login");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let res = xhr.responseText;
          console.log(res);
          
        } else {
          console.log(red);
          }
      }

  }
  xhr.send(JSON.stringify(loginDetails));
}

function register(){
  var loginDetails = {
    "username": document.getElementById("usernamebox").value,
    "password": document.getElementById("passwordbox").value
  }
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/register");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let res = xhr.responseText;
          console.log(res);
          M.toast({html: "User " + loginDetails.username + " created!"});
        } else {
          M.toast({html: "Problem is creating user " + loginDetails.username });
          }
      }

  }
  xhr.send(JSON.stringify(loginDetails));
}