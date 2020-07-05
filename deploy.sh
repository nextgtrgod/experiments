#!/usr/bin/env sh

echo 'Deploy started'

yarn build
git add build --force
git commit -m 'deploy'
git subtree push --prefix build origin gh-pages

echo 'Deployed: \033[1;32;4mhttps://nextgtrgod.github.io/experiments/\033[0m'
echo ''