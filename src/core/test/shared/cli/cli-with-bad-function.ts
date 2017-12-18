import { CLI, Command, Executable } from '@orbital/core';

import { CommandWithBadDecorator } from '../commands/command-with-bad-param';
import { K } from '../class';

@CLI({
    name: 'test-cli',
    commands: [CommandWithBadDecorator]
})
export class CLIWithBadParam { }
