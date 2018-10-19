require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
const path = require('path');
const mongodb = require('mongodb');
const uuid = require('uuid/v4');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/test", { native_parser: true });



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));

// routes
app.use('/users', require('./controllers/users.controller'));

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});




// ***********************************
// let db;
const GAMETYPE = 'game1_train';

// mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
//     if (err) {
//         console.log(err);
//         process.exit(1);
//     }

//     // Save database object from the callback for reuse.
//     db = client.db();
//     console.log("Database connection ready");
// });

const users = {};


app.use(express.static(path.join(__dirname, '/home/renil/github/crs/Kraken/client/src/app/home/Game/public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, `/home/renil/github/crs/Kraken/client/src/app/home/Game/instr_${GAMETYPE}.html`)));

app.get('/game', (req, res) => res.sendFile(path.join(__dirname, `/home/renil/github/crs/Kraken/client/src/app/home/Game/${GAMETYPE}.html`)));

app.get('/questions', (req, res) => res.sendFile(path.join(__dirname, '/home/renil/github/crs/Kraken/client/src/app/home/Game/questions.html')));

app.post('/game', (req, res) => {
    const id = uuid();
    const obj = { id: id, plan: req.body.path.map(step => { return { action: step.Action, explain: step.explain } }), mapId: req.body.mapId, planTime: req.body.path.reduce((sum, step) => step.time ? sum + parseInt(step.time) : sum, 0), planSize: req.body.path.length };
    users[id] = obj;
    res.send(id);
});

app.post('/questions', (req, res) => {
    console.log(req.body.id);
    if (users[req.body.id]) {
        const obj = { id: req.body.id, mapId: users[req.body.id].mapId, plan: users[req.body.id].plan, planSize: users[req.body.id].planSize, planTime: users[req.body.id].planTime, answers: req.body.answers };
        console.log(obj);
        delete users[req.body.id];

        db.collection(GAMETYPE).insertOne(obj, (err, doc) => {
            if (err) throw err;
            res.send('Submission received');
        });
    }

});