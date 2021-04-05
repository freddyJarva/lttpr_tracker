#!/bin/bash

# create temp folder with necessary
cp -R ./public /tmp/lttpr_tracker

# Remove beginning / to make the app search for dependencies relative to index.html file path
sed -i '' 's/\/favicon.png/favicon.png/g' /tmp/lttpr_tracker/index.html
sed -i '' 's/\/global.css/global.css/g' /tmp/lttpr_tracker/index.html
sed -i '' 's/\/build\/bundle.css/build\/bundle.css/g' /tmp/lttpr_tracker/index.html
sed -i '' 's/\/build\/bundle.js/build\/bundle.js/g' /tmp/lttpr_tracker/index.html

pushd /tmp
zip -r lttpr_tracker.zip ./lttpr_tracker
popd
mv /tmp/lttpr_tracker.zip ./
