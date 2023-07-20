import {describe, test} from '@jest/globals';
import {FormatArgument, printf, sprintf, vprintf, vsprintf} from '../src';

describe('printf-family', () => {
    const format = 'Hello %s';
    const args: FormatArgument<'Hello %s'> = ['printf'];

    test('printf returns number of characters transmitted to the output stream', async () => {
        const log = console.log;
        console.log = (...data: any[]) => {
            expect(data).toEqual([sprintf(format, ...args)]);
        };

        expect(printf(format, ...args))
            .toEqual(sprintf(format, ...args).length);

        console.log = log;
    });

    test('vprintf returns number of characters transmitted to the output stream', async () => {
        const log = console.log;
        console.log = (...data: any[]) => {
            expect(data).toEqual([sprintf(format, ...args)]);
        };

        expect(vprintf(format, args))
            .toEqual(sprintf(format, ...args).length);

        console.log = log;
    });

    test('vsprintf returns the same value as sprintf', async () => {
        expect(vsprintf(format, args))
            .toEqual(sprintf(format, ...args));
    });
});
