const express = require('express');
const bodyParser= require('body-parser');
const _ = require('lodash');
const app = express();

const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect('mongodb://admin:password123@ds135952.mlab.com:35952/skm-schelude', { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
    db = client.db('skm-schelude');
    app.listen(8000, () => {
        console.log('listening on 8000')
    })
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/css'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// CONSTS FOR SCHELUDE ID
const POLITECHNIKA_ZWYKLY = '5b854447e7179a43f9adfaf5';
const POLITECHNIKA_SOBOTA = '5b87e567e7179a7a8ccd1c20';
const POLITECHNIKA_NIEDZIELA = '5b8811fee7179a7a8ccd3af9';

const WRZESZCZ_ZWYKLY = '5b871f67e7179a3d428eec8c';

const GDANSK_GLOWNY_ZWYKLY = '5b87b252e7179a7a8ccd05fe';

const STOCZNIA_ZWYKLY = '5b87d5d7e7179a7a8ccd1437';

// HELPER FUNCTION TO FIND SCHELUDE BY ID

const filterDataByID = (data, searchedID) => {
    return _.findKey(data, (value) => {
        if((value._id).toString() === searchedID){
            return true
        }
    })
};

// ROUTES HEREEEEEEEEEEE
app.get('/result/politechnika', function (req, res) {
    db.collection("schelude").find().toArray(function(err, data) {
        res.send(data[filterDataByID(data, POLITECHNIKA_ZWYKLY)]);
    });
});

app.get('/result/politechnika/sobota', function (req, res) {
    db.collection("schelude").find().toArray(function(err, data) {
        res.send(data[filterDataByID(data, POLITECHNIKA_SOBOTA)]);
    });
});

app.get('/result/politechnika/niedziela', function (req, res) {
    db.collection("schelude").find().toArray(function(err, data) {
        res.send(data[filterDataByID(data, POLITECHNIKA_NIEDZIELA)]);
    });
});

app.get('/result/wrzeszcz', function (req, res) {
    db.collection("schelude").find().toArray(function(err, data) {
        res.send(data[filterDataByID(data, WRZESZCZ_ZWYKLY)]);
    });
});

app.get('/result/glowny', function (req, res) {
    db.collection("schelude").find().toArray(function(err, data) {
        res.send(data[filterDataByID(data, GDANSK_GLOWNY_ZWYKLY)]);
    });
});

app.get('/result/stocznia', function (req, res, next) {
    db.collection("schelude").find().toArray(function(err, data) {
        res.send(data[filterDataByID(data, STOCZNIA_ZWYKLY)]);
    });
});

// ROOT WILL REMAIN FOR FUTURE PURPOSES
app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    res.send(db.collection('schelude').find().toArray(function(err, results) {
        return results;
    }))
});

// POST WILL REMAIN FOR FUTURE PURPOSES
app.post('/schelude', (req, res) => {
    db.collection('schelude').save(req.body, (err) => {
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/')
    })
});