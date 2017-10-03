#!/usr/bin/env bash

(cd _backend/; exec yarn start) & (cd _frontend/; exec yarn start)
