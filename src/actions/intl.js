/**
 * @flow
 */

import type { Locale } from '../types';

/**
 * Change current locale to specified
 *
 * @param {String} locale - A new locale to set
 */
export const updateLocale = (locale: Locale) => ({
    type: 'INTL.UPDATE_LOCALE',
    locale,
});
