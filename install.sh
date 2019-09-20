#!/bin/bash
cp ./fix/aws/config ~/.aws/config
cp ./.ask/config.sample ./.ask/config
cd ./lambda/custom&&npm install

