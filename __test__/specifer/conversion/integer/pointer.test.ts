import {expectSprintf} from '../../../utils';

// %p
// writes an implementation defined character sequence defining a pointer.

describe('%p', () => {
    test('print value in hex with 0x prefix', () => {
        expectSprintf('%p', 127n)
            .toEqual('0x7f');
    });

    test('precision specifies the minimum number of digits to appear', () => {
        expectSprintf('%.6p', 255n)
            .toEqual('0x0000ff');
    });

    test('if value is 0, results "(nil)"', () => {
        expectSprintf('%.0p', 0n)
            .toEqual('(nil)');
    });
});
