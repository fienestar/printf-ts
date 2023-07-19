import {FormatFlags} from '../impl-types';

export function getPrefix(n: number | bigint, flags: FormatFlags): string {
    if (n < 0) {
        return '-';
    } else {
        if (flags['+']) {
            return '+';
        } else if (flags[' ']) { // It is ignored if + flag is present.
            return ' ';
        } else {
            return '';
        }
    }
}
