#!/bin/sh

set -ex

yarn prod:build
git stash
rm -rf ${TMPDIR}dist
cp -r dist ${TMPDIR}
git checkout gh-pages
git pull
rm *.js
rm *.js.gz
mv ${TMPDIR}dist/* .
