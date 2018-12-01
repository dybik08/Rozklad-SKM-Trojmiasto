const express = require('express');
const bodyParser= require('body-parser');
const _ = require('lodash');
const app = express();
const ObjectId = require('mongodb').ObjectId;

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

// Object with scheludes

const SCHELUDES = {
    Stocznia: '5b87d5d7e7179a7a8ccd1437',
    Politechnika: '5b854447e7179a43f9adfaf5',
    Politechnikasobota: '5b87e567e7179a7a8ccd1c20',
    Politechnikaniedziela: '5b8811fee7179a7a8ccd3af9',
    Wrzeszcz: '5b871f67e7179a3d428eec8c',
    Wrzeszczsobota: '5b89372ce7179a25a0bb8f3d',
    Wrzeszczniedziela: '5b893f02e7179a25a0bb927b',
    Glowny: '5b87b252e7179a7a8ccd05fe',
    Zaspa: '5c027e46fb6fc038cbb0a395',
    Zaspasobota: '5c027f7bfb6fc038cbb0a3e5',
    Zaspaniedziela: '5c027fdbfb6fc038cbb0a414'
};

// helper function to find schelude by id(using Schelude object above)

const filterDataByObjectID = (id, SCHELUDES) => {
    return _.find(SCHELUDES, (value, key) => {
        if(id === key){
            return true
        }
    });
};

// fineOne desired schelude

findOne = function (req, res) {
    const {id} = req.params;
    db.collection("schelude").find(ObjectId(filterDataByObjectID(id, SCHELUDES))).toArray(function(err, data) {
        res.send(data);
    });
};

//Universal route here

app.get('/result/:id', findOne);

// ROOT WILL REMAIN FOR FUTURE PURPOSES
app.get('/', (req, res) => {
    res.send(db.collection('schelude').find().toArray(function(err, results) {
        return results;
    }))
});

// POST WILL REMAIN FOR FUTURE PURPOSES
app.post('/schelude', (req, res) => {
    db.collection('schelude').save(req.body, (err) => {
        if (err) return console.log(err);
        res.redirect('/')
    })
});