import { Command } from '../../../decorators/command';
import { Executable } from '../../../executable';
import { setClassMetadata } from '../../../reflection/class';

@Command({
    name: 'change-metadata'
})
export class ChangeMetadataCommand extends Executable {
    execute() {
        return true;
    }
}

setClassMetadata(ChangeMetadataCommand, { type: 'not-a-command' });
