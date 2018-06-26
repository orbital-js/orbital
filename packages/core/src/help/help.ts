import { MappedCommands, MappedSubcommands } from '../command/mapped-commands';
import { CLIMetadata } from '../decorators/cli';
import { tern } from '../util/util';
import { generateCommandUsage } from './util';

export class HelpGenerator {
    constructor(
        private cli: CLIMetadata,
        private map: MappedCommands) { }

    generateGlobalDocs(): boolean {
        console.log('This is the auto-generated help for ' +
            tern(this.cli.prettyName, tern(this.cli.name, '')) + '.\n' +
            'For help understanding these docs, go to ' +
            'https://www.orbital.io/docs/understanding-orbital-documentation.\n');
        const name = tern(this.cli.name, '');
        for (const command of this.map.commands) {
            console.log(generateCommandUsage(name, command));
        }

        for (const subcommands of this.map.subcommands) {
            this.generateForSubcommands(subcommands, name + ' ' + subcommands.name);
        }

        return true;
    }

    generateForSubcommands(subcommands: MappedSubcommands, prevName = '') {
        for (const command of subcommands.mappedCommands.commands) {
            const name = tern(prevName, '' as string);
            console.log(generateCommandUsage(name, command));
        }
        for (const subcommand of subcommands.mappedCommands.subcommands) {
            prevName = prevName + ' ' + subcommand.name;
            this.generateForSubcommands(subcommand, prevName);
        }
    }
}
