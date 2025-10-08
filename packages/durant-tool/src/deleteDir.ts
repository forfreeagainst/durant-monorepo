import * as fs from 'node:fs'

// 选型 create-vue 等脚手架，采用后序遍历删除
// 历史原因：在 Node.js 14 之前这是标准做法
// 可控性：可以精确控制删除过程
// 兼容性：支持更老的 Node.js 版本

function deleteDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }

  // Node.js 14.14.0+ 推荐方式
  // 要处理.git 一下，不要乱删除。
  fs.rmSync(dir, {
    recursive: true,
    force: true,
    maxRetries: 3
  })
}

export default deleteDir;