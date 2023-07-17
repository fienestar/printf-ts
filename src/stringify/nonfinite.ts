import {FormatFlags} from '../impl-types';

export default function stringifyNonFiniteValue(
    isUpper: boolean,
    n: number,
    flags: FormatFlags,
): 'nan' | 'inf' | 'NAN' | 'INF' | null {
    if (isFinite(n)) {
        return null;
    }

    flags['0'] = false;
    flags['#'] = false;

    const content = n !== n ? 'nan' : 'inf';

    if (isUpper) {
        return content.toUpperCase() as 'NAN' | 'INF';
    } else {
        return content;
    }
}
