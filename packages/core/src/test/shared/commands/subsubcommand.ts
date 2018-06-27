import { Command, Executable, Param, SubcommandGroup } from '../../../';

@Command({
    name: 'bye'
})
export class MyGoodbyeCommand extends Executable {
    execute(
        @Param({}) hi = 'goodbye'
    ) {
        throw new Error(hi);
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
