#!/usr/bin/env sh

echo 'Deploy started'

yarn build
git add build --force
git commit -m 'deploy'
git push origin `git subtree split --prefix build master`:gh-pages --force

echo 'Deployed: \033[1;32;4mhttps://nextgtrgod.github.io/experiments/\033[0m'
echo ''