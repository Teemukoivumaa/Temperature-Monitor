var express = require('express'),
    router = express.Router();

// --
var MongoClient = require('mongodb').MongoClient;
const uri = "secretKey"
// --

router
    .get('/', function (req, res) {
        MongoClient.connect(uri, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Measurements");

            dbo.collection("humidity").find({}).toArray(function (err, result) {
                if (err) throw err;
                res.send(result);
                db.close();
            });
        });
    })

module.exports = router;
