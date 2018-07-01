import { expect } from 'chai';
import { getParamNames } from '../../util/param-name';

describe('paramName', () => {
    describe('getFunctionParameterName', () => {
        const func = (cake) => { return; };
        const empty = () => { return; };

        expect(getParamNames(func))
            .to.deep.equal(['cake']);

        expect(getParamNames(empty))
            .to.deep.equal([]);
    });
});
