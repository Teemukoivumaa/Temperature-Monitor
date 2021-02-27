var express = require('express'),
    router = express.Router();

var moment = require('moment')
// --
var MongoClient = require('mongodb').MongoClient;
const uri = "secretKey"
// --

var newTemperatures = 0;

router
    .post('/', function (req, res) {
        let dateNow = moment().format('YYYY-MM-DD hh:mm:ss');

        var dataInsert = {
            Board: req.body.Board,
            Temperature: req.body.Temperature,
            DateTime: dateNow
        };

        MongoClient.connect(uri, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Measurements");

            dbo.collection("temperature").insertOne(dataInsert, function (err, res) {
                if (err) throw err;
                newTemperatures++;
                console.log(newTemperatures+ " temperatures inserted.");
                db.close();
            });
        });
    })

module.exports = router;
