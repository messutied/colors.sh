#!/bin/bash

set -ex

yarn prod:build
(cd dist && now)
