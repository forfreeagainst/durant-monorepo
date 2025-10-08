// 这个文件会帮我们打包 packages下的模块， 最终打包出js文件

// node dev.js （要打包的名字 -f 打包的格式） === argv.slice(2)

import minimist from "minimist";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import esbuild from "esbuild";
// node中的命令函参数通过process 来获取 process.argv
const args = minimist(process.argv.slice(2));

// esm 使用commonjs 变量
const __filename = fileURLToPath(import.meta.url); // 获取文件的绝对路径 file: -> /usr
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const target = args._[0] || "durant-tool"; // 打包哪个项目
const format = args.f || "iife"; // 打包后的模块化规范
console.log("🚀 ~ format:", format)

// 入口文件 根据命令行提供的路径来进行解析
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`);
const pkg = require(`../packages/${target}/package.json`);
// 根据需要进行打包

const cliArr = ['durant-init'];
if (cliArr.includes(target)) { // cli工具而已
  const entryCli = resolve(__dirname, `../packages/${target}/src/cli.ts`);
  esbuild
    .context({
      entryPoints: [entryCli], // 入口
      outfile: resolve(__dirname, `../packages/${target}/lib/${target}-cli.js`), // 出口
      bundle: true, // reactivity -> shared  会打包到一起
      platform: "node", // CLI 工具应该用 node 平台
      sourcemap: true, // 可以调试源代码
      format, // cjs esm iife
      globalName: pkg.buildOptions?.name,
      external: ["commander", "inquirer", "ejs"], // 将 commander 标记为外部依赖，重要：避免打包 commander
    })
    .then((ctx) => {
      console.log("cli工具 start dev");
      return ctx.watch(); // 监控入口文件持续进行打包处理
    });
} else {
  esbuild
  .context({
    entryPoints: [entry], // 入口
    outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`), // 出口
    bundle: true, // reactivity -> shared  会打包到一起
    platform: "node", // 这个项目以node环境为主，用于node工具包，
    sourcemap: true, // 可以调试源代码
    format, // cjs esm iife
    globalName: pkg.buildOptions?.name,
    external: ["ejs"],
  })
  .then((ctx) => {
    console.log("非cli工具 start dev");
    return ctx.watch(); // 监控入口文件持续进行打包处理
  });
}
