#!/bin/bash

# fail on first error
set -e

function cleanup {
    exit $?
}

trap "cleanup" EXIT

DIR=`dirname $0`

# Import GeoJSON in MongoDB
mongo denkmap --eval "db.wfsktzh.remove()"
mongoimport --db denkmap --collection wfsktzh < $DIR/../resources/remote/denkmal_mongodb.geojson
mongo denkmap --eval "db.wfsktzh.ensureIndex({geometry: '2dsphere'})"

exit 0
