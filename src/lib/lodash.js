/**
 * @flow
 */

import _ from 'lodash';

/**
 * Return distinct values for specified key in array of objects
 *
 * @param {Array}  arr   - The list of objects
 * @param {String} field - The key name to take values for
 */
_.mixin({
    distinct: (arr: Array<any>, key: string) => (
        _.chain(arr).map(item => item[key]).uniq().sort().value()
    ),
});
