/**
 * 更新模拟数据脚本
 */
const fs = require('fs');
const path = require('path');

// 数据库文件路径
const dbPath = path.join(__dirname, '../data/db.json');

// 读取当前数据
let db;
try {
  const data = fs.readFileSync(dbPath, 'utf8');
  db = JSON.parse(data);
} catch (err) {
  console.error('读取数据库文件失败:', err);
  process.exit(1);
}

// 添加新的模拟数据
const timestamp = new Date().toISOString();

// 添加新产品
db.products.push({
  id: db.products.length + 1,
  name: `新产品 ${timestamp}`,
  price: Math.round(Math.random() * 1000) / 100,
  description: `这是在 ${timestamp} 添加的新产品`,
  image: "https://via.placeholder.com/150"
});

// 更新平台特性
db.platform_features["taro"] = [
  "多端编译",
  "React语法",
  "小程序兼容",
  "丰富的组件库"
];

// 写回数据库文件
try {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('模拟数据更新成功!');
} catch (err) {
  console.error('写入数据库文件失败:', err);
  process.exit(1);
}
