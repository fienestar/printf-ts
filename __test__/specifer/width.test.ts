import {describe, test} from '@jest/globals';
import {expectSprintf} from '../utils';

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
});
