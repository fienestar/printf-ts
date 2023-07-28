import {expectSprintf} from '../../../utils';

// %e, %E
// converts floating-point number to the decimal exponent notation.

describe('%f, %F', () => {
    test('for the e conversion style [-]d.ddde±dd is used', () => {
        expectSprintf('%e', 1.2e100)
            .toEqual('1.200000e+100');
    });

    test('for the E conversion style [-]d.ddde±dd is used', () => {
        expectSprintf('%E', 1.2e100)
            .toEqual('1.200000E+100');
    });

    test('exponent contains at least two digits, more digits are used only if necessary', () => {
        expectSprintf('%e', 1e0)
            .toEqual('1.000000e+00');
        expectSprintf('%e', 1e1)
            .toEqual('1.000000e+01');
        expectSprintf('%e', 1e99)
            .toEqual('1.000000e+99');
        expectSprintf('%e', 1e200)
            .toEqual('1.000000e+200');
    });

    test('precision specifies the exact number of digits to appear after the decimal point character', () => {
        expectSprintf('%.2e', 1)
            .toEqual('1.00e+00');
    });

    test('the default precision is 6', () => {
        expectSprintf('%e', 1)
            .toEqual('1.000000e+00');
    });

    test('if flag #, decimal point character is written even if no digits follow it', () => {
        expectSprintf('%#.0e', 1)
            .toEqual('1.e+00');
        expectSprintf('%.0e', 1)
            .toEqual('1e+00');
    });

    test('nonfinite', () => {
        expectSprintf('%e %e %e %E %E %E', Infinity, -Infinity, NaN, Infinity, -Infinity, NaN)
            .toEqual('inf -inf nan INF -INF NAN');

        expectSprintf('%#f %#f %#f %#E %#E %#E', Infinity, -Infinity, NaN, Infinity, -Infinity, NaN)
            .toEqual('inf -inf nan INF -INF NAN');
    });
});
