import { expect } from 'chai';
import { OrbitalFactory } from '../../orbital-factory';
import { SubcommandCLI } from '../shared/cli/subcommand-cli';

describe('Subcommands', () => {
    it('should register subcommands', () => {
        const execution = () => {
            OrbitalFactory
                .bootstrap(SubcommandCLI)
                .execute(['subcommand', 'sub', 'hello']);
        };
        expect(execution)
            .to.throw('hello');
    });

    it('should recursively find all subsubcommands', () => {
        const execution = () => {
            OrbitalFactory
                .bootstrap(SubcommandCLI)
                .execute(['subcommand', 'sub', 'sub', 'bye']);
        };
        expect(execution)
            .to.throw('bye');
    });

    it('should make help for subcommands', () => {
        const execution = OrbitalFactory
            .bootstrap(SubcommandCLI)
            .execute(['subcommand', 'sub', 'sub', 'not']);

        expect(execution)
            .to.equal(false);
    });
});
