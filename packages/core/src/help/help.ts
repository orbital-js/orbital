import * as _ from 'lodash';
import { MappedCommands, MappedSubcommands } from '../command/mapped-commands';
import { CLIMetadata } from '../decorators/cli';
import { generateCommandUsage } from './util';

export class HelpGenerator {
    constructor(
        private cli: CLIMetadata,
        private map: MappedCommands
    ) { }

    generateGlobalDocs(): boolean {
        console.log(this.cli.config!.helpMessage + '\n');

        const name = _.defaultTo(this.cli.name, '');
        for (const command of this.map.commands) {
            console.log(generateCommandUsage(name, command));
        }

        for (const subcommands of this.map.subcommands) {
            this.generateForSubcommands(subcommands, name + ' ' + subcommands.name);
        }

        return true;
    }

    generateForSubcommands(subcommands: MappedSubcommands, prevName: string) {
        for (const command of subcommands.mappedCommands.commands) {
            const name = _.defaultTo(prevName, '' as string);
            console.log(generateCommandUsage(name, command));
        }
        for (const subcommand of subcommands.mappedCommands.subcommands) {
            prevName = prevName + ' ' + subcommand.name;
            this.generateForSubcommands(subcommand, prevName);
        }
    }
}
