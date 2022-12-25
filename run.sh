#!/bin/bash
# This script will only work on the local machine. It will load the token from the parent directory and call the bot with the appropriate environment variables for nodejs.

export TOKEN=$(cat ../token.txt)

node bot.js 


