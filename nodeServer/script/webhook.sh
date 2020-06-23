#!/bin/bash
WEB_PATH='E:/user/doc/webhook_test'


echo "开始执行shell"
cd $WEB_PATH
echo "pulling source code..."
git pull
echo "changing permissions..."
#chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
echo " git pull 完成. 开始 build"
npm run docs:build
echo "build 完成"