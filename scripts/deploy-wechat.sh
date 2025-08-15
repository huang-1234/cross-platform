#!/bin/bash

# 微信小程序自动上传脚本

echo "开始部署微信小程序..."

# 检查微信开发者工具CLI是否可用
if ! command -v cli &> /dev/null; then
  echo "错误: 微信开发者工具CLI未安装或未添加到PATH!"
  exit 1
fi

# 小程序项目路径
MINIAPP_PATH="./apps/wechat-miniapp"
if [ ! -d "$MINIAPP_PATH" ]; then
  echo "错误: 微信小程序目录不存在!"
  exit 1
fi

# 构建小程序
echo "构建小程序..."
cd $MINIAPP_PATH
npm run build

# 上传代码
echo "上传代码到微信平台..."
cli upload --project "$MINIAPP_PATH" \
  --version "$(node -p "require('./package.json').version")" \
  --desc "自动部署 - $(date +'%Y-%m-%d %H:%M')"

echo "微信小程序部署完成!"
