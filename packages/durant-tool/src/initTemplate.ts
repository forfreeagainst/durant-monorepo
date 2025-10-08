import * as fs from 'node:fs'
import * as path from 'node:path'

function initTemplate(src:string, dest:string) {
  const stats = fs.statSync(src)

  if (stats.isDirectory()) {
    // skip node_module
    if (path.basename(src) === 'node_modules') {
      return
    }
    
    // if it's a directory, render its subdirectories and files recursively
    fs.mkdirSync(dest, { recursive: true })
    for (const file of fs.readdirSync(src)) {
      initTemplate(path.resolve(src, file), path.resolve(dest, file))
    }
    return
  }

  fs.copyFileSync(src, dest)
}

export default initTemplate
