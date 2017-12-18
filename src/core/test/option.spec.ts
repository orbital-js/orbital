import { OrbitalFactory, OrbitalFactoryStatic } from '../orbital-factory';

import { Constructor } from '@orbital/core/util/constructor';
import { EmptyCLI } from './shared/cli/empty-cli';
import { Executable } from '@orbital/core';
import { GoodCLI } from './shared/cli/good-cli';
import { commandNotExecutable } from '../util/errors';
import { expect } from 'chai';

describe('Commands with Options', () => {
    let factory: OrbitalFactoryStatic;

    beforeEach(() => {
        factory = OrbitalFactory.bootstrap(GoodCLI);
    });


    it('parameters should be reflected into the class', () => {
        const name = 'foo';
        expect(() => factory.execute(['good-cli', 'with-option', '-n', name]))
            .to.throw(name);
    });
});
