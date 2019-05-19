import { addLocaleData } from 'react-intl';
import { reduce, mapValues } from 'lodash';

import en from 'react-intl/locale-data/en';
import lv from 'react-intl/locale-data/lv';
import ru from 'react-intl/locale-data/ru';

import * as defaultLocales from './locales';
import { locales as uikitLocales } from 'uikit';

addLocaleData([
    ...en,
    ...lv,
    ...ru,
]);

/**
 * Combine all messages from list of provides locales
 * and return single object
 */
const combineLocales = (locales) => (
    reduce(locales, (result, locale) => (
        mapValues(locale, (messages, language) => (
            { ...result[language], ...messages }
        ))
    ), {})
);

const locales = combineLocales([defaultLocales, uikitLocales]);

export { locales };
