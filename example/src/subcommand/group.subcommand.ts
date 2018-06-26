import { SubcommandGroup } from '../../../src/core';
import { MainCommand } from './main.command';

@SubcommandGroup({
    name: 'sub',
    declarations: [
        MainCommand
    ]
})
export class GroupSubcommand { }
