#!/usr/bin/env node
import { print } from "@durant/durant-tool";
import { program } from 'commander';
import { init } from "./actions/init";
import { update } from "./actions/update";

// program
//   .version('1.0.0')
//   .description(
//     `durant的项目模板`,
//   );

program
  .command('init')
  .description('一键生成：初始化项目模板')
  .action(async () => {
    await init();
  });

program
  .command('update')
  .description('一键更新：更新到最新的配置')
  .action(async () => {
    await update();
  });

program
  .command('help')
  .description('帮助：常用命令，帮助快速上手')
  .action(async () => {
    const helpInfo = `
      durant-init init: template 名称 lint工具选择配置
      update: 
      pre-commit: scan + fix
      commit-message:
      durant-init help: 常用命令
    `;
    print.theme(helpInfo);
  });

program.parse(process.argv);
