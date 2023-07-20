import {expectSprintf} from '../utils';

// %%
// writes literal %. The full conversion specification must be %%.

describe('%%', () => {
    test('%%', () => {
        expectSprintf('A%%B')
            .toEqual('A%B');

        expectSprintf('%%')
            .toEqual('%');
    });
});
