 // Module dependencies.
var express = require('express');

var app = express();

// Configuration
app.configure( function() {
});

// Routes
app.get('/', function(req, res) {
    res.send("<center>"+"<h1>"+'Welcome to our  Elysion online order web site.'+"<br/>"+"</h1>"+"<br/>"+
'We offer some restaurant’s information such as address, menus and rating about how many people like them. You can also choose what you like and to order their food by using our web site. Our aim is to give you convenience, safe and better food.'+"<br/>"+"<br/>"+'<a href =http://localhost:3002/blog/new >'+'enter home'+'</a>'+"</center>");
});

app.listen(3000);
