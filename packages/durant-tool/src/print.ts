import chalk from 'chalk';

const log = console.log;
const red = chalk.red.bold;
const green = chalk.green;
const yellow = chalk.yellow;

export default {
    // 成功信息
    success(text: string) {
        log(green(text));
    },
    // 警告信息
    warn(text: string) {
        log(yellow(text));
    },
    // 错误信息
    error(text: string) {
        log(red(text));
    },
}