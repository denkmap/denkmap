var dbUrl = "denkmap";
var coll = ["wfsktzh"]

var db = require("mongojs").connect(dbUrl, coll);

db.wfsktzh.runCommand('count', function(err, res) {
    console.log(res);
});

db.wfsktzh.find({
	geometry: {
        $near: { 
            $geometry : {
                type: "Point",
                coordinates: [8.531112, 47.34429]
            },
            $maxDistance: 500
        }
    }
}).forEach(function(err, doc) {
    if (!doc) {
	process.exit(0)
    }
    console.log(doc);
});

