#!/bin/bash
if [ -z $BUILD_DIR -a -z $SOURCE_DIR ] ; then
   echo "You need to specify the BUILD_DIR and SOURCE_DIR environment variable."
   exit 1
fi

mkdir $BUILD_DIR
echo "Development build... copying files from $SOURCE_DIR to $BUILD_DIR"
cp -r $SOURCE_DIR/* $BUILD_DIR
cp -r $SOURCE_DIR/.sencha $BUILD_DIR
rm $BUILD_DIR/package.json
