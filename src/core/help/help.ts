import { CommandInstance } from '../command/command-instance';
import { CLIMetadata } from '../decorators/cli';
import { generateCommandUsage } from './util';

export class HelpGenerator {
    constructor(
        private cli: CLIMetadata,
        private commands: CommandInstance[]) { }

    generateGlobalDocs(): void {
        console.log('This is the auto-generated help for the Nest CLI.\n' +
            'For help understanding these docs, go to ' +
            'https://www.orbital.io/docs/understanding-orbital-documentation.\n');
        for (const command of this.commands) {
            console.log(generateCommandUsage(this.cli.name || '', command));
        }
    }
}
