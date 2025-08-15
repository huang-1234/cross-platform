#!/bin/bash

# 同步模拟API数据

echo "开始同步模拟API数据..."

# 确保API mock服务器目录存在
API_DIR="./packages/api-mock"
if [ ! -d "$API_DIR" ]; then
  echo "错误: API mock目录不存在!"
  exit 1
fi

# 更新模拟数据
echo "更新模拟数据..."
cd $API_DIR
npm run update-mock-data

# 重启API服务器
echo "重启API服务器..."
npm run restart-server

echo "模拟API数据同步完成!"
