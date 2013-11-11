#!/bin/bash

APP_NAME="denkmap"

echo $APP_NAME | heroku apps:destroy $APP_NAME
heroku apps:create $APP_NAME

git push -f heroku master
