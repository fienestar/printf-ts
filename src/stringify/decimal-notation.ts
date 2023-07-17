import {FormatFlags, PrefixContent} from '../impl-types';
import {DoubleFormatArgument, LongDoubleFormatArgument} from '../types';
import stringifyNonFiniteValue from './nonfinite';
import {getPrefix} from './numeric';

export default function stringifyDecimalNotation(
    isUpper: boolean,
    precision: number|null,
    args: any[],
    flags: FormatFlags,
): PrefixContent {
    if (args.length === 0) {
        throw new Error('argument for decimal notation(%f,%F,%a,%A) not exists');
    }

    const n = args.shift() as DoubleFormatArgument;
    let content: string|null = stringifyNonFiniteValue(isUpper, n, flags);

    if (content === null) {
        content = Math.abs(n).toFixed(precision ?? 6);
    }

    //  In the alternative implementation decimal point character is written even if no digits follow it.
    if (flags['#'] && !content.includes('.')) {
        content += '.';
    }

    return [getPrefix(n, flags), content];
}
