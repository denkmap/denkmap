#!/bin/bash

# fail on first error
set -e

function cleanup {
    exit $?
}

trap "cleanup" EXIT

DIR=`dirname $0`

# Import GeoJSON in MongoDB
mongo ds033579.mongolab.com:33579/heroku_app19398124 --eval "db.wfsktzh.remove()"
mongoimport --host ds033579.mongolab.com --port 33579 --db heroku_app19398124 --collection wfsktzh < $DIR/../resources/remote/denkmal_mongodb.geojson
mongo ds033579.mongolab.com:33579/heroku_app19398124 --eval "db.wfsktzh.ensureIndex({geometry: '2dsphere'})"

exit 0
