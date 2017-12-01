import { TestCLI } from './shared/cli/test-cli';
import { expect } from 'chai';
import { getClassMetadata } from '@orbital/core/reflection/class';

describe('CLI decorator', () => {
    it('Should metadata attached', () => {
        const metadata = getClassMetadata(TestCLI);
        expect(metadata)
            .to.haveOwnProperty('name')
            .and.equal('test-cli');
        expect(metadata)
            .to.haveOwnProperty('version')
            .and.equal('1.0.0');
    });

});
