import {describe, test} from '@jest/globals';
import {expectSprintf, expectSprintfRejects} from '../utils';

// integer value or * that specifies minimum field width

describe('width', () => {
    test('number width', () => {
        expectSprintf('%10s', 'Hello')
            .toEqual('     Hello');
    });

    test('wildcard width', () => {
        expectSprintf('%*s', 10, 'Hello')
            .toEqual('     Hello');
    });


    test('too big width', async () => {
        const tooBigWidth = 1 + '0'.repeat(100);
        await expectSprintfRejects(`%${tooBigWidth}}d`, 1)
            .toEqual(new Error(`${tooBigWidth} is too big or not an integer`));
    });
});
