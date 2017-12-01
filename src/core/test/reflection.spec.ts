import { expect } from 'chai';
import { applyClassMetadata, getClassMetadata } from '@orbital/core/reflection/class';

class TestMetadata { }

describe('Reflection functions', () => {
    before(() => {
        applyClassMetadata(TestMetadata, 'metadata');
    });
    it('Should attach metadata', () => {
        expect(getClassMetadata(TestMetadata))
            .to.equal('metadata');
    });
});
