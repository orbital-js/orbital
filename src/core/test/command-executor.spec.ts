// OMG: Unreadable imports! 
import { OrbitalFactory, OrbitalFactoryStatic } from '../orbital-factory';
import { Constructor } from '@orbital/core/util/constructor';
import { Executable } from '@orbital/core';
import { commandNotExecutable } from '../util/errors';


import { EmptyCLI } from './shared/cli/empty-cli';
import { CLIWithBadParam } from './shared/cli/cli-with-bad-function';
import { MultipleAliases } from './shared/cli/cli-with-multiple-aliases';
import { MultipleNames } from './shared/cli/cli-with-multiple-names';


import { expect } from 'chai';

describe('Commands with Params', () => {
    let factory: OrbitalFactoryStatic;

    beforeEach(() => {
        factory = OrbitalFactory.bootstrap(MultipleAliases);
    });


    it('should throw if there are multiple commands with same alias', () => {
        factory = OrbitalFactory.bootstrap(MultipleAliases);
        expect(() => factory.execute(['good-cli', 'alpha']))
            .to.throw('Multiple commands with alias "a" exist: "beta" and "alpha".');
    });

    it('should throw if there are multiple commands with same name', () => {
        factory = OrbitalFactory.bootstrap(MultipleNames);
        expect(() => factory.execute(['good-cli', 'alpha']))
            .to.throw('Two commands named "alpha" exist. Please rename or remove one of them.');
    });
});
