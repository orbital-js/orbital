import chalk from 'chalk';

export class Logger {

    private prefix: string;

    constructor(
        private context: string,
    ) {
        this.prefix = chalk.bold(chalk.blue('[' + context + ']') + ' ');
    }

    log(message: string) {
        console.log(this.prefix, message);
    }

    warn(message: string) {
        console.log(this.prefix, chalk.yellow(message));
    }

    error(message: string) {
        console.log(this.prefix, chalk.red(message));
    }

    info(message: string) {
        console.log(this.prefix, chalk.green(message));
    }
}
