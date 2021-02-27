// node index - Start command
// http://localhost:8080/

const path = require('path');
var express = require('express');
let app = express();
var port = process.env.PORT || 8080;

app.use(express.urlencoded());
app.use(express.json());

var temperature = require('./routes/getTemperatures');
var insertTemp = require('./routes/setTemperature');
var humidity = require('./routes/getHumidities');
var insertHumidity = require('./routes/setHumidity');

app.use('/api/getTemperatures', temperature);
app.use('/api/insertTemperature', insertTemp);
app.use('/api/getHumidities', humidity);
app.use('/api/insertHumidity', insertHumidity);

app.get('/', function(req,res) {
    console.log("Visitor arrived");
    res.sendFile(path.join(__dirname+'/static/index.html'));
});

app.get('/static/bundle.js', function(req,res) {
    console.log("Visitor wants js file");
    res.sendFile(path.join(__dirname+'/static/bundle.js'));
});

app.get('/api', (req, res) =>
    res.send
        (
        ` </br> </br>
        <h2>Welcome to the API</h2> </br>
        This API has these functions: </br>
        
        </br>
        <h3>Get data from database:</h3> </br>
        <a href="api/getTemperatures"> /api/getTemperatures </a> - get all temperatures from the database </br>
        <a href="api/getHumidities"> /api/getHumidities </a> - get all humidities from the database </br>
        
        </br>
        <h3>Insert data to database:</h3> </br>
        /api/insertTemperature - insert temperature with JSON insert </br>
        /api/insertHumidity - insert humidity with JSON insert </br>
        `
        )
);

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});