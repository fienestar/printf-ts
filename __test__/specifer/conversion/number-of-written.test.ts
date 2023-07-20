import {expectSprintf, expectSprintfRejects} from '../../utils';

// %n
// returns the number of characters written so far by this call to the function.

describe('%n', () => {
    test('writes nothing', () => {
        expectSprintf('a%nb%d', null, 1)
            .toEqual('ab1');
    });

    test('may not contain any flag, field width, or precision.', async () => {
        const invalidFormats = [
            '%1n',
            '%.1n',
            '%+n',
            '%-n',
            '%#n',
            '%0n',
            '% n',
            '% +n',
            '%-#n',
        ];

        for (const format of invalidFormats) {
            await expectSprintfRejects(format, null)
                .toEqual(new Error('%n cannot contain width, precision or flags'));
        }
    });
});
