import { Command } from '../../../decorators/command';
import { SubcommandGroup } from '../../../decorators/subcommand-group';
import { Executable } from '../../../executable';

@Command({
    name: 'bye'
})
export class MyGoodbyeCommand extends Executable {
    execute() {
        throw new Error('goodbye');
    }
}

// tslint:disable-next-line:max-classes-per-file
@SubcommandGroup({
    name: 'sub',
    declarations: [
        MyGoodbyeCommand
    ]
})
export class MySubSubcommand { }
