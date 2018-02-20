#!/bin/bash

set -ex

yarn prod:build
now ./dist
