import {expectSprintf} from '../../../utils';

// %g, %G
// converts floating-point number to decimal or decimal exponent notation depending on the value and the precision.

describe('%g, %G', () => {
    // Let P equal the precision if nonzero, 6 if the precision is not specified, or 1 if the precision is ​0​. Then, if a conversion with style E would have an exponent of X:

    test('upper/lower case', () => {
        expectSprintf('%g %G', 1e100, 1E100)
            .toEqual('1e+100 1E+100');
    });

    test('default precision is 6', () => {
        expectSprintf('%g', 1.000009)
            .toEqual('1.00001');

        expectSprintf('%g', 1.0000009)
            .toEqual('1');
    });

    test('if given precision is 0, P is 1', () => {
        expectSprintf('%.g %.g', 0, 1.2)
            .toEqual('0 1');
    });

    test('P > X >= -4', () => {
        // the conversion is with style f or F and precision P − 1 − X.

        const sprintfArguments = [
            ['%.4g', 0.000099999, '0.0001'],
            ['%g', 1, '1'],
        ] as ['%g', number, string][];

        for (const [format, n, expected] of sprintfArguments) {
            expectSprintf(format, n)
                .toEqual(expected);
        }
    });

    test('X < -4 or X >= P', () => {
        // the conversion is with style e or E and precision P − 1.

        const sprintfArguments = [
            ['%.4g', 0.00009999, '9.999e-05'],
            ['%g', 1e100, '1e+100'],
        ] as ['%g', number, string][];

        for (const [format, n, expected] of sprintfArguments) {
            expectSprintf(format, n)
                .toEqual(expected);
        }
    });

    test('if flag #, trailing zeros are not removed', () => {
        expectSprintf('%#g', 1.2)
            .toEqual('1.20000');
    });

    test('corner case', () => {
        expectSprintf('%.1g', 999.9)
            .toEqual('1e+03');

        expectSprintf('%.2g', 999.9)
            .toEqual('1e+03');

        expectSprintf('%.3g', 999.9)
            .toEqual('1e+03');

        expectSprintf('%.4g', 999.9)
            .toEqual('999.9');

        expectSprintf('%.5g', 999.9)
            .toEqual('999.9');

        expectSprintf('%.6g', 999.9)
            .toEqual('999.9');
    });
});
