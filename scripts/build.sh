#!/bin/bash

# fail on first error
set -e

DIR=`dirname $0`

$DIR/install.sh

grunt lint --verbose

if [[ $TRAVIS_BUILD_NUMBER ]] ; then
    sed -i "s/{BUILD_NR}/$TRAVIS_BUILD_NUMBER/" $DIR/app/util/Config.js     
fi
