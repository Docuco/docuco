#!/usr/bin/env bash
echo "Saving to pod"
FILE=docker/localstack/data
localstack pod save file://${FILE}
