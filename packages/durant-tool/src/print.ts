import chalk from 'chalk';

const log = console.log;
const theme = chalk.blue;
const red = chalk.red.bold;
const green = chalk.green;
const yellow = chalk.yellow;

export default {
    theme(text: string) {
        log(theme(text))
    },
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
