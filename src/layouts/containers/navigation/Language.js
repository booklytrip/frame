/**
 * @flow
 */

import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { updateLocale } from '../../../actions/intl';
import { map, find } from 'lodash';

import Language from '../../components/navigation/Language';

const intlMessages = defineMessages({
    en: {
        id: 'app.navigation.Language.en',
        defaultMessage: 'English',
    },
    lv: {
        id: 'app.navigation.Language.lv',
        defaultMessage: 'Latvian',
    },
    ru: {
        id: 'app.navigation.Language.ru',
        defaultMessage: 'Russian',
    },
});

const locales = [
    {
        locale: 'en',
        language: 'English',
        flag: 'us',
    },
    {
        locale: 'lv',
        language: 'Latvian',
        flag: 'lv',
    },
    {
        locale: 'ru',
        language: 'Russian',
        flag: 'ru',
    },
];

// const currentLocale = find(locales, { locale });

const mapStateToProps = ({ intl, project }) => ({
    currentLocale: intl.get('locale'),
    languages: project.localization.languages,
});

const props = withProps(({ currentLocale, languages, intl }) => {
    const locale = find(locales, { locale: currentLocale });
    return {
        // Provide current locale
        locale: {
            ...locale,
            language: intl.formatMessage(intlMessages[locale.locale]),
        },
        // Map list of languages defined in project settings, to list of options
        // for dropdown menu
        options: map(languages, language => {
            const locale = find(locales, { locale: language });
            return {
                flag: locale.flag,
                value: locale.locale,
                text: intl.formatMessage(intlMessages[locale.locale]),
            };
        }),
    };
});

export default compose(
    connect(mapStateToProps, { onChange: updateLocale }),
    injectIntl,
    props,
)(Language);
