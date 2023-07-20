import {describe, test} from '@jest/globals';
import {expectSprintf, expectSprintfRejects} from './utils';

describe('sprintf', () => {
    test('fail when argument not exists', async () => {
        await expectSprintfRejects('%s')
            .toEqual(new Error('argument for string(%s) not exists'));

        await expectSprintfRejects('%d')
            .toEqual(new Error('argument for integer not exists'));

        await expectSprintfRejects('%c')
            .toEqual(new Error('argument for character(%c) not exists'));

        await expectSprintfRejects('%f')
            .toEqual(new Error('argument for decimal notation(%f,%F) not exists'));

        await expectSprintfRejects('%*.*d', 1)
            .toEqual(new Error('argument for * not exists'));
    });

    test('simple test', async () => {
        expectSprintf('%010d %x %p', 1, 40, 0n)
            .toEqual(`0000000001 28 (nil)`);

        expectSprintf('%i %u %o %x %X', 255, 254, 253, 252, 251)
            .toEqual('255 254 375 fc FB');

        expectSprintf('%f %e', 1, 1e100)
            .toEqual('1.000000 1.000000e+100');
    });
});
