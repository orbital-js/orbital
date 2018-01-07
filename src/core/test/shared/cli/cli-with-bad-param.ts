import { CLI } from '@orbital/core';
import { CommandWithBadDecorator } from '../commands/command-with-bad-param';

@CLI({
    name: 'test-cli',
    commands: [CommandWithBadDecorator],
})
export class CLIWithBadParam { }
