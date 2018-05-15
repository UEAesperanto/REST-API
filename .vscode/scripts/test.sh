#!/bin/bash
docker exec -i uea-api-test bash -c \
    ./node_modules/mocha/bin/mocha \
        --exit  \
        --reporter landing \
        -t 10000 ./test