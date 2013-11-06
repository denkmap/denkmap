#!/bin/bash
if [ -z $CI_HOME ] ; then
   echo "You need to specify the CI_HOME environment variable."
   exit 1
fi

yes | heroku keys:add
heroku keys:add $CI_HOME/ssh_pub_keys/id_rsa_odi.pub
