#!/bin/bash
set -e

DIR=`dirname $0`

if [[ -z $TRAVIS ]] ; then
    # Download Sencha Touch 2.3
    wget http://cdn.sencha.com/touch/sencha-touch-2.3.0-gpl.zip
    unzip sencha-touch-2.3.0.gpl.zip
fi

# Download LeafletMap extension
wget -P $DIR/../ux https://raw.github.com/tschortsch/Ext.ux.LeafletMap/f541eb2d69faf1ba3b40b3964208b1e8f05c9652/ux/LeafletMap.js 

# Install dependencies
npm install -g grunt-cli
npm install
