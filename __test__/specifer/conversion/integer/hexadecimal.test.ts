import {expectSprintf} from '../../../utils';

// %x, %X
// converts an integer into hexadecimal representation hhhh.

describe('%d, %i', () => {
    test('for the x conversion letters abcdef are used', () => {
        expectSprintf('%x', 0xabcdef)
            .toEqual('abcdef');
    });

    test('for the X conversion letters ABCDEF are used', () => {
        expectSprintf('%X', 0xabcdef)
            .toEqual('ABCDEF');
    });

    test('precision specifies the minimum number of digits to appear', () => {
        expectSprintf('%.6x', 255)
            .toEqual('0000ff');
    });

    test('default precision is 1', () => {
        expectSprintf('%x', 0)
            .toEqual('0');
    });

    test('if both value and precision are 0, results empty string', () => {
        expectSprintf('%.0x', 0)
            .toEqual('');
    });

    test('if flag #, 0x or 0X is prefixed if value is non zero', () => {
        expectSprintf('%#x %#X', 0xab, 0xab)
            .toEqual('0xab 0XAB');

        expectSprintf('%#x %#X', 0, 0)
            .toEqual('0 0');

        expectSprintf('%x %X', 0xab, 0xab)
            .toEqual('ab AB');

        expectSprintf('%x %X', 0, 0)
            .toEqual('0 0');
    });

    test('string argument', () => {
        expectSprintf('%hhx', '0')
            .toEqual('30');
    });
});
