import { OrbitalFactory } from '@orbital/core';
import { MultipleAliases } from './shared/cli/cli-with-multiple-aliases';
import { MultipleNames } from './shared/cli/cli-with-multiple-names';
import { expect } from 'chai';

// OMG: NO NO NO these are not fucking testing the command executor !!!
describe('Commands with Params', () => {
    it('should throw if there are multiple commands with same alias', () => {
        const factory = OrbitalFactory.bootstrap(MultipleAliases);
        expect(() => factory.execute(['good-cli', 'alpha']))
            .to.throw('CLI modules defines two commands with conflicting alias [a]\n\tbeta\n\talpha' );
    });

    it('should throw if there are multiple commands with same name', () => {
        const factory = OrbitalFactory.bootstrap(MultipleNames);
        expect(() => factory.execute(['good-cli', 'alpha']))
            .to.throw('CLI module defines two commands with the same name: alpha');
    });
});
