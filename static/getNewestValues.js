// browserify getNewestTemperatures.js -o bundle.js 
// this needs to be run everytime changes are made because nodejs doesn't
// like requiring on client side.


async function getPage(url) { // get results
    const axios = require('axios');

    return axios({
            url: url,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
       .then(res => res) // return results
       .catch (err => console.error(err))
}

async function setTemperature(url) { // set's temperatures to the temperature table
    var temperatures = await getPage(url)
    var tenNewest = [];
    var limit = temperatures.data.length - document.getElementById("numberOfResults").value;
    var id = 1;

    for (let i = temperatures.data.length-1; limit <= i; i--) { // get wanted amount of newest temperatures
        var data = temperatures.data[i];
        tenNewest.push({"id": id, "board": data.Board, "temperature": data.Temperature, "time": data.DateTime});
        id++;
    }

    var tbody = document.getElementById('temperatureBody');

    for (var i = 0; i < tenNewest.length; i++) { // set temperatures to the table
        var tr = "<tr>";
    
        tr += "<th scope='row'>" + tenNewest[i].id + "</th>" + "<td>" + tenNewest[i].board + "</td>" + "<td>" + tenNewest[i].temperature + "°C</td>" + "<td>" + tenNewest[i].time +  "</td></tr>";
    
        tbody.innerHTML += tr;
    }
}

async function setHumidities(url) { // set's humidities to the humidities table
    var humidities = await getPage(url)
    var tenNewest = [];
    var limit = humidities.data.length - document.getElementById("numberOfResults").value;
    var id = 1;

    for (let i = humidities.data.length-1; limit <= i; i--) { // get wanted amount of newest humidities
        var data = humidities.data[i];
        tenNewest.push({"id": id, "board": data.Board, "humidity": data.Humidity, "time": data.DateTime});
        id++;
    }

    var tbody = document.getElementById('humitidyBody');

    for (var i = 0; i < tenNewest.length; i++) { // set humidities to the table
        var tr = "<tr>";
    
        tr += "<th scope='row'>" + tenNewest[i].id + "</th>" + "<td>" + tenNewest[i].board + "</td>" + "<td>" + tenNewest[i].humidity + "%</td>" + "<td>" + tenNewest[i].time +  "</td></tr>";
    
        tbody.innerHTML += tr;
    }
}

async function checkChanges() { // checks changes and clears tables for new values
    var temperatureUrl = window.location.href + 'api/getTemperatures';
    var humidityUrl = window.location.href + 'api/getHumidities';

    var tbody = document.getElementById('humitidyBody'); tbody.innerHTML = "";
    tbody = document.getElementById('temperatureBody');  tbody.innerHTML = "";

    setTemperature(temperatureUrl);
    setHumidities(humidityUrl);
}

checkChanges();

// if number of wanted results is changed refresh tables to get how much is wanted
document.getElementById('numberOfResults').onchange = function () {
    checkChanges();
}

setInterval(function() { // refresh tables every 60sec
    checkChanges();
}, 60000);