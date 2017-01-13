import 'mocha';
import { expect } from 'chai';

describe('basic', () => {
    it('should say hello', () => {
        const msg = 'hello';
        expect(msg).to.equal('hello');
    });
});