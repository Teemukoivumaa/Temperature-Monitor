var express = require('express'),
    router = express.Router();

var moment = require('moment')
// --
var MongoClient = require('mongodb').MongoClient;
const uri = "secretKey"
// --

var newHumidities = 0;

router
    .post('/', function (req, res) {
        let dateNow = moment().format('YYYY-MM-DD hh:mm:ss');

        var dataInsert = {
            Board: req.body.Board,
            Humidity: req.body.Humidity,
            DateTime: dateNow
        };

        MongoClient.connect(uri, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Measurements");

            dbo.collection("humidity").insertOne(dataInsert, function (err, res) {
                if (err) throw err;
                newHumidities++;
                console.log(newHumidities+" humidities inserted.");
                db.close();
            });
        });
    })

module.exports = router;
