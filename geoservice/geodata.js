var dbUrl = "denkmap",
    coll = ["wfsktzh"],
    db = require("mongojs").connect(dbUrl, coll);

exports.count = function(callbackFn) {
    db.wfsktzh.runCommand('count', function(err, res) {
        callbackFn(res);
    });
}

exports.nearby = function(lat, lon, callbackFn) {
    db.wfsktzh.find({
        geometry: {
            $near: { 
                $geometry : {
                    type: "Point",
                    coordinates: [lon, lat]
                },
                $maxDistance: 1000
            }
        }
    },
    function(err, res) {
        callbackFn(res);
    });
}
