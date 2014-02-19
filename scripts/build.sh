#!/bin/bash

# fail on first error
set -e

function cleanup {
    exit $?
}

trap "cleanup" EXIT

DIR=`dirname $0`

$DIR/install.sh

grunt lint --verbose

if [[ $TRAVIS_BUILD_NUMBER ]] ; then
    sed -i "s/{BUILD_NR}/$TRAVIS_BUILD_NUMBER/" $DIR/../app/util/Config.js
    sed -i "s/{BUILD_NR}/$TRAVIS_BUILD_NUMBER/" $DIR/../build/production/Denkmap/app.js
fi

exit 0
