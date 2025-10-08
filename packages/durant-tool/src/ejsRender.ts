import ejs from 'ejs'
import * as fs from 'node:fs'
import * as path from 'node:path'

function preOrderDirectoryTraverse(dir, dirCallback, fileCallback) {
  for (const filename of fs.readdirSync(dir)) {
    if (filename === '.git') {
      continue
    }
    const fullpath = path.resolve(dir, filename)
    if (fs.lstatSync(fullpath).isDirectory()) {
      dirCallback(fullpath)
      // in case the dirCallback removes the directory entirely
      if (fs.existsSync(fullpath)) {
        preOrderDirectoryTraverse(fullpath, dirCallback, fileCallback)
      }
      continue
    }
    fileCallback(fullpath)
  }
}

function ejsRender(root, dataStore = {}) {
    preOrderDirectoryTraverse(
      root,
      () => {},
      (filepath) => {
        if (filepath.endsWith('.ejs')) {
          const template = fs.readFileSync(filepath, 'utf-8')
          const dest = filepath.replace(/\.ejs$/, '')

          const content = ejs.render(template, dataStore)
          fs.writeFileSync(dest, content)
          fs.unlinkSync(filepath)
        }
      },
    )
}

export default ejsRender;