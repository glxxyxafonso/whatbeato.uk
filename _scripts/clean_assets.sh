#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

mkdir -p /tmp/unused

function hasit {
    return `/bin/cat $2 | grep $1 | wc -l | bc`
}

function inuse {
    for p in $DIR/../_posts/*.markdown; do
        hasit $1 $p
        if [ $? -gt 0 ]
        then
            return 1
        fi
    done
    for p in $DIR/../*.md; do
        hasit $1 $p
        if [ $? -gt 0 ]
        then
            return 1
        fi
    done
    for p in $DIR/../_includes/*; do
        hasit $1 $p
        if [ $? -gt 0 ]
        then
            return 1
        fi
    done
    return 0
}

cd $DIR/../assets
for f in *; do
    inuse $f
    if [ $? == 0 ]
    then
        echo $f
        cp $DIR/../assets/$f /tmp/unused
    fi
done
