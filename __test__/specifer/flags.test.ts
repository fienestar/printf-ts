import {expectSprintf} from '../utils';

// -+ #0
// one or more flags that modify the behavior of the conversion

describe('mixed flags', () => {
    test('one or more flags that modify the behavior of the conversion', () => {
        expectSprintf('%+-#0d', 1)
            .toEqual('+1');

        expectSprintf('%+010d', 1)
            .toEqual('+000000001');
    });
});

describe('- flag', () => {
    test('left-justify', () => {
        // the result of the conversion is left-justified within the field (by default it is right-justified)
        expectSprintf('%-10s', 'Hello')
            .toEqual('Hello     ');

        expectSprintf('%10s', 'Hello')
            .toEqual('     Hello');
    });
});

describe('+ flag', () => {
    test('the sign of signed conversions is always prepended', () => {
        expectSprintf('%+d/%+d/%+.f/%+.f/%+f/%+f/%+f', 1, -1, 1, -1, Infinity, -Infinity, NaN)
            .toEqual('+1/-1/+1/-1/+inf/-inf/+nan');

        expectSprintf('%d/%d/%.f/%.f/%f/%f/%f', 1, -1, 1, -1, Infinity, -Infinity, NaN)
            .toEqual('1/-1/1/-1/inf/-inf/nan');
    });
});

describe('space flag', () => {
    test('if the result not start with a sign character, space is prepended', () => {
        expectSprintf('% d/% d/% .f/% .f/% f/% f/% f', 1, -1, 1, -1, Infinity, -Infinity, NaN)
            .toEqual(' 1/-1/ 1/-1/ inf/-inf/ nan');
        expectSprintf('%d/%d/%.f/%.f/%f/%f/%f', 1, -1, 1, -1, Infinity, -Infinity, NaN)
            .toEqual('1/-1/1/-1/inf/-inf/nan');
    });

    test('ignored if + flag is present', () => {
        expectSprintf('%+ d/% +d', 1, 1)
            .toEqual('+1/+1');
    });
});

describe('0 flag', () => {
    // for integer and floating point number conversions, leading zeros are used to pad the field instead of space characters. For integer numbers. For other conversions using this flag results in undefined behavior
    test('leading zero are used to pad', () => {
        expectSprintf('%010d', 1)
            .toEqual('0000000001');

        expectSprintf('%10d', 1)
            .toEqual('         1');
    });

    test('ignored if - flag is present', () => {
        expectSprintf('%-010d', 1)
            .toEqual('1         ');
    });

    test('ignored if the precision is explicitly specified.', () => {
        expectSprintf('%010.7d', 1)
            .toEqual('   0000001');
    });
});

describe('# flag', () => {
    // alternative form of the conversion is performed
    // depends on the conversion specifier
});
