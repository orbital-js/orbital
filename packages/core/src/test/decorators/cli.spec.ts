import { expect } from 'chai';
import { getClassMetadata } from '../../reflection/class';
import { TestCLI } from '../shared/cli/test-cli';

describe('CLI decorator', () => {
    it('Should attatch metadata', () => {
        const metadata = getClassMetadata(TestCLI);

        expect(metadata)
            .to.haveOwnProperty('name')
            .and.equal('test-cli');

        expect(metadata)
            .to.haveOwnProperty('version')
            .and.equal('1.0.0');
    });
});
