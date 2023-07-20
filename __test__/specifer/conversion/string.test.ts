import {expectSprintf} from '../../utils';

// %s
// writes a character string

describe('%s', () => {
    test('precision specifies the maximum number of bytes to be written', () => {
        expectSprintf('%.3s', 'Hello')
            .toEqual('Hel');
    });

    test('if precision is not specified, writes every byte', () => {
        expectSprintf('Hello %s', 'printf')
            .toEqual('Hello printf');
    });
});
