import {describe, test} from '@jest/globals';
import {FormatArgument, printf, printfln, sprintf, vprintf, vprintfln, vsprintf} from '../src';

describe('printf-family', () => {
    const format = 'Hello %s';
    const args: FormatArgument<'Hello %s'> = ['printf'];

    const writeFunctionStack: Array<(str: string | Uint8Array) => boolean> = [];

    function pushWriteFunction(write: ((str: string | Uint8Array) => boolean) | null) {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        writeFunctionStack.push(process.stdout.write);

        if (write === null) {
            process.stdout.write = undefined as unknown as () => boolean;
        } else {
            process.stdout.write = write;
        }
    }

    function popWriteFunction() {
        process.stdout.write = writeFunctionStack.pop() as (str: string | Uint8Array) => boolean;
    }

    test('printf returns number of characters transmitted to the output stream', async () => {
        pushWriteFunction(null);
        const log = console.log;
        console.log = (...data: [string]) => {
            expect(data).toEqual([sprintf(format, ...args)]);
        };

        expect(printf(format, ...args))
            .toEqual(sprintf(format, ...args).length);

        console.log = log;
        popWriteFunction();

        pushWriteFunction((str: string | Uint8Array) => {
            expect(str).toEqual(sprintf(format, ...args));
            return true;
        });

        expect(printf(format, ...args))
            .toEqual(sprintf(format, ...args).length);

        popWriteFunction();
    });

    test('vprintf returns number of characters transmitted to the output stream', async () => {
        pushWriteFunction(null);
        const log = console.log;
        console.log = (...data: [string]) => {
            expect(data).toEqual([sprintf(format, ...args)]);
        };

        expect(vprintf(format, args))
            .toEqual(sprintf(format, ...args).length);

        console.log = log;
        popWriteFunction();

        pushWriteFunction((str: string | Uint8Array) => {
            expect(str).toEqual(sprintf(format, ...args));
            return true;
        });

        expect(vprintf(format, args))
            .toEqual(sprintf(format, ...args).length);

        popWriteFunction();
    });

    test('printfln, vprintfln adds a newline character to the end of the output', async () => {
        const log = console.log;
        console.log = (...data: [string]) => {
            expect(data).toEqual([sprintf(format, ...args)]);
        };

        expect(printfln(format, ...args))
            .toEqual(sprintf(format, ...args).length);

        expect(vprintfln(format, args))
            .toEqual(sprintf(format, ...args).length);

        console.log = log;
    });

    test('vsprintf returns the same value as sprintf', async () => {
        expect(vsprintf(format, args))
            .toEqual(sprintf(format, ...args));
    });
});
