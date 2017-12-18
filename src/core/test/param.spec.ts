import { OrbitalFactory, OrbitalFactoryStatic } from '../orbital-factory';

import { CLIWithBadParam } from './shared/cli/cli-with-bad-function';
import { Constructor } from '@orbital/core/util/constructor';
import { EmptyCLI } from './shared/cli/empty-cli';
import { Executable } from '@orbital/core';
import { GoodCLI } from './shared/cli/good-cli';
import { commandNotExecutable } from '../util/errors';
import { expect } from 'chai';

describe('Commands with Params', () => {
    let factory: OrbitalFactoryStatic;

    beforeEach(() => {
        factory = OrbitalFactory.bootstrap(GoodCLI);
    });


    it('parameters should be reflected into the class', () => {
        const name = 'foo';
        expect(() => factory.execute(['good-cli', 'with-param', name]))
            .to.throw(name);
    });

    it('should only be allowed to decorate args of execute', () => {
        const fact = OrbitalFactory.bootstrap(CLIWithBadParam);
        expect(() => fact.execute(['test-cli', 'param']))
            .to.throw('a function');
    });

    it('should support multiple parameters', () => {
        expect(() => factory.execute(['good-cli', 'with-param', 'tim', 32]))
            .to.throw('32');
    });
});
