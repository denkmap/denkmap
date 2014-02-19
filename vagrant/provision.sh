#!/bin/bash
set -e

function cleanup {
    exit $?
}

trap "cleanup" EXIT


echo "add needed PPAs"
sudo apt-get update
sudo apt-get install python-software-properties python g++ make -y
sudo add-apt-repository ppa:chris-lea/node.js
apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
if grep -vFxq "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" /etc/apt/sources.list.d/*
then
    echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee -a /etc/apt/sources.list.d/10gen.list
fi

echo "updating the package manager"
sudo apt-get update
sudo apt-get install git vim curl nodejs mongodb-10gen -y
curl -s -L https://www.npmjs.org/install.sh > npm-install-$$.sh
sudo clean=no sh npm-install-$$.sh
rm npm-install-$$.sh
sudo npm install -g bower
sudo npm install -g forever

# Download LeafletMap extension
wget -q -O /vagrant/ux/LeafletMap.js https://raw.github.com/tschortsch/Ext.ux.LeafletMap/f541eb2d69faf1ba3b40b3964208b1e8f05c9652/ux/LeafletMap.js 

# Download Denkmal GeoJSON
wget -q -O /vagrant/resources/remote/denkmal.geojson https://dl.dropboxusercontent.com/u/138759/denkmal.geojson
wget -q -O /vagrant/resources/remote/denkmal_mongodb.geojson https://dl.dropboxusercontent.com/u/138759/denkmal_mongodb.geojson

# Install dependencies
cd /vagrant && npm install
cd /vagrant && bower install --allow-root

# Import GeoJSON in MongoDB
mongo denkmap --eval "db.wfsktzh.remove()"
mongoimport --db denkmap --collection wfsktzh < /vagrant/resources/remote/denkmal_mongodb.geojson
mongo denkmap --eval "db.wfsktzh.ensureIndex({geometry: '2dsphere'})"

# start node web server
forever stopall || true
forever start /vagrant/server.js -p 80
forever list

exit 0
