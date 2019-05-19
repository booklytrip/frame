/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}

export const shallowWithIntl = (node, { context } = {}) =>
    shallow(nodeWithIntlProp(node), {
        context: Object.assign({}, context, { intl }),
    });

export const mountWithIntl = (node, { context, childContextTypes } = {}) =>
    mount(nodeWithIntlProp(node), {
        context: Object.assign({}, context, { intl }),
        childContextTypes: Object.assign(
            {},
            { intl: intlShape },
            childContextTypes,
        ),
    });

export const createWithIntl = (children, props = { locale: 'en' }) =>
    renderer.create(
        <IntlProvider {...props}>
            {children}
        </IntlProvider>,
    );
