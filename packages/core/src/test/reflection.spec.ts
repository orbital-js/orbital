import { expect } from 'chai';
import { getClassMetadata, setClassMetadata } from '../reflection/class';

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
