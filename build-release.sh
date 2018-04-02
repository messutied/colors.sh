#!/bin/sh

set -ex

yarn prod:build
git stash
cp -r dist ${TMPDIR}dist
git checkout gh-pages
git pull
rm *.js
mv ${TMPDIR}dist/* .
