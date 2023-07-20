import {expectSprintf} from '../../../utils';

// %f, %F
// converts floating-point number to the decimal notation in the style [-]ddd.ddd.

describe('%f, %F', () => {
    test('precision specifies the exact number of digits to appear after the decimal point character', () => {
        expectSprintf('%.2f', 1)
            .toEqual('1.00');
    });

    test('the default precision is 6', () => {
        expectSprintf('%f', 1)
            .toEqual('1.000000');
    });

    test('if flag #, decimal point character is written even if no digits follow it', () => {
        expectSprintf('%#.0f', 1)
            .toEqual('1.');
        expectSprintf('%.0f', 1)
            .toEqual('1');
    });

    test('nonfinite', () => {
        expectSprintf('%f %f %f %F %F %F', Infinity, -Infinity, NaN, Infinity, -Infinity, NaN)
            .toEqual('inf -inf nan INF -INF NAN');

        expectSprintf('%#f %#f %#f %#F %#F %#F', Infinity, -Infinity, NaN, Infinity, -Infinity, NaN)
            .toEqual('inf -inf nan INF -INF NAN');
    });
});
