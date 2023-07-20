import {expectSprintf} from '../../../utils';

// %o
// converts an integer into octal representation oooo.

describe('%d, %i', () => {
    test('precision specifies the minimum number of digits to appear', () => {
        expectSprintf('%.6o', 255)
            .toEqual('000377');
    });

    test('default precision is 1', () => {
        expectSprintf('%o', 0)
            .toEqual('0');
    });

    test('if both value and precision are 0, results empty string', () => {
        expectSprintf('%.0o', 0)
            .toEqual('');
    });

    test('if flag #, precision is increased if necessary, to write one leading zero', () => {
        expectSprintf('%#.0o', 1)
            .toEqual('01');
    });

    test('if flag # and both value and precision are 0, results results "0"', () => {
        expectSprintf('%#.0o', 0)
            .toEqual('0');
        expectSprintf('%.0o', 0)
            .toEqual('');
    });

    test('string argument', () => {
        expectSprintf('%hho', '0')
            .toEqual('60');
    });
});
