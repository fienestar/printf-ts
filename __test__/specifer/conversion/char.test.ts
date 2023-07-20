import {expectSprintf} from '../../utils';

// %c
// writes a single character.

describe('%c', () => {
    test('number argument', () => {
        expectSprintf('%c is zero', 48)
            .toEqual('0 is zero');
    });

    test('string argument', () => {
        expectSprintf('first character of %s is %c', 'Hello', 'Hello')
            .toEqual('first character of Hello is H');
    });

    test('empty string argument', () => {
        expectSprintf('%c', '')
            .toEqual('');
    });
});
