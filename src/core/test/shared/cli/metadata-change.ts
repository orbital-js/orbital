import { CLI } from '../../../decorators/cli';
import { ChangeMetadataCommand } from '../commands/command-metadata-change';

@CLI({
    name: 'metadata-change',
    declarations: [
        ChangeMetadataCommand
    ]
})
export class ChangeMetadataCLI { }
