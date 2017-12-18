import { getClassMetadata, setClassMetadata } from '@orbital/core/reflection/class';

import { expect } from 'chai';

class TestMetadata { }

describe('Reflection functions', () => {
    before(() => {
        setClassMetadata(TestMetadata, 'metadata');
    });
    it('Should attach metadata', () => {
        expect(getClassMetadata(TestMetadata))
            .to.equal('metadata');
    });
});
