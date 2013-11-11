#!/bin/bash

# fail on first error
set -e

DIR=`dirname $0`

$DIR/install.sh

grunt lint --verbose
