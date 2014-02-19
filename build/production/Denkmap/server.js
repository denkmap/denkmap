var express = require('express'),
    geodata = require('./geoservice/geodata.js'),
    argv = require('optimist').argv,
    app = express(),
    port = process.env.PORT || argv.p || argv.port || 80;


app.get('/count', function(req, res) {
    console.log(req.method + ' request: ' + req.url);
    geodata.count(function(result) {
        res.send(result);
    });
});
app.get('/nearby/:lat,:lon', function(req, res) {
    console.log(req.method + ' request: ' + req.url);
    var lat = parseFloat(req.params.lat),
        lon = parseFloat(req.params.lon);
    geodata.nearby(lat, lon, function(docs) {
        res.send(docs);
    });
});
app.use("/", express.static(__dirname));

app.listen(port);
console.log('Listening on port ' + port + '...');
