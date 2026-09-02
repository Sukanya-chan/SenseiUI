#!/usr/bin/env bash
set -e
npm install
npm run build:linux
echo "Build artifacts are in the dist/ directory."

