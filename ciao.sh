#!/bin/sh

git tag v$1 $1
git tag -d $1
git push origin v$1 :$1