#!/bin/bash
cp ./fix/aws/config ~/.aws/config
cp ./fix/hooks/pre-commit ./.git/hooks/pre-commit
cd ./lambda/custom&&npm install

