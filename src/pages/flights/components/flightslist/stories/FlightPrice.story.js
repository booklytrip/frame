import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import FlightPrice from '../FlightPrice.jsx';

storiesOf('flights/FlightPrice', module)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(centered)
    .add('FlightPrice', () =>
        <FlightPrice price={20} totalPrice={100} currency="EUR" />,
    );
