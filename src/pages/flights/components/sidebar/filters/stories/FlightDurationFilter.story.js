import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@kadira/react-storybook-decorator-centered';

import FlightDurationFilter from '../FlightDurationFilter.jsx';

import { flightDirection } from './fixtures';

storiesOf('flights/sidebar/filters/FlightDurationFilter', module)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(story =>
        <div style={{ width: '250px' }}>
            {story()}
        </div>,
    )
    .addDecorator(centered)
    .add('default', () =>
        <FlightDurationFilter
            directions={[flightDirection]}
            onChange={action('onChange')}
        />,
    )
    .add('loading', () =>
        <FlightDurationFilter
            directions={[
                {
                    ...flightDirection,
                    loading: true,
                },
            ]}
            onChange={action('onChange')}
        />,
    );
