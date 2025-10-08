import * as fs from 'node:fs'
import path from 'path';
import inquirer from 'inquirer';
import { LINT_TYPES, TEMPLATE_TYPES } from '../utils/constants';
import { 
  validPackageName, 
  print,
  deleteDir,
  ejsRender,
} from '@durant/durant-tool';
import initTemplate from 'packages/durant-tool/src/initTemplate';
import { dirname } from "path";
import { fileURLToPath } from 'url';

const cwd = process.cwd();
let step = 0;
const __filename = fileURLToPath(import.meta.url);//获取文件的绝对路径
//D:\soul-ocean\vue3_monorepo\scripts\dev.js
const __dirname = dirname(__filename);

const inputProjectName = async(): Promise<string> => {
  const {projectName} = await inquirer.prompt({
    type: 'input',
    name: "projectName",
    message: `Step ${++step}. 请输入项目名称`
  })
  return projectName
}

const chooseTemplateType = async (): Promise<string> => {
  const { templateName } = await inquirer.prompt({
    type: 'list',
    name: 'templateName',
    message: `Step ${++step}. 请选择模板名称`,
    choices: TEMPLATE_TYPES,
  });
  return templateName;
};

const chooseLintTool = async () : Promise<string[]> => {
    const {lintRes} = await inquirer.prompt({
        type: 'checkbox',
        name: "lintRes",
        message: `Step ${++step}. 请选择要使用的lint工具`,
        choices: LINT_TYPES
    })
    return lintRes;
}

const confirmDelDir = async () : Promise<boolean> => {
    const {confirmDelete } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirmDelete',
    message: `Step ${++step}. 当前目录不是空目录，是否删除原有目录`,
    default: false,
  });

  return confirmDelete;
}

export async function init() {
    const config: Record<string, any> = {};

    print.theme('初始化');
    config.projectName = await inputProjectName();
    if (!validPackageName(config.projectName)) {
      print.error('项目名格式错误');
      process.exit(0);
    }
    config.templateName = await chooseTemplateType();
    config.lintArr = await chooseLintTool();
    console.log("🚀 ~ init ~ config:", config)


    const projectName = config.projectName;
    const pkg = { name: projectName, version: '0.0.0' }
    const root = path.join(cwd, projectName)
     if (fs.existsSync(root)) {
      const confirmDelete = await confirmDelDir();
      if (confirmDelete) {
        deleteDir(path.resolve(cwd, projectName));
      } else {
        print.warn('再考虑一下是否删除原有目录')
        process.exit(0);
      }
    }
    if (!fs.existsSync(root)) {
      fs.mkdirSync(root)
    }
    fs.writeFileSync(path.resolve(root, 'package.json'), JSON.stringify(pkg, null, 2))

    // 生成初始模板
    const templateRoot = path.resolve(__dirname, '../dist/template')
    const templateDir = path.resolve(templateRoot, config.templateName);
    initTemplate(templateDir, root);

    // ejs后缀文件，实现ejs变量替换
    ejsRender(root, {
      query: 222
    })

    print.success('项目初始化成功');
}