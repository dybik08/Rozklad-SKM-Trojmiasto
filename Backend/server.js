const express = require('express');
const bodyParser= require('body-parser')
const app = express();

const MongoClient = require('mongodb').MongoClient

let db

MongoClient.connect('mongodb://admin:password123@ds135952.mlab.com:35952/skm-schelude', { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
    db = client.db('skm-schelude')
    app.listen(8000, () => {
        console.log('listening on 8000')
    })
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/css'))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


app.get('/result/politechnika', function (req, res, next) {
    db.collection("schelude").find().toArray(function(err, data) {

        res.send(data[0]);
    });

});

app.get('/result/wrzeszcz', function (req, res, next) {
    db.collection("schelude").find().toArray(function(err, data) {

        res.send(data[1]);
    });

});

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    res.send(db.collection('schelude').find().toArray(function(err, results) {
        return results;
    }))
})

app.post('/schelude', (req, res) => {
    db.collection('schelude').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
});