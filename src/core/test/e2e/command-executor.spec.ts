import { OrbitalFactory } from '@orbital/core';
import { expect } from 'chai';
import { DuplicateAliasError } from '../../errors/duplicate-alias';
import { DuplicateNameError } from '../../errors/duplicate-name';
import { MultipleAliases } from '../shared/cli/cli-with-multiple-aliases';
import { MultipleNames } from '../shared/cli/cli-with-multiple-names';

describe('Command Executor', () => {
    it('should throw if there are multiple commands with same alias', () => {
        const execution = () => {
            OrbitalFactory
                .bootstrap(MultipleAliases)
                .execute(['good-cli', 'alpha']);
        };
        expect(execution)
            .to.throw(DuplicateAliasError);
    });

    it('should throw if there are multiple commands with same name', () => {
        const execution = () => {
            OrbitalFactory
                .bootstrap(MultipleNames)
                .execute(['good-cli', 'alpha']);
        };
        expect(execution)
            .to.throw(DuplicateNameError);
    });
});
