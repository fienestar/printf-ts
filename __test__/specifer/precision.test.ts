import {describe, test} from '@jest/globals';
import {expectSprintf, expectSprintfRejects} from '../utils';

// . followed by integer number or *, or neither that specifies precision of the conversion

describe('precision', () => {
    test('number precision', () => {
        expectSprintf('%.10f', 1)
            .toEqual('1.0000000000');
    });

    test('wildcard precision', () => {
        expectSprintf('%.*f', 10, 1)
            .toEqual('1.0000000000');
    });

    test('if wildcard for precision is negative, it is ignored', () => {
        expectSprintf('%.*f', -100, 1)
            .toEqual('1.000000');
    });

    test('if neither a number nor * is used for the precision, it is taken as zero', () => {
        expectSprintf('%.f', 1)
            .toEqual('1');
    });

    test('too big precision', async () => {
        const tooBigWidth = 1 + '0'.repeat(100);
        await expectSprintfRejects(`%.${tooBigWidth}}d`, 1)
            .toEqual(new Error(`${tooBigWidth} is too big or not an integer`));
    });
});
