import {FormatFlags, PrefixContent} from '../../impl-types';
import {AnyFormatArgument, DoubleFormatArgument, LongDoubleFormatArgument} from '../../types';
import stringifyNonFiniteValue from './nonfinite';
import {getPrefix} from '../numeric';

export default function stringifyDecimalFixedNotation(
    isUpper: boolean,
    precision: number|null,
    args: AnyFormatArgument[],
    flags: FormatFlags,
): PrefixContent {
    if (args.length === 0) {
        throw new Error('argument for decimal fixed notation(%f,%F) not exists');
    }

    const n = args.shift() as (DoubleFormatArgument | LongDoubleFormatArgument);
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
