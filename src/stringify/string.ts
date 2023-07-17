import {PrefixContent} from '../impl-types';
import {StringFormatArgument} from '../types';

export default function stringifyString(args: any[]): PrefixContent {
    if (args.length === 0) {
        throw new Error('argument for string(%s) not exists');
    }

    return ['', args.shift() as StringFormatArgument];
}
