#!/usr/bin/env bash
echo "Saving to pod"
FILE=docker/s3/data
localstack pod save file://${FILE}
