import {expectSprintf} from '../../../utils';

// %d, %i, %u
// converts an integer into decimal representation [-]dddd.

describe('%d, %i, %u', () => {
    test('precision specifies the minimum number of digits to appear', () => {
        expectSprintf('%.6d %.6i %.6u', 255, 255, 255)
            .toEqual('000255 000255 000255');
    });

    test('default precision is 1', () => {
        expectSprintf('%d %i %u', 0, 0, 0)
            .toEqual('0 0 0');
    });

    test('if both value and precision are 0, results empty string', () => {
        expectSprintf('%.0d/%.0i/%.0u', 0, 0, 0)
            .toEqual('//');
    });

    test('string argument', () => {
        expectSprintf('%hhd', '0')
            .toEqual('48');
    });
});
