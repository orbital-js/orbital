import { CLI } from '@orbital/core';
import { CommandWithOption } from '../commands/command-with-options';
import { CommandWithParam } from '../commands/command-with-param';
import { Executable } from '../../../interfaces/executable';

@CLI({
    name: 'good-cli',
    commands: [
        CommandWithOption,
        CommandWithParam,
    ],
})
export class GoodCLI { }
