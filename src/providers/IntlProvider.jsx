import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { locales } from '../intl';
import { isNil } from 'lodash';

const Component = ({ locale, messages, children }) =>
    <IntlProvider locale={locale} messages={messages}>
        {children}
    </IntlProvider>;

// Provide app component with current locale and list of
// translated messages
const mapStateToProps = ({ intl }: { intl: Object }) => {
    const locale = !isNil(locales[intl.get('locale')])
        ? intl.get('locale')
        : 'en';

    return {
        locale,
        messages: locales[locale],
    };
};

export default connect(mapStateToProps)(Component);
