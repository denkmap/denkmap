#!/bin/bash
set -e

function cleanup {
    exit $?
}

trap "cleanup" EXIT

DIR=`dirname $0`

# if [[ -z $TRAVIS ]] ; then
#     # Download Sencha Touch 2.3
#     wget http://cdn.sencha.com/touch/sencha-touch-2.3.0-gpl.zip
#     unzip sencha-touch-2.3.0.gpl.zip
# fi

# Download LeafletMap extension
wget -P $DIR/../ux https://raw.github.com/tschortsch/Ext.ux.LeafletMap/f541eb2d69faf1ba3b40b3964208b1e8f05c9652/ux/LeafletMap.js 

# Download Denkmal GeoJSON
wget -P $DIR/../resources/remote https://dl.dropboxusercontent.com/u/138759/denkmal.geojson
wget -P $DIR/../resources/remote https://dl.dropboxusercontent.com/u/138759/denkmal_mongodb.geojson

# Install dependencies
npm install
bower install

# Install MondoDB
apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee -a /etc/apt/sources.list.d/10gen.list
apt-get -y update
apt-get -y install mongodb-10gen

easy_install pymongo
git clone https://github.com/10gen-labs/sleepy.mongoose.git $DIR/../sleepy.mongoose

# Import GeoJSON in MongoDB
mongo denkmap --eval "db.wfsktzh.remove()"
mongoimport --db denkmap --collection wfsktzh < $DIR/resources/remote/denkmal_mongodb.geojson
mongo denkmap --eval "db.wfsktzh.ensureIndex({geometry: '2dsphere'})"

exit 0
