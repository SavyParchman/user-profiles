const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const config = require('./config');

const port = 3000;

// <!~~~- APP DECLARATION -~~~>
const app = express();


var corsOptions = {
	origin: 'http://localhost:3000'
};

// <!~~~----- MIDDLEWARE ----~~~>
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));
app.use(session({
   secret: config.sessionSecret,
   saveUninitialized: true,
   resave: true  
}));

var userCtrl = require('./controllers/userCtrl.js');
var profileCtrl = require('./controllers/profileCtrl.js');

// <!~~~----- GET endpoints ----~~~>
app.get('/api/profiles', profileCtrl.getFriendsProfile)

// <!~~~----- PUT/POST endpoints ----~~~>
app.post('/api/login', userCtrl.login);


app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});