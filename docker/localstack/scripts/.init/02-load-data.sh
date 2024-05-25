#!/usr/bin/env bash
echo "Restoring from pod"
FILE=docker/s3/data
if test -f "$FILE"; then
  localstack pod load file://${FILE}
else
  echo "No pod state found"
fi