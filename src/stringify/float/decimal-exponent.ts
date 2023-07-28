import {FormatFlags, PrefixContent} from '../../impl-types';
import {AnyFormatArgument, DoubleFormatArgument, LongDoubleFormatArgument} from '../../types';
import stringifyNonFiniteValue from './nonfinite';
import {getPrefix} from '../numeric';

export default function stringifyDecimalExponentNotation(
    isUpper: boolean,
    precision: number|null,
    args: AnyFormatArgument[],
    flags: FormatFlags,
): PrefixContent {
    if (args.length === 0) {
        throw new Error('argument for decimal exponent notation(%e,%E,%a,%A) not exists');
    }

    const n = args.shift() as (DoubleFormatArgument | LongDoubleFormatArgument);
    let content: string|null = stringifyNonFiniteValue(isUpper, n, flags);

    if (content === null) {
        content = Math.abs(n).toExponential(precision ?? 6);
        // The exponent contains at least two digits, more digits are used only if necessary.
        // 1e+0 -> 1e+00
        if (content.split('e')[1].length === 2) {
            content = content.slice(0, -1) + '0' + content.at(-1);
        }
    }

    //  In the alternative implementation decimal point character is written even if no digits follow it.
    if (flags['#'] && !content.includes('.')) {
        content = content.replace('e', '.e');
    }

    if (isUpper) {
        content = content.toUpperCase();
    }

    return [getPrefix(n, flags), content];
}
