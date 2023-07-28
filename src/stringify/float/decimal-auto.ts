import {FormatFlags, PrefixContent} from '../../impl-types';
import {AnyFormatArgument} from '../../types';
// %g, %G
export default function stringifyDecimalAutoNotation(
    _isUpper: boolean,
    _precision: number|null,
    _args: AnyFormatArgument[],
    _flags: FormatFlags,
): PrefixContent {
    throw new Error('Not implemented');
}
