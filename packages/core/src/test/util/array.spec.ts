import { expect } from 'chai';
import { arrayIsPopulated } from '../../util/array';

describe('arrayIsPopulated', () => {
    it('should return false if empty', () => {
        expect(arrayIsPopulated([])).to.equal(false);
    });
    it('should return false if not an array', () => {
        expect(arrayIsPopulated({})).to.equal(false);
    });
    it('should return false if first element is null', () => {
        expect(arrayIsPopulated([null])).to.equal(false);
    });
    it('should return true if populated', () => {
        expect(arrayIsPopulated([3])).to.equal(true);
    });
});
